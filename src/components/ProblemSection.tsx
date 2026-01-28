'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { X } from 'lucide-react';

const painPoints = [
    'Plans fall apart when life changes',
    'Missed days turn into guilt',
    'Productivity apps assume discipline, not reality',
    'AI tools give advice without understanding context',
];

export default function ProblemSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className="section-padding relative" ref={ref}>
            <div className="max-w-3xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
                        Most people don't need motivation.{' '}
                        <span className="gradient-text font-medium">They need clarity.</span>
                    </h2>
                </motion.div>

                {/* Main Copy */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="text-center mb-10"
                >
                    <p className="text-xl text-[var(--text-secondary)] mb-2">
                        You don't lack ambition.
                    </p>
                    <p className="text-xl text-white font-medium">
                        You're just carrying too much in your head.
                    </p>
                </motion.div>

                {/* Pain Points */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="glass-card p-8 mb-10"
                >
                    <ul className="space-y-4">
                        {painPoints.map((point, index) => (
                            <motion.li
                                key={point}
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                className="flex items-start gap-3 text-[var(--text-secondary)]"
                            >
                                <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                                <span>{point}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* Closing Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center"
                >
                    <p className="text-[var(--text-secondary)] mb-4">
                        Sometimes you're trying to achieve something big.
                        <br />
                        Sometimes you're just trying to get your head straight.
                    </p>
                    <p className="text-xl text-white font-medium">
                        PlannrAI is built for <span className="gradient-text">both</span>.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
