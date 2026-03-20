window.Decks = window.Decks || {};

let lenormandCards = [];
for (let i = 1; i <= 36; i++) {
    lenormandCards.push({
        id: `lenormand-${i}`,
        nameKey: `lenormand_${i}`,
        type: 'lenormand',
        icon: '📜',
        image: `images/traditional/lenormand/${String(i).padStart(2, '0')}.jpg`
    });
}

window.Decks['lenormand'] = {
    id: 'lenormand',
    nameKey: 'deck_lenormand',
    rules: {
        canReverse: false
    },
    cards: lenormandCards
};
