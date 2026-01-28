'use client';

import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { getWaitlistCount } from '@/lib/supabase';

export default function Counter() {
    const [count, setCount] = useState(0);
    const spring = useSpring(0, { stiffness: 100, damping: 30 });
    const display = useTransform(spring, (val) => Math.round(val));

    useEffect(() => {
        // Fetch actual count from Supabase
        const fetchCount = async () => {
            const actualCount = await getWaitlistCount();
            // Add a small base number for social proof if just starting
            const displayCount = actualCount < 10 ? actualCount + 47 : actualCount;
            setCount(displayCount);
            spring.set(displayCount);
        };

        fetchCount();
    }, [spring]);

    return (
        <div className="flex items-center justify-center gap-3 text-[var(--text-secondary)]">
            <div className="flex -space-x-2">
                {/* Avatar placeholders */}
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] border-2 border-[var(--bg-primary)] flex items-center justify-center text-xs font-medium"
                        style={{ zIndex: 4 - i }}
                    >
                        {['🚀', '💎', '⚡', '🔥'][i]}
                    </div>
                ))}
            </div>
            <p className="text-sm">
                <motion.span className="font-bold text-[var(--text-primary)]">
                    {count}
                </motion.span>
                {' '}ambitious souls already inside
            </p>
        </div>
    );
}
