'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Compass, Clock, Activity, Brain, Settings } from 'lucide-react';

const loopSteps = [
    { icon: Compass, label: 'Intent', description: 'Set intentions in minutes, not perfection' },
    { icon: Clock, label: 'Time', description: 'See where your time was meant to go' },
    { icon: Activity, label: 'Reality', description: 'Log what really happened' },
    { icon: Brain, label: 'Reflection', description: 'Capture how you felt and what got in the way' },
    { icon: Settings, label: 'Adjustment', description: 'Adjust only when you\'re ready' },
];

export default function CoreLoopSection() {
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
                    <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                        A simple loop that works{' '}
                        <span className="gradient-text font-medium">even on bad weeks</span>
                    </h2>
                </motion.div>

                {/* Loop Visualization */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-12"
                >
                    {/* Loop Steps - Horizontal on desktop, vertical on mobile */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
                        {loopSteps.map((step, index) => (
                            <div key={step.label} className="flex flex-col md:flex-row items-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                    className="flex flex-col items-center"
                                >
                                    <div className="w-16 h-16 rounded-full bg-[var(--accent-muted)] border border-[var(--accent-primary)]/30 flex items-center justify-center mb-3 hover:border-[var(--accent-primary)] transition-colors">
                                        <step.icon className="w-7 h-7 text-[var(--accent-primary)]" />
                                    </div>
                                    <span className="text-sm font-medium text-white">{step.label}</span>
                                </motion.div>

                                {/* Arrow connector */}
                                {index < loopSteps.length - 1 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={isInView ? { opacity: 1 } : {}}
                                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                        className="hidden md:block mx-4 text-[var(--accent-primary)]"
                                    >
                                        →
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Step Descriptions */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="glass-card p-8"
                >
                    <ul className="space-y-4">
                        {loopSteps.map((step) => (
                            <li key={step.label} className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
                                <span className="text-[var(--text-secondary)]">{step.description}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Closing Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="text-center mt-10"
                >
                    <p className="text-[var(--text-secondary)] mb-2">
                        PlannrAI doesn't punish inconsistency.
                    </p>
                    <p className="text-xl text-white font-medium">
                        It <span className="gradient-text">expects</span> it.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
