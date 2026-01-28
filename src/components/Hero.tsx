'use client';

import { motion } from 'framer-motion';
import { Shield, Heart, Sliders } from 'lucide-react';

export default function Hero() {
    const scrollToWaitlist = () => {
        const element = document.getElementById('waitlist');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 relative">
            {/* Subtle mesh gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(0,255,65,0.06)_0%,_transparent_70%)]" />
            </div>

            <div className="max-w-3xl mx-auto text-center relative z-10">
                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-8"
                >
                    Clarity for people who want{' '}
                    <span className="gradient-text font-medium">more</span>{' '}
                    from their life —{' '}
                    <span className="text-[var(--text-secondary)]">
                        whatever "more" means to them.
                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    className="mb-10"
                >
                    <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-6">
                        PlannrAI is an AI-powered planning and clarity system for anyone trying to move forward —
                        whether you're chasing big goals, fixing small things, or just trying to get unstuck.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-[var(--text-tertiary)]">
                        <span>No guilt.</span>
                        <span className="text-[var(--accent-primary)]">•</span>
                        <span>No pressure.</span>
                        <span className="text-[var(--accent-primary)]">•</span>
                        <span>No pretending life is predictable.</span>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                    className="mb-6"
                >
                    <button
                        onClick={scrollToWaitlist}
                        className="btn-primary text-lg px-10 py-4"
                    >
                        Join the early access list
                    </button>
                    <p className="text-sm text-[var(--text-tertiary)] mt-4">
                        Early access will be limited. We're building this carefully.
                    </p>
                </motion.div>

                {/* Trust Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-12 pt-8 border-t border-[var(--bg-tertiary)]"
                >
                    <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
                        <Shield className="w-4 h-4 text-[var(--accent-primary)]" />
                        <span>Private by design</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
                        <Heart className="w-4 h-4 text-[var(--accent-primary)]" />
                        <span>No streaks or shame</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
                        <Sliders className="w-4 h-4 text-[var(--accent-primary)]" />
                        <span>You stay in control</span>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <div className="w-6 h-10 border-2 border-[var(--text-tertiary)] rounded-full p-1">
                        <motion.div
                            animate={{ y: [0, 16, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-2 h-2 bg-[var(--accent-primary)] rounded-full mx-auto"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
