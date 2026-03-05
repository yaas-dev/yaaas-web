"use client";

import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
    id: string;
    action: (id: string) => Promise<any>;
    className?: string;
}

export default function DeleteButton({ id, action, className }: DeleteButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this item? This action cannot be undone.")) return;

        setIsDeleting(true);
        try {
            await action(id);
            router.refresh();
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete item.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={className}
            title="Delete"
        >
            <Trash2 size={16} className={isDeleting ? 'animate-pulse' : ''} />
        </button>
    );
}
