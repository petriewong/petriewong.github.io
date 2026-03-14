// i18n Definitions
window.translations = window.translations || {};
const translations = window.translations;;

let currentLang = 'en';

function setLanguage(lang) {
    if (translations[lang]) {
        currentLang = lang;
        document.documentElement.lang = lang;
        
        // Save to cookie (Expires in 1 year)
        document.cookie = `tarotBridgeLang=${lang}; max-age=31536000; path=/`;
        
        // Update DOM elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (key === 'draw_btn') return; // Handled dynamically
            if (translations[lang][key]) {
                if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
                    if (el.placeholder) el.placeholder = translations[lang][key];
                    if (el.value && el.type === 'button') el.value = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });
        
        // Update specific text contents that are not purely static
        if (typeof updateDynamicLanguage === 'function') {
             updateDynamicLanguage();
        }
        if (typeof updateDrawButtonText === 'function') {
             updateDrawButtonText();
        }
    }
}

function getSavedLanguage() {
    const match = document.cookie.match(new RegExp('(^| )tarotBridgeLang=([^;]+)'));
    if (match) return match[2];
    
    // Check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('zh-TW') || browserLang.startsWith('zh-HK')) return 'zh-TW';
    if (browserLang.startsWith('zh')) return 'zh-CN';
    if (browserLang.startsWith('ja')) return 'ja';
    if (browserLang.startsWith('ko')) return 'ko';
    
    return 'en';
}

// Global translator helper
function t(key) {
    return translations[currentLang][key] || key;
}

// Template replacement
function t_replace(key, params = {}) {
    let str = t(key);
    for (const [k, v] of Object.entries(params)) {
        str = str.replace(`{${k}}`, v);
    }
    return str;
}
