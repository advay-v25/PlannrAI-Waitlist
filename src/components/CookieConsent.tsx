'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Shield, X } from 'lucide-react';
import { hasConsented, setConsent } from '@/lib/cookies';

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const timer = setTimeout(() => {
            if (!hasConsented()) {
                setShowBanner(true);
            }
        }, 1500); // Delay to not disrupt initial experience

        return () => clearTimeout(timer);
    }, []);

    const handleAccept = () => {
        setConsent(true);
        setShowBanner(false);
    };

    const handleDecline = () => {
        setConsent(false);
        setShowBanner(false);
    };

    return (
        <AnimatePresence>
            {showBanner && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="cookie-banner"
                >
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Content */}
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-[var(--accent-muted)] flex items-center justify-center flex-shrink-0">
                                <Cookie className="w-5 h-5 text-[var(--accent-primary)]" />
                            </div>
                            <div>
                                <p className="text-white text-sm font-medium mb-1">
                                    We respect your privacy
                                </p>
                                <p className="text-[var(--text-tertiary)] text-sm">
                                    We use cookies to improve your experience and for basic analytics.
                                    No data is sold or shared with third parties.
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <div className="secure-badge">
                                <Shield className="w-3 h-3" />
                                <span>Encrypted</span>
                            </div>
                            <button
                                onClick={handleDecline}
                                className="px-4 py-2 text-sm text-[var(--text-tertiary)] hover:text-white transition-colors"
                            >
                                Decline
                            </button>
                            <button
                                onClick={handleAccept}
                                className="btn-primary text-sm px-5 py-2"
                            >
                                Accept
                            </button>
                            <button
                                onClick={handleDecline}
                                className="p-2 text-[var(--text-tertiary)] hover:text-white transition-colors md:hidden"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
