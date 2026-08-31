"use client";

import dynamic from 'next/dynamic';
import { useMemo, useRef } from 'react';
import type ReactQuillType from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { uploadToCloudinary } from '@/actions/uploadActions';

// next/dynamic's return type doesn't retain the underlying class component's
// ref typing, so we assert it back to the real type to access the Quill
// instance via ref (needed for the custom image upload handler below).
//
// The image resize module is registered here too, inside the same
// client-only chunk: Quill.register() must run before an editor is
// instantiated, and both packages touch `document` on load.
const ReactQuill = dynamic(async () => {
    const [{ default: RQ, Quill }, { default: QuillResizeImage }] = await Promise.all([
        import('react-quill-new'),
        import('quill-resize-image'),
    ]);
    Quill.register('modules/resize', QuillResizeImage);
    return RQ;
}, {
    ssr: false,
    loading: () => <div className="h-40 w-full bg-black/20 animate-pulse rounded-sm" />
}) as unknown as typeof ReactQuillType;

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image'
];

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const quillRef = useRef<ReactQuillType>(null);

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = () => {
            const file = input.files?.[0];
            if (!file) return;

            if (file.size > 5 * 1024 * 1024) {
                alert('Image is too large. Max 5MB.');
                return;
            }

            const editor = quillRef.current?.getEditor();
            const range = editor?.getSelection(true);

            const reader = new FileReader();
            reader.onloadend = async () => {
                try {
                    const base64String = reader.result as string;
                    const result = await uploadToCloudinary(base64String, 'news/content');

                    if (!editor) return;

                    if (result.success && result.url) {
                        const insertAt = range ? range.index : editor.getLength();
                        editor.insertEmbed(insertAt, 'image', result.url, 'user');
                        editor.setSelection(insertAt + 1, 0);
                    } else {
                        alert('Upload failed: ' + result.error);
                    }
                } catch (error) {
                    console.error('Image upload error:', error);
                    alert('Something went wrong uploading the image.');
                }
            };
            reader.readAsDataURL(file);
        };
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image', 'clean']
            ],
            handlers: {
                image: imageHandler
            }
        },
        // Lets editors drag-resize any inline image directly in the editor;
        // the resulting width/height are stored as attributes on the <img>
        // so they carry through to the published article.
        resize: {},
    }), []);

    return (
        <div className="rich-text-editor">
            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
            />
            <style jsx global>{`
                .rich-text-editor .ql-toolbar {
                    background: #111;
                    border-color: rgba(255, 255, 255, 0.1);
                    border-top-left-radius: 4px;
                    border-top-right-radius: 4px;
                }
                .rich-text-editor .ql-container {
                    background: #000;
                    border-color: rgba(255, 255, 255, 0.1);
                    border-bottom-left-radius: 4px;
                    border-bottom-right-radius: 4px;
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 14px;
                    min-height: 200px;
                }
                .rich-text-editor .ql-editor.ql-blank::before {
                    color: rgba(255, 255, 255, 0.2);
                    font-style: normal;
                }
                .rich-text-editor .ql-snow.ql-toolbar button {
                    color: #fff;
                }
                .rich-text-editor .ql-snow.ql-toolbar button .ql-stroke {
                    stroke: #fff;
                }
                .rich-text-editor .ql-snow.ql-toolbar button .ql-fill {
                    fill: #fff;
                }
                .rich-text-editor .ql-snow.ql-toolbar button:hover .ql-stroke,
                .rich-text-editor .ql-snow.ql-toolbar button.ql-active .ql-stroke {
                    stroke: #B59431;
                }
                .rich-text-editor .ql-snow.ql-toolbar .ql-picker {
                    color: #fff;
                }
                .rich-text-editor .ql-snow.ql-toolbar .ql-picker-label .ql-stroke {
                    stroke: #fff;
                }
                .rich-text-editor .ql-snow.ql-toolbar .ql-picker-options {
                    background: #111;
                    border-color: rgba(255, 255, 255, 0.1);
                }
                .rich-text-editor .ql-editor img {
                    max-width: 100%;
                    border-radius: 4px;
                    margin: 0.5rem 0;
                }
            `}</style>
        </div>
    );
}
