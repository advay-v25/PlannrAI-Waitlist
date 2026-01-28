'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { joinWaitlist } from '@/lib/supabase';

export default function EmailForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            setStatus('error');
            setMessage('Please enter a valid email');
            return;
        }

        setStatus('loading');

        try {
            const result = await joinWaitlist(email);

            if (result.success) {
                setStatus('success');
                setMessage('Welcome to the 1% Club! Check your inbox.');
                setEmail('');
            } else {
                setStatus('error');
                setMessage(result.error || 'Something went wrong');
            }
        } catch (err) {
            setStatus('error');
            setMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="relative">
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        disabled={status === 'loading' || status === 'success'}
                        className="flex-1 px-5 py-4 bg-[var(--bg-secondary)] border border-[var(--text-tertiary)]/20 rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className="btn-primary px-8 py-4 rounded-xl font-semibold text-white whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'loading' ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Joining...
                            </span>
                        ) : status === 'success' ? (
                            '✓ You\'re in!'
                        ) : (
                            'Join the Club'
                        )}
                    </button>
                </div>
            </form>

            {/* Status Message */}
            <AnimatePresence>
                {message && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`mt-4 text-sm text-center ${status === 'success' ? 'text-[var(--accent-success)]' : 'text-red-400'
                            }`}
                    >
                        {message}
                    </motion.p>
                )}
            </AnimatePresence>

            {/* Privacy note */}
            <p className="mt-4 text-xs text-[var(--text-tertiary)] text-center">
                No spam, ever. We respect your inbox.
            </p>
        </div>
    );
}
