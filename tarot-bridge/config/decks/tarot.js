window.Decks = window.Decks || {};

const suits = [
    { name: 'Wands', icon: '🔥', suitKey: 'suit_wands' },
    { name: 'Cups', icon: '💧', suitKey: 'suit_cups' },
    { name: 'Swords', icon: '🗡️', suitKey: 'suit_swords' },
    { name: 'Pentacles', icon: '🪙', suitKey: 'suit_pentacles' }
];

const ranks = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King'];
const majorArcanaNames = ['The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor', 'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit', 'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance', 'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World'];

let tarotCards = [];

majorArcanaNames.forEach((name, index) => {
    tarotCards.push({
        id: `major-${index}`,
        nameKey: `major_${index}`,
        type: 'major',
        icon: '✨',
        image: `images/traditional/tarot/m${String(index).padStart(2, '0')}.jpg`
    });
});

suits.forEach(suit => {
    ranks.forEach((rank, i) => {
        const suitChar = suit.name.charAt(0).toLowerCase();
        const imgNum = String(i + 1).padStart(2, '0');
        const id = `minor-${suit.name.toLowerCase()}-${i}`;
        tarotCards.push({
            id,
            type: 'minor',
            nameKey: id,
            rankKey: `rank_${rank.toLowerCase()}`,
            suitKey: suit.suitKey,
            icon: suit.icon,
            image: `images/traditional/tarot/${suitChar}${imgNum}.jpg`
        });
    });
});

window.Decks['tarot'] = {
    id: 'tarot',
    nameKey: 'deck_tarot',
    rules: {
        canReverse: true,
        reverseChance: 0.5
    },
    cards: tarotCards
};
