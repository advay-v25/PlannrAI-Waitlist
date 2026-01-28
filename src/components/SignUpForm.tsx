'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Loader2, CheckCircle2, AlertCircle, Send, 
    ChevronRight, ChevronLeft, User, Target, 
    DollarSign, Sparkles 
} from 'lucide-react';

// ============ TYPES ============
interface FormData {
    // Step 1: Basics
    fullName: string;
    email: string;
    ageRange: string;
    occupation: string;
    
    // Step 2: Current Situation
    currentTools: string[];
    painPoints: string[];
    
    // Step 3: Wants & Needs
    topFeatures: string[];
    mainGoal: string;
    
    // Step 4: Pricing & Closing
    willingToPay: string;
    priceJustification: string;
    referralSource: string;
}

interface FormErrors {
    [key: string]: string | undefined;
}

// ============ OPTIONS DATA ============
const AGE_RANGES = ['18-24', '25-34', '35-44', '45-54', '55+'];

const OCCUPATIONS = [
    'Student', 
    'Employee', 
    'Freelancer', 
    'Entrepreneur', 
    'Manager/Leader', 
    'Creative Professional',
    'Other'
];

const CURRENT_TOOLS = [
    'Notion', 'Todoist', 'Google Calendar', 'Apple Reminders',
    'Obsidian', 'Physical Planner', 'Spreadsheets', 
    'Trello/Asana', 'Nothing organized', 'Other'
];

const PAIN_POINTS = [
    'Too many tools, no single view',
    'Forgetting tasks & deadlines',
    'Can\'t stick to routines',
    'Overwhelmed by planning',
    'No accountability',
    'Goals feel abstract',
    'Life feels reactive, not proactive',
    'Procrastination'
];

const TOP_FEATURES = [
    'AI that knows my priorities',
    'Smart daily planning',
    'Goal tracking & milestones',
    'Habit builder',
    'Weekly/monthly reviews',
    'Focus mode & time blocking',
    'Life dashboard',
    'Gentle reminders (no spam)'
];

const MAIN_GOALS = [
    'Get more done daily',
    'Build better habits',
    'Achieve long-term goals',
    'Reduce overwhelm & stress',
    'Better work-life balance',
    'Stop procrastinating',
    'Be more intentional'
];

const PRICE_OPTIONS = [
    { value: 'free-only', label: 'Free only', subtext: 'I\'d only use a free version' },
    { value: '5-9', label: '$5-9/mo', subtext: 'If it saves me time' },
    { value: '10-19', label: '$10-19/mo', subtext: 'If it truly works' },
    { value: '20-29', label: '$20-29/mo', subtext: 'For a premium experience' },
    { value: '30+', label: '$30+/mo', subtext: 'If it transforms my life' },
];

const REFERRAL_SOURCES = [
    'Twitter/X', 'Instagram', 'TikTok', 'YouTube', 
    'Friend referral', 'Google search', 'Other'
];

const STEPS = [
    { id: 1, title: 'About You', icon: User },
    { id: 2, title: 'Current State', icon: Target },
    { id: 3, title: 'What You Need', icon: Sparkles },
    { id: 4, title: 'Final Details', icon: DollarSign },
];

// ============ COMPONENT ============
export default function SignUpForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        ageRange: '',
        occupation: '',
        currentTools: [],
        painPoints: [],
        topFeatures: [],
        mainGoal: '',
        willingToPay: '',
        priceJustification: '',
        referralSource: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // ============ VALIDATION ============
    const validateStep = (step: number): boolean => {
        const newErrors: FormErrors = {};

        if (step === 1) {
            if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
            if (!formData.email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'Please enter a valid email';
            }
            if (!formData.ageRange) newErrors.ageRange = 'Please select your age range';
            if (!formData.occupation) newErrors.occupation = 'Please select your occupation';
        }

        if (step === 2) {
            if (formData.currentTools.length === 0) newErrors.currentTools = 'Select at least one option';
            if (formData.painPoints.length === 0) newErrors.painPoints = 'Select at least one pain point';
        }

        if (step === 3) {
            if (formData.topFeatures.length === 0) newErrors.topFeatures = 'Select at least one feature';
            if (formData.topFeatures.length > 3) newErrors.topFeatures = 'Select up to 3 features';
            if (!formData.mainGoal) newErrors.mainGoal = 'Select your main goal';
        }

        if (step === 4) {
            if (!formData.willingToPay) newErrors.willingToPay = 'Please select a pricing option';
            if (!formData.referralSource) newErrors.referralSource = 'Let us know how you found us';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ============ NAVIGATION ============
    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 4));
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    // ============ HANDLERS ============
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const handleSelect = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    const handleMultiSelect = (field: 'currentTools' | 'painPoints' | 'topFeatures', value: string) => {
        setFormData(prev => {
            const current = prev[field];
            const maxItems = field === 'topFeatures' ? 3 : 10;
            
            if (current.includes(value)) {
                return { ...prev, [field]: current.filter(v => v !== value) };
            } else if (current.length < maxItems) {
                return { ...prev, [field]: [...current, value] };
            }
            return prev;
        });
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    // ============ SUBMIT ============
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep(4)) return;

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const submitData = {
                submissionId: crypto.randomUUID(),
                ...formData,
                currentTools: formData.currentTools.join(', '),
                painPoints: formData.painPoints.join(', '),
                topFeatures: formData.topFeatures.join(', '),
                submittedAt: new Date().toISOString(),
            };

            const response = await fetch('/api/submit-signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Submission-ID': submitData.submissionId,
                },
                body: JSON.stringify(submitData),
            });

            const result = await response.json();

            if (response.ok) {
                setSubmitStatus('success');
            } else {
                setSubmitStatus('error');
                setErrorMessage(result.error || 'Something went wrong. Please try again.');
            }
        } catch {
            setSubmitStatus('error');
            setErrorMessage('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // ============ SUCCESS STATE ============
    if (submitStatus === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                    <CheckCircle2 className="w-16 h-16 text-[var(--accent-primary)] mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">You're In! 🎉</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                    Welcome to the waitlist. We'll be in touch soon with exclusive updates.
                </p>
                <p className="text-sm text-[var(--text-tertiary)]">
                    Your responses help us build exactly what you need.
                </p>
            </motion.div>
        );
    }

    // ============ RENDER ============
    return (
        <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between mb-3">
                    {STEPS.map((step) => (
                        <div 
                            key={step.id} 
                            className={`flex flex-col items-center flex-1 ${
                                step.id < currentStep ? 'cursor-pointer' : ''
                            }`}
                            onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                                step.id === currentStep 
                                    ? 'bg-[var(--accent-primary)] text-black' 
                                    : step.id < currentStep 
                                        ? 'bg-[var(--accent-primary)]/30 text-[var(--accent-primary)]' 
                                        : 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]'
                            }`}>
                                {step.id < currentStep ? (
                                    <CheckCircle2 className="w-5 h-5" />
                                ) : (
                                    <step.icon className="w-5 h-5" />
                                )}
                            </div>
                            <span className={`text-xs hidden sm:block ${
                                step.id === currentStep ? 'text-white' : 'text-[var(--text-tertiary)]'
                            }`}>
                                {step.title}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="h-1 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-[var(--accent-primary)]"
                        initial={{ width: '0%' }}
                        animate={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            {/* Error Banner */}
            {submitStatus === 'error' && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30 mb-6"
                >
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-400 text-sm">{errorMessage}</p>
                </motion.div>
            )}

            {/* Step Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* STEP 1: About You */}
                    {currentStep === 1 && (
                        <div className="space-y-5">
                            <h3 className="text-xl font-semibold text-white mb-4">Let's get to know you</h3>
                            
                            {/* Name & Email */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className={`form-input ${errors.fullName ? 'border-red-500' : ''}`}
                                        placeholder="Your name"
                                    />
                                    {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                                        placeholder="you@example.com"
                                    />
                                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                                </div>
                            </div>

                            {/* Age Range */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                                    Age Range *
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {AGE_RANGES.map(age => (
                                        <button
                                            key={age}
                                            type="button"
                                            onClick={() => handleSelect('ageRange', age)}
                                            className={`px-4 py-2 rounded-lg text-sm transition-all ${
                                                formData.ageRange === age
                                                    ? 'bg-[var(--accent-primary)] text-black font-medium'
                                                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/80'
                                            }`}
                                        >
                                            {age}
                                        </button>
                                    ))}
                                </div>
                                {errors.ageRange && <p className="text-red-400 text-sm mt-2">{errors.ageRange}</p>}
                            </div>

                            {/* Occupation */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                                    What do you do? *
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {OCCUPATIONS.map(occ => (
                                        <button
                                            key={occ}
                                            type="button"
                                            onClick={() => handleSelect('occupation', occ)}
                                            className={`px-4 py-2 rounded-lg text-sm transition-all ${
                                                formData.occupation === occ
                                                    ? 'bg-[var(--accent-primary)] text-black font-medium'
                                                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/80'
                                            }`}
                                        >
                                            {occ}
                                        </button>
                                    ))}
                                </div>
                                {errors.occupation && <p className="text-red-400 text-sm mt-2">{errors.occupation}</p>}
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Current Situation */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-white mb-4">Your current state</h3>

                            {/* Current Tools */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                                    What do you currently use to stay organized? *
                                    <span className="text-[var(--text-tertiary)] font-normal ml-2">(Select all that apply)</span>
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {CURRENT_TOOLS.map(tool => (
                                        <button
                                            key={tool}
                                            type="button"
                                            onClick={() => handleMultiSelect('currentTools', tool)}
                                            className={`px-4 py-2 rounded-lg text-sm transition-all ${
                                                formData.currentTools.includes(tool)
                                                    ? 'bg-[var(--accent-primary)] text-black font-medium'
                                                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/80'
                                            }`}
                                        >
                                            {tool}
                                        </button>
                                    ))}
                                </div>
                                {errors.currentTools && <p className="text-red-400 text-sm mt-2">{errors.currentTools}</p>}
                            </div>

                            {/* Pain Points */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                                    What frustrates you most about staying productive? *
                                    <span className="text-[var(--text-tertiary)] font-normal ml-2">(Select all that apply)</span>
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {PAIN_POINTS.map(pain => (
                                        <button
                                            key={pain}
                                            type="button"
                                            onClick={() => handleMultiSelect('painPoints', pain)}
                                            className={`px-4 py-2 rounded-lg text-sm transition-all ${
                                                formData.painPoints.includes(pain)
                                                    ? 'bg-[var(--accent-primary)] text-black font-medium'
                                                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/80'
                                            }`}
                                        >
                                            {pain}
                                        </button>
                                    ))}
                                </div>
                                {errors.painPoints && <p className="text-red-400 text-sm mt-2">{errors.painPoints}</p>}
                            </div>
                        </div>
                    )}

                    {/* STEP 3: What You Need */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-white mb-4">What would help you most?</h3>

                            {/* Top Features */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                                    Which features matter most to you? *
                                    <span className="text-[var(--text-tertiary)] font-normal ml-2">(Pick up to 3)</span>
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {TOP_FEATURES.map(feature => (
                                        <button
                                            key={feature}
                                            type="button"
                                            onClick={() => handleMultiSelect('topFeatures', feature)}
                                            className={`px-4 py-2 rounded-lg text-sm transition-all ${
                                                formData.topFeatures.includes(feature)
                                                    ? 'bg-[var(--accent-primary)] text-black font-medium'
                                                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/80'
                                            } ${formData.topFeatures.length >= 3 && !formData.topFeatures.includes(feature) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={formData.topFeatures.length >= 3 && !formData.topFeatures.includes(feature)}
                                        >
                                            {feature}
                                        </button>
                                    ))}
                                </div>
                                {formData.topFeatures.length > 0 && (
                                    <p className="text-[var(--accent-primary)] text-sm mt-2">
                                        {formData.topFeatures.length}/3 selected
                                    </p>
                                )}
                                {errors.topFeatures && <p className="text-red-400 text-sm mt-2">{errors.topFeatures}</p>}
                            </div>

                            {/* Main Goal */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                                    What's your #1 goal with PlannrAI? *
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {MAIN_GOALS.map(goal => (
                                        <button
                                            key={goal}
                                            type="button"
                                            onClick={() => handleSelect('mainGoal', goal)}
                                            className={`px-4 py-2 rounded-lg text-sm transition-all ${
                                                formData.mainGoal === goal
                                                    ? 'bg-[var(--accent-primary)] text-black font-medium'
                                                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/80'
                                            }`}
                                        >
                                            {goal}
                                        </button>
                                    ))}
                                </div>
                                {errors.mainGoal && <p className="text-red-400 text-sm mt-2">{errors.mainGoal}</p>}
                            </div>
                        </div>
                    )}

                    {/* STEP 4: Pricing & Closing */}
                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-white mb-4">Almost there!</h3>

                            {/* Willingness to Pay */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                                    What would you be willing to pay for a life-changing productivity tool? *
                                </label>
                                <div className="grid gap-2">
                                    {PRICE_OPTIONS.map(option => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => handleSelect('willingToPay', option.value)}
                                            className={`flex items-center justify-between p-4 rounded-lg text-left transition-all ${
                                                formData.willingToPay === option.value
                                                    ? 'bg-[var(--accent-primary)]/20 border-2 border-[var(--accent-primary)]'
                                                    : 'bg-[var(--bg-tertiary)] border-2 border-transparent hover:border-[var(--bg-tertiary)]'
                                            }`}
                                        >
                                            <div>
                                                <span className={`font-medium ${formData.willingToPay === option.value ? 'text-[var(--accent-primary)]' : 'text-white'}`}>
                                                    {option.label}
                                                </span>
                                                <span className="text-[var(--text-tertiary)] text-sm ml-2">
                                                    {option.subtext}
                                                </span>
                                            </div>
                                            {formData.willingToPay === option.value && (
                                                <CheckCircle2 className="w-5 h-5 text-[var(--accent-primary)]" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                                {errors.willingToPay && <p className="text-red-400 text-sm mt-2">{errors.willingToPay}</p>}
                            </div>

                            {/* What would make you pay (optional) */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                    What would make you happily pay for this?
                                    <span className="text-[var(--text-tertiary)] font-normal ml-2">(Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    name="priceJustification"
                                    value={formData.priceJustification}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="E.g., 'If it actually helped me stick to my goals'"
                                />
                            </div>

                            {/* Referral Source */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                                    How did you hear about PlannrAI? *
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {REFERRAL_SOURCES.map(source => (
                                        <button
                                            key={source}
                                            type="button"
                                            onClick={() => handleSelect('referralSource', source)}
                                            className={`px-4 py-2 rounded-lg text-sm transition-all ${
                                                formData.referralSource === source
                                                    ? 'bg-[var(--accent-primary)] text-black font-medium'
                                                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/80'
                                            }`}
                                        >
                                            {source}
                                        </button>
                                    ))}
                                </div>
                                {errors.referralSource && <p className="text-red-400 text-sm mt-2">{errors.referralSource}</p>}
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-[var(--bg-tertiary)]">
                {currentStep > 1 ? (
                    <button
                        type="button"
                        onClick={prevStep}
                        className="flex items-center gap-2 px-4 py-2 text-[var(--text-secondary)] hover:text-white transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                    </button>
                ) : (
                    <div />
                )}

                {currentStep < 4 ? (
                    <button
                        type="button"
                        onClick={nextStep}
                        className="btn-primary flex items-center gap-2"
                    >
                        Continue
                        <ChevronRight className="w-4 h-4" />
                    </button>
                ) : (
                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Join the Waitlist
                            </>
                        )}
                    </motion.button>
                )}
            </div>

            <p className="text-center text-sm text-[var(--text-tertiary)] mt-4">
                By joining, you agree to receive updates about PlannrAI. No spam, ever.
            </p>
        </form>
    );
}
