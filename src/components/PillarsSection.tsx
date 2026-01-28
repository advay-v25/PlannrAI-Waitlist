'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const pillars = [
    {
        id: 'mind',
        icon: '🧠',
        title: 'Mind',
        color: '#8B5CF6',
        description: 'Clarity, focus, and mental strength. Master your thoughts, master your life.',
        features: ['Daily reflection prompts', 'Stress tracking', 'Focus blocks'],
    },
    {
        id: 'body',
        icon: '💪',
        title: 'Body',
        color: '#10B981',
        description: 'Your physical foundation. Energy, health, and vitality drive everything.',
        features: ['Workout scheduling', 'Energy tracking', 'Sleep optimization'],
    },
    {
        id: 'wealth',
        icon: '💎',
        title: 'Wealth',
        color: '#F59E0B',
        description: 'Financial growth and career wins. Build the life you deserve.',
        features: ['Goal milestones', 'Skill development', 'Progress tracking'],
    },
];

export default function PillarsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <section ref={ref} className="py-24 px-6 relative">
            {/* Background glow */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background: 'radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 60%)',
                }}
            />

            <div className="max-w-5xl mx-auto relative">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-[var(--accent-secondary)] font-medium mb-4 uppercase tracking-wide">
                        The Solution
                    </p>
                    <h2 className="heading-lg text-[var(--text-primary)] max-w-2xl mx-auto">
                        Three pillars. One{' '}
                        <span className="gradient-text">unstoppable</span> you.
                    </h2>
                </motion.div>

                {/* Pillar Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={pillar.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                            onMouseEnter={() => setHovered(pillar.id)}
                            onMouseLeave={() => setHovered(null)}
                            className="relative group"
                        >
                            <div
                                className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--text-tertiary)]/10 transition-all duration-300"
                                style={{
                                    boxShadow: hovered === pillar.id ? `0 0 40px ${pillar.color}30` : 'none',
                                    borderColor: hovered === pillar.id ? `${pillar.color}50` : undefined,
                                }}
                            >
                                {/* Icon */}
                                <div
                                    className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-4 transition-transform group-hover:scale-110"
                                    style={{ background: `${pillar.color}20` }}
                                >
                                    {pillar.icon}
                                </div>

                                {/* Content */}
                                <h3
                                    className="text-2xl font-bold mb-3 transition-colors"
                                    style={{ color: hovered === pillar.id ? pillar.color : 'var(--text-primary)' }}
                                >
                                    {pillar.title}
                                </h3>
                                <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                                    {pillar.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-2">
                                    {pillar.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
                                            <span style={{ color: pillar.color }}>✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
