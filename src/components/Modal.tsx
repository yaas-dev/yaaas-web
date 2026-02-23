"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalContextType {
    openModal: (content: React.ReactNode) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

    const openModal = useCallback((content: React.ReactNode) => {
        setModalContent(content);
        document.body.style.overflow = "hidden";
    }, []);

    const closeModal = useCallback(() => {
        setModalContent(null);
        document.body.style.overflow = "unset";
    }, []);

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            <AnimatePresence>
                {modalContent && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative z-10 w-full max-w-2xl bg-secondary border border-border p-8 shadow-2xl overflow-hidden"
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 p-2 text-muted hover:text-primary transition-colors"
                            >
                                <X size={24} />
                            </button>
                            {modalContent}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
}
