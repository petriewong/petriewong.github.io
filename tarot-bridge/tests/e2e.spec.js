const { test, expect } = require('@playwright/test');

test.describe('Tarot Bridge E2E', () => {
    test.beforeEach(async ({ page }) => {
        page.on('console', msg => console.log(`BROWSER CONSOLE: ${msg.text()}`));
        page.on('pageerror', exception => console.log(`BROWSER ERROR: ${exception}`));

        await page.goto('/');
        
        // Ensure no initial cards are shown
        const displayStyle = await page.locator('.tarot-card').first().evaluate(el => el.style.display);
        expect(displayStyle).not.toBe('block');
    });

    test('3-Card Draw generates correct prompt including Past/Present/Future', async ({ page }) => {
        // Input question
        await page.fill('#user-question', 'What does the future hold?');
        
        // Assert method is 3-card draw by default
        await expect(page.locator('#method-select')).toHaveValue('3card');

        // Click Draw Cards
        await page.click('#draw-btn');
        
        await page.screenshot({ path: 'debug-screenshot-3card.png' });

        // Validate 3 cards are displayed
        const visibleCards = page.locator('.tarot-card:visible');
        await expect(visibleCards).toHaveCount(3);

        // Check if prompt was generated
        const promptText = await page.locator('#generated-prompt').innerText();
        expect(promptText).toContain('What does the future hold?');
        expect(promptText).toContain('3-Card Draw (Past/Present/Future)');
        expect(promptText).toContain('Past: ');
        expect(promptText).toContain('Present: ');
        expect(promptText).toContain('Future: ');
    });

    test('Single Card Draw generates correct prompt', async ({ page }) => {
        // Input question
        await page.fill('#user-question', 'Should I accept this job?');
        
        // Change Method
        await page.selectOption('#method-select', 'single');

        // Click Draw Cards
        await page.click('#draw-btn');

        // Validate only 1 card is displayed
        const visibleCards = page.locator('.tarot-card:visible');
        await expect(visibleCards).toHaveCount(1);

        // Check the Prompt
        const promptText = await page.locator('#generated-prompt').innerText();
        expect(promptText).toContain('Should I accept this job?');
        expect(promptText).toContain('Single Card (Card of the Day)');
        
        // It should NOT contain role prefixes
        expect(promptText).not.toContain('Past: ');
        expect(promptText).not.toContain('Present: ');
        expect(promptText).not.toContain('Future: ');
    });

    test('Language switching updates prompt appropriately', async ({ page }) => {
        // Switch to Traditional Chinese
        await page.selectOption('#lang-switch', 'zh-TW');

        // Input question and draw
        await page.fill('#user-question', '這週運勢如何？');
        await page.click('#draw-btn');

        // Validate the output is in traditional Chinese
        const promptText = await page.locator('#generated-prompt').innerText();
        expect(promptText).toContain('這週運勢如何？');
        expect(promptText).toContain('使用 三張牌陣 (過去/現在/未來)');
        expect(promptText).toContain('我問了塔羅牌：「');
        expect(promptText).toContain('過去: ');
    });

    test('Spiritual Spread generates 9 cards and correct prompt', async ({ page }) => {
        // Input question
        await page.fill('#user-question', 'Who am I truly?');
        
        // Select Spiritual Spread
        await page.selectOption('#method-select', 'spiritual');

        // Click Draw Cards
        await page.click('#draw-btn');
        
        // Validate 9 cards are displayed
        const visibleCards = page.locator('.tarot-card:visible');
        await expect(visibleCards).toHaveCount(9);

        // Check Grid Layout binding
        await expect(page.locator('.draw-grid')).toHaveAttribute('data-method', 'spiritual');

        // Check if prompt was generated
        const promptText = await page.locator('#generated-prompt').innerText();
        expect(promptText).toContain('Who am I truly?');
        expect(promptText).toContain('Spiritual Spread');
        expect(promptText).toContain('Personality/Nature: ');
        expect(promptText).toContain('Destiny: ');
    });

    test('Celtic Cross Spread generates 10 cards and correct prompt', async ({ page }) => {
        // Input question
        await page.fill('#user-question', 'How will my project go?');
        
        // Select Celtic Cross Spread
        await page.selectOption('#method-select', 'celtic');

        // Click Draw Cards
        await page.click('#draw-btn');
        
        // Validate 10 cards are displayed
        const visibleCards = page.locator('.tarot-card:visible');
        await expect(visibleCards).toHaveCount(10);

        // Check Grid Layout binding
        await expect(page.locator('.draw-grid')).toHaveAttribute('data-method', 'celtic');

        // Verify the 2nd card (Obstacles) has the rotation animation associated with it via CSS
        // Playwright handles CSS differently, but we can check if it's the second child
        const obstaclesCard = page.locator('.draw-grid[data-method="celtic"] .tarot-card:nth-child(2)');
        await expect(obstaclesCard).toBeVisible();

        // Check if prompt was generated
        const promptText = await page.locator('#generated-prompt').innerText();
        expect(promptText).toContain('How will my project go?');
        expect(promptText).toContain('Celtic Cross');
        expect(promptText).toContain('Present: ');
        expect(promptText).toContain('Outcome: ');
    });
});
