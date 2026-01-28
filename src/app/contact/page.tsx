'use client';

import { motion } from 'framer-motion';
import { Zap, ArrowLeft, Mail, Phone, MessageCircle, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
    const contactMethods = [
        {
            icon: Mail,
            title: 'Email',
            value: 'advayvaidya.25@gmail.com',
            href: 'mailto:advayvaidya.25@gmail.com',
            description: 'Best for detailed inquiries',
        },
        {
            icon: Phone,
            title: 'Phone',
            value: '+91 9619011111',
            href: 'tel:+919619011111',
            description: 'Available during business hours',
        },
    ];

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
                    <div className="w-16" />
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
                            Get in Touch
                        </h1>
                        <p className="text-[var(--text-secondary)] text-lg mb-12">
                            Have questions or feedback? We'd love to hear from you.
                        </p>

                        {/* Status Banner */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass-card p-6 mb-8 border-l-4 border-[var(--accent-primary)]"
                        >
                            <div className="flex items-start gap-4">
                                <Clock className="w-6 h-6 text-[var(--accent-primary)] flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-white font-semibold mb-1">Currently Building</h3>
                                    <p className="text-[var(--text-secondary)]">
                                        We're currently focused on building the product. Response times may vary,
                                        but we read every message and will get back to you as soon as possible.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Methods */}
                        <div className="grid gap-4 mb-12">
                            {contactMethods.map((method, i) => (
                                <motion.a
                                    key={method.title}
                                    href={method.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="glass-card p-6 flex items-center gap-4 hover:border-[var(--accent-primary)] transition-colors group"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-[var(--accent-primary)]/10 flex items-center justify-center group-hover:bg-[var(--accent-primary)]/20 transition-colors">
                                        <method.icon className="w-6 h-6 text-[var(--accent-primary)]" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-semibold">{method.title}</h3>
                                        <p className="text-[var(--accent-primary)]">{method.value}</p>
                                        <p className="text-[var(--text-tertiary)] text-sm">{method.description}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Social Links Coming Soon */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="glass-card p-6 text-center"
                        >
                            <MessageCircle className="w-8 h-8 text-[var(--text-tertiary)] mx-auto mb-3" />
                            <h3 className="text-white font-semibold mb-2">Social Links Coming Soon</h3>
                            <p className="text-[var(--text-secondary)] text-sm">
                                We're setting up our social presence. In the meantime,
                                email is the best way to reach us.
                            </p>
                        </motion.div>

                        {/* CTA */}
                        <div className="text-center pt-8 mt-8 border-t border-[var(--bg-tertiary)]">
                            <p className="text-[var(--text-secondary)] mb-4">Want early access instead?</p>
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
