"use client";

import dynamic from 'next/dynamic';
import React from 'react';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => <div className="h-40 w-full bg-black/20 animate-pulse rounded-sm" />
});

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link'
];

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    return (
        <div className="rich-text-editor">
            <ReactQuill
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
            `}</style>
        </div>
    );
}
