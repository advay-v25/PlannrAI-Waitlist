/**
 * Cookie Utilities for PlannrAI
 */

export interface CookiePreferences {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
    timestamp: number;
}

const COOKIE_CONSENT_KEY = 'plannrai_cookie_consent';
const COOKIE_PREFERENCES_KEY = 'plannrai_cookie_preferences';

/**
 * Check if user has given cookie consent
 */
export function hasConsented(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(COOKIE_CONSENT_KEY) === 'true';
}

/**
 * Set cookie consent
 */
export function setConsent(accepted: boolean): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(COOKIE_CONSENT_KEY, accepted.toString());

    if (accepted) {
        // Set default preferences when accepting all
        setPreferences({
            necessary: true,
            analytics: true,
            marketing: false,
            timestamp: Date.now(),
        });
    }
}

/**
 * Get cookie preferences
 */
export function getPreferences(): CookiePreferences | null {
    if (typeof window === 'undefined') return null;

    const stored = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (!stored) return null;

    try {
        return JSON.parse(stored);
    } catch {
        return null;
    }
}

/**
 * Set cookie preferences
 */
export function setPreferences(preferences: CookiePreferences): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences));
}

/**
 * Clear all consent data
 */
export function clearConsent(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    localStorage.removeItem(COOKIE_PREFERENCES_KEY);
}

/**
 * Set a cookie with expiry
 */
export function setCookie(name: string, value: string, days: number = 365): void {
    if (typeof document === 'undefined') return;

    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure`;
}

/**
 * Get a cookie value
 */
export function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;

    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }

    return null;
}

/**
 * Delete a cookie
 */
export function deleteCookie(name: string): void {
    if (typeof document === 'undefined') return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

/**
 * Track a simple event (only if analytics consent given)
 */
export function trackEvent(eventName: string, data?: Record<string, unknown>): void {
    const preferences = getPreferences();
    if (!preferences?.analytics) return;

    // Log for debugging (replace with actual analytics in production)
    console.log('[Analytics]', eventName, data);
}

/**
 * Generate a unique visitor ID
 */
export function getVisitorId(): string {
    if (typeof window === 'undefined') return '';

    let visitorId = localStorage.getItem('plannrai_visitor_id');

    if (!visitorId) {
        visitorId = 'v_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('plannrai_visitor_id', visitorId);
    }

    return visitorId;
}
