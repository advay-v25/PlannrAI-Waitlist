'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { User, Building2, Check, Brain, Target, Clock, Users, BarChart3, Workflow, Plug } from 'lucide-react';

const services = [
    {
        title: 'For Individuals',
        icon: User,
        description: 'Personal productivity and growth optimization for ambitious individuals.',
        features: [
            { icon: Brain, text: 'AI-powered daily planning' },
            { icon: Target, text: 'Smart goal tracking' },
            { icon: Clock, text: 'Focus session management' },
            { icon: Check, text: 'Habit building & streaks' },
        ],
        cta: 'Start Your Journey',
    },
    {
        title: 'For Teams',
        icon: Building2,
        description: 'Team productivity analytics and workflow automation for growing businesses.',
        features: [
            { icon: Users, text: 'Team productivity insights' },
            { icon: BarChart3, text: 'Performance analytics' },
            { icon: Workflow, text: 'Workflow automation' },
            { icon: Plug, text: 'Integration APIs' },
        ],
        cta: 'Scale Your Team',
        comingSoon: true,
    },
];

export default function ServicesSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const scrollToSignup = () => {
        const element = document.getElementById('signup');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="services" className="section-padding relative" ref={ref}>
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-[var(--accent-primary)] font-medium mb-4 uppercase tracking-wider text-sm">
                        Choose Your Path
                    </p>
                    <h2 className="heading-lg text-white mb-4">
                        One platform. <span className="gradient-text">Infinite possibilities.</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Whether you're optimizing your personal life or scaling a team,
                        PlannrAI adapts to your needs.
                    </p>
                </motion.div>

                {/* Services Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="glass-card p-8 relative overflow-hidden group"
                        >
                            {/* Coming Soon Badge */}
                            {service.comingSoon && (
                                <div className="absolute top-4 right-4 px-3 py-1 text-xs font-medium bg-[var(--accent-muted)] text-[var(--accent-primary)] rounded-full">
                                    Coming Soon
                                </div>
                            )}

                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-[var(--accent-muted)] flex items-center justify-center mb-6">
                                <service.icon className="w-7 h-7 text-[var(--accent-primary)]" />
                            </div>

                            {/* Title & Description */}
                            <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                            <p className="text-[var(--text-secondary)] mb-6">{service.description}</p>

                            {/* Features */}
                            <ul className="space-y-3 mb-8">
                                {service.features.map((feature) => (
                                    <li key={feature.text} className="flex items-center gap-3">
                                        <feature.icon className="w-5 h-5 text-[var(--accent-primary)]" />
                                        <span className="text-[var(--text-secondary)]">{feature.text}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <button
                                onClick={scrollToSignup}
                                className={`w-full py-3 rounded-lg font-medium transition-all ${service.comingSoon
                                        ? 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] cursor-not-allowed'
                                        : 'btn-primary'
                                    }`}
                                disabled={service.comingSoon}
                            >
                                {service.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
