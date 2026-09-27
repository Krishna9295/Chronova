// ==========================================================================
// CHRONOVA GLOBAL THEME MANAGER
// Synchronizes Dark & Light mode persistently across every Chronova page
// ==========================================================================

(function () {
    'use strict';

    /**
     * Reads saved theme or defaults to 'dark'
     */
    function getSavedTheme() {
        try {
            return localStorage.getItem('chronova_theme') || 'dark';
        } catch (e) {
            return 'dark';
        }
    }

    /**
     * Applies the theme to <html> tag immediately
     */
    function applyTheme(theme) {
        if (theme !== 'dark' && theme !== 'light') theme = 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        window.currentChronovaTheme = theme;

        // If on Account page, update the theme toggle cards if they exist
        const darkCard = document.getElementById('themeCardDark');
        const lightCard = document.getElementById('themeCardLight');
        if (darkCard && lightCard) {
            darkCard.classList.toggle('active', theme === 'dark');
            lightCard.classList.toggle('active', theme === 'light');
        }

        // Dispatch a custom event in case interactive components want to update canvas/graphs
        window.dispatchEvent(new CustomEvent('chronova-theme-changed', { detail: { theme: theme } }));
    }

    /**
     * Public setter for theme switching
     */
    window.setChronovaTheme = function (theme) {
        try {
            localStorage.setItem('chronova_theme', theme);
        } catch (e) {}
        applyTheme(theme);
    };

    // Execute immediately to prevent flash of wrong theme
    applyTheme(getSavedTheme());

    // Listen for storage events in case theme is changed in another tab
    window.addEventListener('storage', function (e) {
        if (e.key === 'chronova_theme' && e.newValue) {
            applyTheme(e.newValue);
        }
    });

    // Re-verify after DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            applyTheme(getSavedTheme());
        });
    } else {
        applyTheme(getSavedTheme());
    }
})();
