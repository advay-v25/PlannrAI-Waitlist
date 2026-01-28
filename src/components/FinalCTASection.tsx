'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function FinalCTASection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const scrollToWaitlist = () => {
        const element = document.getElementById('waitlist');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="section-padding relative" ref={ref}>
            {/* Subtle background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,65,0.04)_0%,_transparent_60%)]" />

            <div className="max-w-2xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
                        If you want life to feel a little more{' '}
                        <span className="gradient-text font-medium">intentional</span>,{' '}
                        join us early.
                    </h2>

                    <button
                        onClick={scrollToWaitlist}
                        className="btn-primary text-lg px-10 py-4 mb-6"
                    >
                        Request early access
                    </button>

                    <p className="text-sm text-[var(--text-tertiary)]">
                        No spam. No pressure. Updates only when it matters.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
