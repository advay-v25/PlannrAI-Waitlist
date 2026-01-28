'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, X, Zap, Crown, Rocket } from 'lucide-react';

const pricingPlans = [
    {
        name: 'Free',
        icon: Zap,
        price: '$0',
        period: 'forever',
        description: 'Get started with the essentials',
        features: [
            { text: 'Basic AI coaching', included: true },
            { text: '3 active goals', included: true },
            { text: 'Weekly progress reports', included: true },
            { text: 'Community access', included: true },
            { text: 'Advanced insights', included: false },
            { text: 'Priority support', included: false },
        ],
        cta: 'Get Started Free',
        popular: false,
    },
    {
        name: 'Pro',
        icon: Rocket,
        price: '$9',
        period: '/month',
        description: 'For serious achievers',
        features: [
            { text: 'Advanced AI insights', included: true },
            { text: 'Unlimited goals', included: true },
            { text: 'Daily progress reports', included: true },
            { text: 'Priority features', included: true },
            { text: 'Advanced analytics', included: true },
            { text: '1-on-1 coaching calls', included: false },
        ],
        cta: 'Start Pro Trial',
        popular: true,
    },
    {
        name: 'Elite',
        icon: Crown,
        price: '$29',
        period: '/month',
        description: 'The ultimate life OS',
        features: [
            { text: 'Everything in Pro', included: true },
            { text: 'Priority support', included: true },
            { text: 'Monthly 1-on-1 coaching', included: true },
            { text: 'Custom integrations', included: true },
            { text: 'Early access to features', included: true },
            { text: 'Dedicated success manager', included: true },
        ],
        cta: 'Go Elite',
        popular: false,
    },
];

export default function PricingSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const scrollToSignup = () => {
        const element = document.getElementById('signup');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="pricing" className="section-padding relative" ref={ref}>
            {/* Background gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(0,255,65,0.05)_0%,_transparent_60%)]" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-[var(--accent-primary)] font-medium mb-4 uppercase tracking-wider text-sm">
                        Pricing
                    </p>
                    <h2 className="heading-lg text-white mb-4">
                        Invest in <span className="gradient-text">yourself</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Choose the plan that fits your ambition. All plans include core AI features.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className={`glass-card p-8 relative ${plan.popular ? 'pricing-popular' : ''
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold bg-[var(--accent-primary)] text-black rounded-full">
                                    Most Popular
                                </div>
                            )}

                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${plan.popular
                                    ? 'bg-[var(--accent-primary)]'
                                    : 'bg-[var(--accent-muted)]'
                                }`}>
                                <plan.icon className={`w-6 h-6 ${plan.popular ? 'text-black' : 'text-[var(--accent-primary)]'
                                    }`} />
                            </div>

                            {/* Plan Name */}
                            <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                            <p className="text-[var(--text-tertiary)] text-sm mb-4">{plan.description}</p>

                            {/* Price */}
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-white">{plan.price}</span>
                                <span className="text-[var(--text-tertiary)]">{plan.period}</span>
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature) => (
                                    <li key={feature.text} className="flex items-center gap-3">
                                        {feature.included ? (
                                            <Check className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0" />
                                        ) : (
                                            <X className="w-5 h-5 text-[var(--text-tertiary)] flex-shrink-0" />
                                        )}
                                        <span className={feature.included ? 'text-[var(--text-secondary)]' : 'text-[var(--text-tertiary)]'}>
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <button
                                onClick={scrollToSignup}
                                className={`w-full py-3 rounded-lg font-medium transition-all ${plan.popular
                                        ? 'btn-primary'
                                        : 'btn-secondary'
                                    }`}
                            >
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center text-[var(--text-tertiary)] text-sm mt-12"
                >
                    All plans include a 14-day free trial. No credit card required.
                </motion.p>
            </div>
        </section>
    );
}
