'use client';

import { motion } from 'framer-motion';
import { Zap, ArrowLeft, Target, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[var(--bg-primary)]">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-[var(--bg-tertiary)]">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-[var(--text-tertiary)] hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                    </Link>
                    <Link href="/" className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-[var(--accent-primary)]" />
                        <span className="text-lg font-bold text-white">
                            Plannr<span className="text-[var(--accent-primary)]">AI</span>
                        </span>
                    </Link>
                    <div className="w-16" /> {/* Spacer for centering */}
                </div>
            </header>

            {/* Content */}
            <div className="pt-24 pb-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Page Title */}
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            About <span className="text-[var(--accent-primary)]">PlannrAI</span>
                        </h1>
                        <p className="text-[var(--text-secondary)] text-lg mb-12">
                            The story behind the system.
                        </p>

                        {/* Origin Story */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <Sparkles className="w-6 h-6 text-[var(--accent-primary)]" />
                                The Origin
                            </h2>
                            <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
                                <p>
                                    PlannrAI was born out of a simple frustration: having ambition, ideas, and
                                    potential—but no clear system to translate them into consistent action. Like
                                    many high-performing students and early builders, I found myself juggling goals,
                                    routines, studies, fitness, and long-term plans, all inside my head. The result
                                    wasn't laziness—it was mental clutter.
                                </p>
                                <p>
                                    PlannrAI exists to externalize that clutter. It's not another productivity app
                                    filled with to-do lists and notifications. It's a thinking partner—designed to
                                    help you structure your day, align short-term actions with long-term goals, and
                                    build discipline through clarity, not pressure.
                                </p>
                            </div>
                        </section>

                        {/* Mission */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <Target className="w-6 h-6 text-[var(--accent-secondary)]" />
                                Our Mission
                            </h2>
                            <div className="glass-card p-6 border-l-4 border-[var(--accent-primary)]">
                                <p className="text-lg text-white italic">
                                    "To make discipline feel simple and deviations almost guilt-free by giving
                                    people clarity, structure, and momentum."
                                </p>
                            </div>
                        </section>

                        {/* Values */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <Heart className="w-6 h-6 text-red-400" />
                                What We Believe
                            </h2>
                            <div className="grid gap-4">
                                {[
                                    { title: 'Clarity over motivation', desc: 'You don\'t need more inspiration. You need a clear system.' },
                                    { title: 'Structure is freedom', desc: 'The right constraints liberate you to focus on what matters.' },
                                    { title: 'Progress, not perfection', desc: 'Small wins compound. Consistency beats intensity.' },
                                    { title: 'AI as a partner', desc: 'Technology should support your thinking, not replace it.' },
                                ].map((value, i) => (
                                    <motion.div
                                        key={value.title}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + i * 0.1 }}
                                        className="glass-card p-4"
                                    >
                                        <h3 className="text-white font-semibold mb-1">{value.title}</h3>
                                        <p className="text-[var(--text-tertiary)] text-sm">{value.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* CTA */}
                        <div className="text-center pt-8 border-t border-[var(--bg-tertiary)]">
                            <p className="text-[var(--text-secondary)] mb-4">Ready to join the movement?</p>
                            <Link href="/#waitlist" className="btn-primary inline-flex items-center gap-2 px-6 py-3">
                                Join the Waitlist
                                <Zap className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
