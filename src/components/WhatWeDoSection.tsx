'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Calendar, RefreshCw } from 'lucide-react';

const pillars = [
    {
        icon: Target,
        title: 'You decide what matters',
        description: 'Big goals, small goals, or just "get my life together." You choose how much time you want to give — nothing more.',
    },
    {
        icon: Calendar,
        title: 'PlannrAI helps you plan honestly',
        description: 'Your time shows up in a calendar you can actually live with.',
    },
    {
        icon: RefreshCw,
        title: 'When reality doesn\'t match the plan, you adapt — not fail',
        description: 'No guilt. No reset. Just reflection and adjustment.',
    },
];

export default function WhatWeDoSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className="section-padding relative" ref={ref}>
            {/* Subtle background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,255,65,0.03)_0%,_transparent_50%)]" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-light text-white">
                        PlannrAI helps you see your life clearly —{' '}
                        <span className="gradient-text font-medium">and adjust without judgment.</span>
                    </h2>
                </motion.div>

                {/* Three Pillars */}
                <div className="space-y-6">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={pillar.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.15 * (index + 1) }}
                            className="glass-card p-6 md:p-8 flex items-start gap-5"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[var(--accent-muted)] flex items-center justify-center flex-shrink-0">
                                <pillar.icon className="w-6 h-6 text-[var(--accent-primary)]" />
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-medium text-white mb-2">
                                    {index + 1}. {pillar.title}
                                </h3>
                                <p className="text-[var(--text-secondary)]">
                                    {pillar.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
