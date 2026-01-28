'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const perks = [
    {
        icon: '🚀',
        title: 'Early Access',
        description: 'Be the first to use PlannrAI before public launch. Shape the future of personal productivity.',
    },
    {
        icon: '💬',
        title: 'Exclusive Community',
        description: 'Join our private Discord with other ambitious individuals. Network, share wins, grow together.',
    },
    {
        icon: '📞',
        title: 'Direct Founder Access',
        description: 'Weekly feedback sessions with the founder. Your voice directly influences the product.',
    },
];

export default function PerksSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section ref={ref} className="py-24 px-6 relative">
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-[var(--accent-success)] font-medium mb-4 uppercase tracking-wide">
                        Why Join Early
                    </p>
                    <h2 className="heading-lg text-[var(--text-primary)] max-w-2xl mx-auto">
                        The 1% Club isn&apos;t just early access. It&apos;s{' '}
                        <span className="gradient-text">belonging</span>.
                    </h2>
                </motion.div>

                {/* Perks Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {perks.map((perk, index) => (
                        <motion.div
                            key={perk.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                            className="text-center"
                        >
                            {/* Icon with glow */}
                            <div className="relative inline-block mb-6">
                                <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center text-4xl relative z-10">
                                    {perk.icon}
                                </div>
                                <div
                                    className="absolute inset-0 rounded-2xl blur-xl opacity-30"
                                    style={{ background: 'var(--gradient-primary)' }}
                                />
                            </div>

                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                                {perk.title}
                            </h3>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                {perk.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <p className="text-[var(--text-secondary)] mb-6">
                        Ready to join the movement?
                    </p>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white"
                    >
                        Join the 1% Club
                        <span>→</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
