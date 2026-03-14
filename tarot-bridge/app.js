// Version: 1.1.7
// --- Deck Data ---
const suits = [
    { name: 'Wands', icon: '🔥' },
    { name: 'Cups', icon: '💧' },
    { name: 'Swords', icon: '🗡️' },
    { name: 'Pentacles', icon: '🪙' }
];

const ranks = [
    'Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Page', 'Knight', 'Queen', 'King'
];

const majorArcanaNames = [
    'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
    'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
    'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
    'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World'
];

let tarotDeck = [];

function initDeck() {
    tarotDeck = [];
    // Major Arcana
    majorArcanaNames.forEach((name, index) => {
        tarotDeck.push({
            id: `major-${index}`,
            nameKey: `major_${index}`, // Store translation key
            type: 'major',
            icon: '✨',
            image: `images/traditional/m${String(index).padStart(2, '0')}.jpg`
        });
    });

    // Minor Arcana
    suits.forEach(suit => {
        ranks.forEach((rank, i) => {
            const suitChar = suit.name.charAt(0).toLowerCase();
            const imgNum = String(i + 1).padStart(2, '0');
            tarotDeck.push({
                id: `minor-${suit.name.toLowerCase()}-${i}`,
                rankKey: `rank_${rank.toLowerCase()}`,
                suitKey: `suit_${suit.name.toLowerCase()}`,
                type: 'minor',
                icon: suit.icon,
                image: `images/traditional/${suitChar}${imgNum}.jpg`
            });
        });
    });
}

// --- State ---
let currentDraw = [];
let currentStyle = 'traditional';

// --- DOM Elements ---
const drawBtn = document.getElementById('draw-btn');
const methodSelect = document.getElementById('method-select');
const styleSwitch = document.getElementById('style-switch');
const drawSection = document.getElementById('draw-section');
const userQuestionEl = document.getElementById('user-question');

const cardElements = document.querySelectorAll('.tarot-card');

// --- New Features Elements ---
const tabReading = document.getElementById('tab-reading');
const tabGallery = document.getElementById('tab-gallery');
const viewReading = document.getElementById('view-reading');
const viewGallery = document.getElementById('view-gallery');
const galleryGrid = document.getElementById('gallery-grid');

const cardModal = document.getElementById('card-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.querySelector('.modal-close');

let generatedPromptText = '';
const promptSection = document.getElementById('prompt-section');
const promptDisplay = document.getElementById('generated-prompt');
const copyBtn = document.getElementById('copy-btn');
const openGeminiBtn = document.getElementById('open-gemini-btn');
const copySuccess = document.getElementById('copy-success');
const langSwitch = document.getElementById('lang-switch');

// --- Helper to get translated card name ---
function getTranslatedCardName(card) {
    if (card.type === 'major') {
        return t(card.nameKey);
    } else {
        return t_replace('minor_format', { rank: t(card.rankKey), suit: t(card.suitKey) });
    }
}

// --- Core Mechanics ---
function drawCards() {
    // Check if question is provided
    const question = userQuestionEl.value.trim();
    if (!question) {
        alert(t('alert_no_question'));
        return;
    }

    const method = methodSelect.value;
    let drawCount = 3;
    if (method === 'single') drawCount = 1;
    else if (method === 'spiritual') drawCount = 9;
    else if (method === 'celtic') drawCount = 10;
    else if (method === 'self_awareness') drawCount = 3;
    else if (method === 'linear5') drawCount = 5;
    else if (method === 'cross5') drawCount = 5;
    else if (method === 'decision') drawCount = 5;
    else if (method === 'fullmoon') drawCount = 5;
    else if (method === 'newmoon') drawCount = 5;
    else if (method === 'manifestation') drawCount = 4;
    else if (method === 'path') drawCount = 4;
    else if (method === 'feelings') drawCount = 6;
    else if (method === 'pyramids') drawCount = 6;
    else if (method === 'horseshoe') drawCount = 7;
    else if (method === 'relationship') drawCount = 7;
    else if (method === 'akashic') drawCount = 7;
    else if (method === 'chakra') drawCount = 7;
    else if (method === 'checkin') drawCount = 8;
    else if (method === 'futureself') drawCount = 9;
    else if (method === 'astrological') drawCount = 12;

    // Shuffle and pick unique cards
    const shuffled = [...tarotDeck].sort(() => 0.5 - Math.random());
    currentDraw = shuffled.slice(0, drawCount).map(card => ({
        ...card,
        isReversed: Math.random() < 0.5 // 50/50 chance
    }));
    
    // Update DOM visually
    displayCards(currentDraw);
    
    // Show section
    drawSection.classList.remove('hidden');

    // Trigger Bridge Feature
    if (typeof generatePrompt === 'function') {
        generatePrompt(question, currentDraw);
    }
}

function getRoleKey(method, index) {
    if (method === '3card') {
        if (index === 0) return 'role_past';
        if (index === 1) return 'role_present';
        if (index === 2) return 'role_future';
    } else if (method === 'spiritual') {
        return `role_spiritual_${index + 1}`;
    } else if (method === 'celtic') {
        return `role_celtic_${index + 1}`;
    } else if (method === 'self_awareness') {
        return `role_self_${index + 1}`;
    } else if (method === 'linear5') {
        return `role_lin5_${index + 1}`;
    } else if (method === 'cross5') {
        return `role_cross5_${index + 1}`;
    } else if (method === 'decision') {
        return `role_dec_${index + 1}`;
    } else if (method === 'fullmoon') {
        return `role_fm_${index + 1}`;
    } else if (method === 'newmoon') {
        return `role_nm_${index + 1}`;
    } else if (method === 'manifestation') {
        return `role_mani_${index + 1}`;
    } else if (method === 'path') {
        return `role_path_${index + 1}`;
    } else if (method === 'feelings') {
        return `role_feel_${index + 1}`;
    } else if (method === 'pyramids') {
        return `role_pyr_${index + 1}`;
    } else if (method === 'horseshoe') {
        return `role_horse_${index + 1}`;
    } else if (method === 'relationship') {
        return `role_rel_${index + 1}`;
    } else if (method === 'akashic') {
        return `role_aka_${index + 1}`;
    } else if (method === 'chakra') {
        return `role_cha_${index + 1}`;
    } else if (method === 'checkin') {
        return `role_chk_${index + 1}`;
    } else if (method === 'futureself') {
        return `role_future_${index + 1}`;
    } else if (method === 'astrological') {
        return `role_astro_${index + 1}`;
    }
    return null;
}

function displayCards(cards) {
    const method = methodSelect.value;
    cardElements.forEach((el, index) => {
        if (index < cards.length) {
            const card = cards[index];
            el.style.display = 'block';
            
            const roleEl = el.querySelector('.card-role');
            if (roleEl) {
                const roleKey = getRoleKey(method, index);
                if (roleKey) {
                    roleEl.textContent = t(roleKey);
                    roleEl.style.display = 'block';
                } else {
                    roleEl.style.display = 'none';
                }
            }

            el.querySelector('.card-suitIcon').textContent = card.icon;
            
            const imgEl = el.querySelector('.card-image');
            
            // Determine image path based on style
            let imagePath = card.image; // default is 'images/traditional/...'
            if (currentStyle === 'anime') {
                imagePath = card.image.replace('images/traditional/', 'images/anime/');
            }
            imgEl.src = imagePath;
            
            // Fallback handling
            imgEl.onerror = function() {
                // If loading anime failed, fallback to traditional
                if (this.src !== card.image) {
                    this.src = card.image;
                }
                // clear the handler to prevent infinite loops
                this.onerror = null; 
            };
            
            const translatedName = getTranslatedCardName(card);
            imgEl.alt = translatedName;
            imgEl.style.display = 'block';
            imgEl.style.transform = card.isReversed ? 'rotate(180deg)' : 'none';

            const nameStr = card.isReversed ? `${translatedName} ${t('reversed_suffix')}` : `${translatedName} ${t('upright_suffix')}`;
            el.querySelector('.card-name').textContent = nameStr;
            
            if (card.isReversed) {
                el.classList.add('reversed');
            } else {
                el.classList.remove('reversed');
            }
            
            // Remove old animation class, force reflow, and add again to re-trigger animation
            el.classList.remove('tarot-card-animating');
            void el.offsetWidth; 
            el.classList.add('tarot-card-animating');
        } else {
            // Hide unused card slots
            el.style.display = 'none';
        }
    });

    // Set grid layout attributes based on selected method
    const drawGrid = document.querySelector('.draw-grid');
    drawGrid.dataset.method = method;
    if (cards.length === 1) {
        drawGrid.classList.add('single-card-grid');
    } else {
        drawGrid.classList.remove('single-card-grid');
    }
}

// Ensure the CSS animation triggers correctly by toggling
drawBtn.addEventListener('click', drawCards);

// --- Bridge Feature (Prompt Generation) ---
function generatePrompt(question, cards) {
    if (cards.length === 0) return;
    
    const getCardNameWithOrientation = (card) => {
        const name = getTranslatedCardName(card);
        return card.isReversed ? `${name} ${t('reversed_suffix')}` : `${name} ${t('upright_suffix')}`;
    };
    
    let cardStr = '';
    let promptTemplate = 'prompt_template';
    const method = methodSelect.value;

    if (method === 'single') {
        cardStr = getCardNameWithOrientation(cards[0]);
        promptTemplate = 'prompt_template_1card';
    } else {
        const cardStrings = cards.map((card, index) => {
            const roleKey = getRoleKey(method, index);
            if (roleKey) {
                return `${t(roleKey)}: ${getCardNameWithOrientation(card)}`;
            }
            return getCardNameWithOrientation(card); // fallback
        });
        cardStr = cardStrings.join(', ');
    }

    let methodTranslated = t(`method_${method}`);
    if (!methodTranslated || methodTranslated === `method_${method}`) {
        // Fallback for missing top level translation logic if any
        if (method === 'single') methodTranslated = t('method_1card');
        else if (method === '3card') methodTranslated = t('method_3card');
    }
    generatedPromptText = t_replace(promptTemplate, { question: question, cards: cardStr, method: methodTranslated });
    
    promptDisplay.textContent = generatedPromptText;
    promptSection.classList.remove('hidden');
    
    if (typeof saveReading === 'function') {
        saveReading(question, cards);
    }
}

// Copy to Clipboard
copyBtn.addEventListener('click', async () => {
    if (!generatedPromptText) return;
    
    try {
        await navigator.clipboard.writeText(generatedPromptText);
        
        copySuccess.classList.remove('hidden');
        setTimeout(() => {
            copySuccess.classList.add('hidden');
        }, 2000);
    } catch (err) {
        console.error('Failed to copy prompt: ', err);
        alert(t('copy_fail'));
    }
});

// Copy and Open Gemini App
openGeminiBtn.addEventListener('click', async () => {
    if (!generatedPromptText) return;
    
    try {
        // 1. Copy to clipboard
        await navigator.clipboard.writeText(generatedPromptText);
        
        // Show success indicator visually
        copySuccess.classList.remove('hidden');
        setTimeout(() => {
            copySuccess.classList.add('hidden');
        }, 2000);
        
        // 2. Try to open the Gemini iOS App
        // This scheme works on iOS if the Google Gemini app is installed
        window.location.href = 'googlegemini://';
        
    } catch (err) {
        console.error('Failed to copy or open Gemini: ', err);
        alert(t('copy_fail'));
    }
});

// --- Journal & Storage (local-journal) ---
const STORAGE_KEY = 'tarotBridgeReadings';

// Storage Wrapper
function getReadings() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        // Fallback to cookie check if not found
        if (!data) {
            const match = document.cookie.match(new RegExp('(^| )' + STORAGE_KEY + '=([^;]+)'));
            return match ? JSON.parse(decodeURIComponent(match[2])) : [];
        }
        return JSON.parse(data);
    } catch (e) {
        console.warn('Could not parse history', e);
        return [];
    }
}

function setReadings(readings) {
    try {
        const payload = JSON.stringify(readings);
        try {
            localStorage.setItem(STORAGE_KEY, payload);
        } catch (e) {
            // LocalStorage failed (e.g., quota exceeded or privacy mode) - fallback to cookie
            // Warning: Cookies have ~4KB limit
            document.cookie = `${STORAGE_KEY}=${encodeURIComponent(payload)}; max-age=31536000; path=/`;
        }
    } catch (e) {
        console.error('Could not save history', e);
    }
}

function saveReading(question, cards) {
    const newEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        question: question,
        method: methodSelect.value,
        cards: cards.map(c => ({
            id: c.id,
            type: c.type,
            nameKey: c.nameKey,
            rankKey: c.rankKey,
            suitKey: c.suitKey,
            isReversed: c.isReversed
        })) // save structure instead of string to support later translation changes
    };
    
    const readings = getReadings();
    readings.unshift(newEntry); // add to top
    setReadings(readings);
    
    // Update UI
    renderJournal();
}

// UI Rendering
const journalListEl = document.getElementById('journal-list');
const clearBtn = document.getElementById('clear-btn');

function renderJournal() {
    const readings = getReadings();
    
    if (readings.length === 0) {
        journalListEl.innerHTML = `<p class="subtitle">${t('no_readings')}</p>`;
        return;
    }
    
    journalListEl.innerHTML = readings.map(r => {
        const dateStr = new Date(r.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
        
        // handle both old string format and new object format for backward compatibility
        const cardStrings = r.cards.map(c => {
            if (typeof c === 'string') return c; 
            const name = getTranslatedCardName(c);
            return c.isReversed ? `${name} ${t('reversed_suffix')}` : `${name} ${t('upright_suffix')}`;
        });

        return `
            <div class="journal-entry">
                <div class="entry-header">
                    <span>Reading</span>
                    <span>${dateStr}</span>
                </div>
                <div class="entry-question">Q: "${r.question}"</div>
                <div class="entry-cards">Cards: ${cardStrings.join(', ')}</div>
                <div class="entry-actions" style="margin-top: 10px; display: flex; gap: 8px;">
                    <button class="btn secondary-btn restore-btn" data-id="${r.id}">Restore to view</button>
                    <button class="btn outline-btn delete-btn" data-id="${r.id}">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

clearBtn.addEventListener('click', () => {
    if(confirm(t('clear_confirm'))) {
        localStorage.removeItem(STORAGE_KEY);
        document.cookie = `${STORAGE_KEY}=; max-age=0; path=/`;
        renderJournal();
    }
});

// Journal Reading Actions
journalListEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        deleteReading(id);
    } else if (e.target.classList.contains('restore-btn')) {
        const id = e.target.getAttribute('data-id');
        restoreReading(id);
    }
});

function deleteReading(id) {
    if (!confirm('Are you sure you want to delete this reading?')) return;
    let readings = getReadings();
    readings = readings.filter(r => r.id !== id);
    setReadings(readings);
    renderJournal();
}

function restoreReading(id) {
    const readings = getReadings();
    const reading = readings.find(r => r.id === id);
    if (!reading) return;

    let method = reading.method;
    if (!method) {
        const len = reading.cards.length;
        if (len === 1) method = 'single';
        else if (len === 3) method = '3card';
        else if (len === 4) method = 'path';
        else if (len === 5) method = 'decision';
        else if (len === 6) method = 'feelings';
        else if (len === 7) method = 'horseshoe';
        else if (len === 8) method = 'checkin';
        else if (len === 9) method = 'spiritual';
        else if (len === 10) method = 'celtic';
        else if (len === 12) method = 'astrological';
        else method = '3card';
    }

    // Set form fields
    document.getElementById('user-question').value = reading.question;
    methodSelect.value = method;
    methodSelect.dispatchEvent(new Event('change')); // Update details and UI buttons

    // Map saved data to deck actuals using robust logic
    currentDraw = reading.cards.map(c => {
        let match = tarotDeck.find(td => td.id === c.id);
        if(!match && typeof c === 'string') {
            // Very old string-only fallback logic
            match = tarotDeck.find(td => getTranslatedCardName(td) === c.replace(' (U)', '').replace(' (R)', ''));
            return { ...(match || tarotDeck[0]), isReversed: c.includes('(R)') };
        }
        return {
            ...(match || tarotDeck[0]), // Safe fallback
            isReversed: c.isReversed
        };
    });

    displayCards(currentDraw);
    document.getElementById('draw-section').classList.remove('hidden');
    
    // Smooth scroll and tab switch
    const readingTabBtn = document.querySelector('.tab-btn[data-target="view-reading"]');
    if (readingTabBtn) readingTabBtn.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (typeof generatePrompt === 'function') {
        generatePrompt(reading.question, currentDraw);
    }
}

// Initialize Journal
renderJournal();

// --- Export/Import Flow ---
const exportBtn = document.getElementById('export-btn');
const importInput = document.getElementById('import-file');

exportBtn.addEventListener('click', () => {
    const readings = getReadings();
    if (readings.length === 0) {
        alert(t('no_history_export'));
        return;
    }
    
    const jsonStr = JSON.stringify(readings, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `tarot-bridge-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 0);
});

importInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (ev) => {
        try {
            const importedData = JSON.parse(ev.target.result);
            if (!Array.isArray(importedData)) {
                throw new Error("Invalid format");
            }
            
            // Merge with current readings, filtering out duplicates by ID
            let currentReadings = getReadings();
            const existingIds = new Set(currentReadings.map(r => r.id));
            
            const newReadings = importedData.filter(r => r.id && !existingIds.has(r.id));
            
            const combined = [...newReadings, ...currentReadings];
            
            // Sort by date descending
            combined.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            setReadings(combined);
            renderJournal();
            
            alert(t_replace('import_success', { count: newReadings.length }));
        } catch (err) {
            console.error(err);
            alert(t('import_error'));
        }
    };
    reader.readAsText(file);
    
    // Reset file input
    importInput.value = '';
});

// --- i18n Integration Hook ---
function updateDynamicLanguage() {
    if (currentDraw.length > 0) {
        displayCards(currentDraw);
        generatePrompt(userQuestionEl.value.trim(), currentDraw);
    }
    renderJournal();
    updateMethodDetails();
    if (viewGallery && viewGallery.classList.contains('active')) {
        renderGallery();
    }
}

langSwitch.addEventListener('change', (e) => {
    setLanguage(e.target.value);
});

styleSwitch.addEventListener('change', (e) => {
    currentStyle = e.target.value;
    try {
        localStorage.setItem('tarotBridgeStyle', currentStyle);
    } catch (err) {}
    if (currentDraw.length > 0) {
        displayCards(currentDraw);
    }
    if (viewGallery && viewGallery.classList.contains('active')) {
        renderGallery();
    }
});

// Initialize on Load
function initApp() {
    initDeck();
    
    // Tab event listeners
    if (tabReading && tabGallery) {
        tabReading.addEventListener('click', () => switchTab('reading'));
        tabGallery.addEventListener('click', () => switchTab('gallery'));
    }
    
    // Modal event listeners (delegated on document for cards)
    document.addEventListener('click', (e) => {
        const cardEl = e.target.closest('.tarot-card');
        if (cardEl) {
            const img = cardEl.querySelector('.card-image');
            const imgSrc = img ? img.getAttribute('src') : null;
            if (imgSrc && img.style.display !== 'none') {
                const parentTransform = window.getComputedStyle(cardEl).transform;
                const imgTransform = window.getComputedStyle(img).transform;
                
                let combinedTransform = '';
                if (parentTransform && parentTransform !== 'none') combinedTransform += parentTransform + ' ';
                if (imgTransform && imgTransform !== 'none') combinedTransform += imgTransform;
                
                openModal(imgSrc, combinedTransform.trim());
            }
        }
    });
    
    if (modalClose && cardModal) {
        modalClose.addEventListener('click', closeModal);
        cardModal.addEventListener('click', (e) => {
            if (e.target === cardModal) {
                closeModal();
            }
        });
    }
    
    const loadedLang = getSavedLanguage();
    langSwitch.value = loadedLang;
    setLanguage(loadedLang);
    
    // Load saved style
    try {
        const savedStyle = localStorage.getItem('tarotBridgeStyle');
        if (savedStyle === 'traditional' || savedStyle === 'anime') {
            currentStyle = savedStyle;
            styleSwitch.value = currentStyle;
        }
    } catch (err) {}
    
    updateDrawButtonText();
    updateMethodDetails();
}

function updateMethodDetails() {
    const method = methodSelect.value;
    const descEl = document.getElementById('method-desc');
    const tagsEl = document.getElementById('method-tags');
    
    // Translations keys based on method selected
    const descKey = `desc_${method}`;
    const tagsKey = `tags_${method}`;
    
    // Apply Description
    descEl.textContent = t(descKey);
    
    // Apply Tags
    tagsEl.innerHTML = ''; // clear
    const tagsStr = t(tagsKey);
    if(tagsStr) {
        const tagsArray = tagsStr.split(',').map(tag => tag.trim());
        tagsArray.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'method-tag';
            span.textContent = tag;
            tagsEl.appendChild(span);
        });
    }
}

methodSelect.addEventListener('change', () => {
    updateDrawButtonText();
    updateMethodDetails();
});

function updateDrawButtonText() {
    const method = methodSelect.value;
    if (method === 'single') {
        drawBtn.textContent = t('draw_btn_1');
    } else if (method === 'manifestation' || method === 'path') {
        drawBtn.textContent = t('draw_btn_4') || 'Draw 4 Cards';
    } else if (method === 'decision' || method === 'linear5' || method === 'cross5' || method === 'fullmoon' || method === 'newmoon') {
        drawBtn.textContent = t('draw_btn_5');
    } else if (method === 'feelings' || method === 'pyramids') {
        drawBtn.textContent = t('draw_btn_6') || 'Draw 6 Cards';
    } else if (method === 'horseshoe' || method === 'relationship' || method === 'chakra' || method === 'akashic') {
        drawBtn.textContent = t('draw_btn_7');
    } else if (method === 'checkin') {
        drawBtn.textContent = t('draw_btn_8') || 'Draw 8 Cards';
    } else if (method === 'spiritual' || method === 'futureself') {
        drawBtn.textContent = t('draw_btn_9');
    } else if (method === 'celtic') {
        drawBtn.textContent = t('draw_btn_10');
    } else if (method === 'astrological') {
        drawBtn.textContent = t('draw_btn_12') || 'Draw 12 Cards';
    } else {
        drawBtn.textContent = t('draw_btn_3');
    }
}

// --- Tabs & Gallery Logic ---
function switchTab(tabId) {
    if (tabId === 'reading') {
        tabReading.classList.add('active');
        tabGallery.classList.remove('active');
        viewReading.classList.add('active');
        viewGallery.classList.remove('active');
    } else if (tabId === 'gallery') {
        tabGallery.classList.add('active');
        tabReading.classList.remove('active');
        viewGallery.classList.add('active');
        viewReading.classList.remove('active');
        renderGallery();
    }
}

function renderGallery() {
    galleryGrid.innerHTML = ''; // clear
    
    const getCatTitle = (key, fallback) => {
        const val = t(key);
        return val === key ? fallback : val;
    };
    
    // Group cards by category
    const categories = {
        'major': { title: getCatTitle('cat_major', 'Major Arcana'), cards: [] },
        'wands': { title: getCatTitle('cat_wands', 'Suit of Wands'), cards: [] },
        'cups': { title: getCatTitle('cat_cups', 'Suit of Cups'), cards: [] },
        'swords': { title: getCatTitle('cat_swords', 'Suit of Swords'), cards: [] },
        'pentacles': { title: getCatTitle('cat_pentacles', 'Suit of Pentacles'), cards: [] }
    };
    
    tarotDeck.forEach(card => {
        if (card.id.startsWith('major')) categories.major.cards.push(card);
        else if (card.id.startsWith('minor-wands')) categories.wands.cards.push(card);
        else if (card.id.startsWith('minor-cups')) categories.cups.cards.push(card);
        else if (card.id.startsWith('minor-swords')) categories.swords.cards.push(card);
        else if (card.id.startsWith('minor-pentacles')) categories.pentacles.cards.push(card);
    });
    
    Object.values(categories).forEach(cat => {
        if (cat.cards.length === 0) return;
        
        const sectionEl = document.createElement('div');
        sectionEl.className = 'gallery-category';
        
        const titleEl = document.createElement('h3');
        titleEl.textContent = cat.title;
        titleEl.className = 'gallery-category-title';
        sectionEl.appendChild(titleEl);
        
        const gridEl = document.createElement('div');
        gridEl.className = 'gallery-grid-inner';
        
        cat.cards.forEach(card => {
            const el = document.createElement('div');
            el.className = 'tarot-card';
            // Add animation class explicitly so they fade in
            el.classList.add('tarot-card-animating');
            el.style.display = 'flex'; // Ensure block display context
            
            const img = document.createElement('img');
            img.className = 'card-image';
            
            let imagePath = card.image;
            if (currentStyle === 'anime') {
                imagePath = card.image.replace('images/traditional/', 'images/anime/');
            }
            img.src = imagePath;
            
            img.onerror = function() {
                if (this.src !== card.image) {
                    this.src = card.image;
                }
                this.onerror = null; 
            };
            
            const translatedName = getTranslatedCardName(card);
            img.alt = translatedName;
            
            const nameContainer = document.createElement('div');
            nameContainer.className = 'card-name-container';
            
            const nameSpan = document.createElement('span');
            nameSpan.className = 'card-name';
            nameSpan.textContent = translatedName;
            
            nameContainer.appendChild(nameSpan);
            el.appendChild(img);
            el.appendChild(nameContainer);
            
            gridEl.appendChild(el);
        });
        
        sectionEl.appendChild(gridEl);
        galleryGrid.appendChild(sectionEl);
    });
}

function openModal(imgSrc, transformStr = '') {
    modalImage.src = imgSrc;
    modalImage.style.transform = transformStr;
    cardModal.classList.remove('hidden');
}

function closeModal() {
    cardModal.classList.add('hidden');
    // small delay before clearing src so that fade out looks okay
    setTimeout(() => { modalImage.src = ''; }, 300);
}

document.addEventListener('DOMContentLoaded', initApp);
