'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Calendar, CloudLightning, Heart, LineChart, Bot, Globe } from 'lucide-react';

const mvpFeatures = [
    { icon: Target, text: 'Goal planning in minutes per day' },
    { icon: Calendar, text: 'Calendar-based planning & reality tracking' },
    { icon: CloudLightning, text: 'Brain dump to clear mental clutter' },
    { icon: Heart, text: 'Emotional context (optional, private)' },
    { icon: LineChart, text: 'Weekly reflections' },
    { icon: Bot, text: 'A permission-based AI coach' },
    { icon: Globe, text: 'Relevant world context linked to your goals' },
];

export default function MVPSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className="section-padding relative" ref={ref}>
            {/* Subtle background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,255,65,0.03)_0%,_transparent_50%)]" />

            <div className="max-w-3xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                        What early access <span className="gradient-text font-medium">includes</span>
                    </h2>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass-card p-8"
                >
                    <div className="grid sm:grid-cols-2 gap-6">
                        {mvpFeatures.map((feature, index) => (
                            <motion.div
                                key={feature.text}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                                className="flex items-start gap-3"
                            >
                                <div className="w-10 h-10 rounded-lg bg-[var(--accent-muted)] flex items-center justify-center flex-shrink-0">
                                    <feature.icon className="w-5 h-5 text-[var(--accent-primary)]" />
                                </div>
                                <span className="text-[var(--text-secondary)] pt-2">{feature.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Note */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center text-[var(--text-tertiary)] text-sm mt-8"
                >
                    We're starting simple on purpose.
                </motion.p>
            </div>
        </section>
    );
}
