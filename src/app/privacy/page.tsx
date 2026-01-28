'use client';

import { motion } from 'framer-motion';
import { Zap, ArrowLeft, Shield, Database, Users, Trash2, Lock, RefreshCw, Mail } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
    const sections = [
        {
            icon: Database,
            title: 'What Data Do We Collect?',
            content: 'We may collect basic personal information such as your name, email address, age, goals, expectations, and challenges that you voluntarily share while using PlannrAI.',
        },
        {
            icon: Shield,
            title: 'How Do We Use This Data?',
            content: 'Your data is used solely to improve your experience, personalize insights, and enhance the product. We do not sell your data.',
        },
        {
            icon: RefreshCw,
            title: 'How Long Is Data Stored?',
            content: 'Data is stored only for as long as necessary to provide the service or until you request deletion.',
        },
        {
            icon: Users,
            title: 'Do We Share Data With Third Parties?',
            content: 'We do not share personal data with third parties, except where required to operate the service (such as secure hosting or analytics providers) or where legally required.',
        },
        {
            icon: Trash2,
            title: 'Your Control',
            content: 'You may request access, correction, or deletion of your data at any time by contacting us at advayvaidya.25@gmail.com.',
        },
        {
            icon: Lock,
            title: 'Security',
            content: 'We take reasonable measures to protect your information, including industry-standard encryption and secure hosting practices. However, no system is 100% secure, and we cannot guarantee absolute security.',
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
                            Privacy Policy
                        </h1>
                        <p className="text-[var(--text-secondary)] text-lg mb-4">
                            Your privacy matters to us. Here's how we handle your data.
                        </p>
                        <p className="text-[var(--text-tertiary)] text-sm mb-12">
                            Last updated: January 2026
                        </p>

                        {/* Sections */}
                        <div className="space-y-8">
                            {sections.map((section, i) => (
                                <motion.section
                                    key={section.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                    className="glass-card p-6"
                                >
                                    <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                                        <section.icon className="w-5 h-5 text-[var(--accent-primary)]" />
                                        {section.title}
                                    </h2>
                                    <p className="text-[var(--text-secondary)] leading-relaxed">
                                        {section.content}
                                    </p>
                                </motion.section>
                            ))}
                        </div>

                        {/* Additional Legal */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 glass-card p-6"
                        >
                            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                                <RefreshCw className="w-5 h-5 text-[var(--accent-secondary)]" />
                                Updates to This Policy
                            </h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                                This privacy policy may be updated as the product evolves. We will notify users
                                of significant changes via email or through the app. Continued use of PlannrAI
                                after changes constitutes acceptance of the updated policy.
                            </p>
                        </motion.section>

                        {/* Cookies */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55 }}
                            className="mt-8 glass-card p-6"
                        >
                            <h2 className="text-xl font-bold text-white mb-3">
                                Cookies & Analytics
                            </h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                We may use cookies and similar technologies to enhance your experience and
                                gather anonymous usage analytics. You can disable cookies in your browser
                                settings, though this may affect functionality.
                            </p>
                        </motion.section>

                        {/* Age Requirement */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-8 glass-card p-6"
                        >
                            <h2 className="text-xl font-bold text-white mb-3">
                                Age Requirement
                            </h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                PlannrAI is intended for users aged 13 and above. We do not knowingly collect
                                personal information from children under 13. If we become aware of such data,
                                we will delete it promptly.
                            </p>
                        </motion.section>

                        {/* Contact */}
                        <div className="mt-12 text-center pt-8 border-t border-[var(--bg-tertiary)]">
                            <p className="text-[var(--text-secondary)] mb-4">
                                Questions about this policy?
                            </p>
                            <Link
                                href="/contact"
                                className="text-[var(--accent-primary)] hover:underline inline-flex items-center gap-2"
                            >
                                <Mail className="w-4 h-4" />
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
