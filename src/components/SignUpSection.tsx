'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import SignUpForm from './SignUpForm';
import { Sparkles } from 'lucide-react';

export default function SignUpSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="signup" className="section-padding relative" ref={ref}>
            {/* Background gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,65,0.03)_0%,_transparent_50%)]" />

            <div className="max-w-3xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <Sparkles className="w-4 h-4 text-[var(--accent-primary)]" />
                        <span className="text-sm text-[var(--text-secondary)]">Limited Early Access</span>
                    </div>
                    <h2 className="heading-lg text-white mb-4">
                        Ready to join the <span className="gradient-text">1% Club</span>?
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
                        Tell us about yourself and what you're looking for.
                        We'll personally review every application.
                    </p>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <SignUpForm />
                </motion.div>
            </div>
        </section>
    );
}
