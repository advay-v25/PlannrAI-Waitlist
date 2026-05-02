'use client';



export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="relative py-12 px-6 border-t border-[var(--bg-tertiary)]">
            <div className="max-w-6xl mx-auto">
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                    {/* Logo & Tagline */}
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <div className="flex items-center gap-2">
                            <img 
                                src="/logo.png" 
                                alt="PlannrAI Logo" 
                                className="w-8 h-8 object-contain rounded-md"
                            />
                            <span className="text-lg font-bold text-white">
                                Plannr<span className="text-[var(--accent-primary)]">AI</span>
                            </span>
                        </div>
                        <p className="text-sm text-[var(--text-tertiary)]">
                            Planning for real life.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-8">
                        <a
                            href="/about"
                            className="text-[var(--text-tertiary)] hover:text-white transition-colors text-sm"
                        >
                            About
                        </a>
                        <a
                            href="/privacy"
                            className="text-[var(--text-tertiary)] hover:text-white transition-colors text-sm"
                        >
                            Privacy
                        </a>
                        <a
                            href="/contact"
                            className="text-[var(--text-tertiary)] hover:text-white transition-colors text-sm"
                        >
                            Contact
                        </a>
                        <button
                            onClick={() => scrollToSection('waitlist')}
                            className="text-[var(--accent-primary)] hover:text-white transition-colors text-sm font-medium"
                        >
                            Early Access
                        </button>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-xs text-[var(--text-tertiary)]">
                    © {currentYear} PlannrAI. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
