class TarotEngine {
    constructor(decksConfig, spreadsConfig) {
        this.decks = decksConfig || {};
        this.spreads = spreadsConfig || {};
    }

    _shuffle(array) {
        // Create a copy to prevent mutating the original configuration
        let copy = [...array];
        let currentIndex = copy.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [copy[currentIndex], copy[randomIndex]] = [copy[randomIndex], copy[currentIndex]];
        }
        return copy;
    }

    draw(spreadId, question = "") {
        const spread = this.spreads[spreadId];
        if (!spread) throw new Error("Spread not found: " + spreadId);
        
        let pools = {};
        
        // Prepare shuffled pools dynamically based on registered decks
        for (let deckId in this.decks) {
            pools[deckId] = {
                cards: this._shuffle(this.decks[deckId].cards),
                index: 0,
                rules: this.decks[deckId].rules || {}
            };
        }

        const resultCards = spread.slots.map(slot => {
            const poolKey = slot.pool || 'tarot';
            const currentPool = pools[poolKey];

            if (!currentPool) {
                // strict fallback or error
                throw new Error("Deck configuration missing for required pool: " + poolKey);
            }

            const selectedCard = currentPool.cards[currentPool.index++];
            
            // Check rules for reversal
            let isReversed = false;
            if (currentPool.rules.canReverse) {
                const chance = typeof currentPool.rules.reverseChance === 'number' ? currentPool.rules.reverseChance : 0.5;
                isReversed = Math.random() < chance;
            }
            
            return {
                ...selectedCard,
                isReversed: isReversed,
                roleKey: slot.roleKey
            };
        });

        return {
            id: Date.now().toString(),
            question: question,
            spreadId: spreadId,
            spreadNameKey: spread.nameKey,
            cards: resultCards
        };
    }
}
