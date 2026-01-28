'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Check, X } from 'lucide-react';

const dataIs = [
    'Private',
    'Not sold',
    'Not used for training external models',
    'Always deletable',
];

const plannraiWillNever = [
    'Score you',
    'Compare you to others',
    'Shame you',
    'Try to keep you addicted',
];

export default function PrivacySection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className="section-padding relative" ref={ref}>
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <Shield className="w-4 h-4 text-[var(--accent-primary)]" />
                        <span className="text-sm text-[var(--text-secondary)]">Privacy & Trust</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-light text-white">
                        Built with <span className="gradient-text font-medium">boundaries</span>
                    </h2>
                </motion.div>

                {/* Two Columns */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Your Data Is */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-card p-8"
                    >
                        <h3 className="text-lg font-medium text-white mb-6">
                            Your data is:
                        </h3>
                        <ul className="space-y-4">
                            {dataIs.map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0" />
                                    <span className="text-[var(--text-secondary)]">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* PlannrAI Will Never */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="glass-card p-8"
                    >
                        <h3 className="text-lg font-medium text-white mb-6">
                            PlannrAI will never:
                        </h3>
                        <ul className="space-y-4">
                            {plannraiWillNever.map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                    <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                                    <span className="text-[var(--text-secondary)]">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Closing Statement */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center text-xl text-white font-light mt-12"
                >
                    This is a tool for clarity — <span className="gradient-text font-medium">not control.</span>
                </motion.p>
            </div>
        </section>
    );
}
