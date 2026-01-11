import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Gamepad2, User, Sparkles } from "lucide-react";

/**
 * ResumeValidationModal - Shows warnings when required fields are missing
 * for the gaming resume PDF download.
 */
const ResumeValidationModal = ({ open, onClose, missingFields }) => {
    if (!open) return null;

    const fieldGuidance = {
        mainGame: {
            icon: Gamepad2,
            title: "Main Game",
            description:
                'Go to the "Focus Game & Experience" section and add a game with the Primary checkbox enabled.',
        },
        fullName: {
            icon: User,
            title: "Full Name",
            description:
                "Click on your profile picture → then click on the avatar dropdown → go to Settings → Edit Profile to add your full name.",
        },
        skills: {
            icon: Sparkles,
            title: "Skills",
            description:
                'Scroll down to the "Skills" section on your dashboard and add at least one skill.',
        },
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#1a1f2e] border border-white/10 rounded-2xl shadow-2xl z-[101] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-yellow-500/20 rounded-lg">
                                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                                </div>
                                <h2 className="text-lg font-bold text-white">
                                    Complete Your Profile
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-4">
                            <p className="text-sm text-slate-400">
                                To download your gaming resume, please complete the following
                                required fields:
                            </p>

                            <div className="space-y-3">
                                {missingFields.map((field) => {
                                    const guidance = fieldGuidance[field];
                                    if (!guidance) return null;

                                    const IconComponent = guidance.icon;

                                    return (
                                        <motion.div
                                            key={field}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-xl"
                                        >
                                            <div className="p-2 bg-primary/20 rounded-lg shrink-0">
                                                <IconComponent className="w-4 h-4 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white text-sm">
                                                    {guidance.title}
                                                </h3>
                                                <p className="text-xs text-slate-400 mt-1">
                                                    {guidance.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-white/10">
                            <button
                                onClick={onClose}
                                className="w-full py-2.5 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-colors"
                            >
                                Got it!
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ResumeValidationModal;
