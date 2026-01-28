'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, X, Sparkles } from 'lucide-react';

const aiDoes = [
    'Understand your goals and time',
    'Notice patterns you might miss',
    'Help you reflect and adjust',
];

const aiDoesnt = [
    'Never changes your plan without asking',
    'Never tells you what you "should" want',
    'Never pressures you to do more',
    'Never judges missed days',
];

export default function AISection() {
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
                        <Sparkles className="w-4 h-4 text-[var(--accent-primary)]" />
                        <span className="text-sm text-[var(--text-secondary)]">AI Done Differently</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-light text-white">
                        AI that supports your thinking —{' '}
                        <span className="gradient-text font-medium">not replaces it</span>
                    </h2>
                </motion.div>

                {/* Two Columns */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* What AI Does */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-card p-8"
                    >
                        <h3 className="text-lg font-medium text-white mb-6">
                            PlannrAI uses AI to:
                        </h3>
                        <ul className="space-y-4">
                            {aiDoes.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                                    <span className="text-[var(--text-secondary)]">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* What AI Doesn't Do */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="glass-card p-8"
                    >
                        <h3 className="text-lg font-medium text-white mb-6">
                            But AI in PlannrAI:
                        </h3>
                        <ul className="space-y-4">
                            {aiDoesnt.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-[var(--text-secondary)]">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Closing Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <p className="text-2xl text-white font-light">
                        The AI thinks. <span className="gradient-text font-medium">You decide.</span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
