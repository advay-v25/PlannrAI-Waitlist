'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check } from 'lucide-react';

const forYouIf = [
    'You have goals, but execution feels messy',
    'You feel mentally cluttered or unfocused',
    'You want structure, not pressure',
    'You\'ve tried planners, habits, or productivity apps and bounced off',
    'You want AI help — but not AI control',
    'You\'ve deleted more habit apps than you\'ve kept',
];

export default function WhoSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className="section-padding relative" ref={ref}>
            {/* Subtle background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(0,255,65,0.03)_0%,_transparent_50%)]" />

            <div className="max-w-3xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-light text-white">
                        PlannrAI is for anyone who wants things to feel{' '}
                        <span className="gradient-text font-medium">less chaotic.</span>
                    </h2>
                </motion.div>

                {/* This is for you if... */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass-card p-8 mb-10"
                >
                    <p className="text-[var(--text-secondary)] mb-6 font-medium">
                        This is for you if:
                    </p>
                    <ul className="space-y-4">
                        {forYouIf.map((item, index) => (
                            <motion.li
                                key={item}
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                                className="flex items-start gap-3"
                            >
                                <Check className="w-5 h-5 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                                <span className="text-[var(--text-secondary)]">{item}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* Permission Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center"
                >
                    <div className="space-y-2 text-[var(--text-secondary)]">
                        <p>You don't need to be disciplined.</p>
                        <p>You don't need to be productive.</p>
                        <p>You don't need to have it all figured out.</p>
                    </div>
                    <p className="text-lg text-white font-medium mt-6">
                        You just need to care enough to look{' '}
                        <span className="gradient-text">honestly</span> at your life.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
