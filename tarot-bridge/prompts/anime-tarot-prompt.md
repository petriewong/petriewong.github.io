# Anime Tarot Card Generation Prompt

To ensure visual consistency and correct content across all newly generated anime-style tarot cards, use the following strict prompt template and ALWAYS provide TWO `ImagePaths` references to the generator:

1. `apps/tarot-bridge/images/anime/[CATEGORY_FIRST_CARD].jpg` (e.g., `m00.jpg` for Major Arcana, `c01.jpg` for Cups. This enforces the category's specific anime art style, layout, and color themes.)
2. `apps/tarot-bridge/images/traditional/[CURRENT_CARD].jpg` (e.g., `c02.jpg`. This enforces the correct background elements and traditional card content for the specific given card.)

## Base Prompt Template

```text
Vertical portrait aspect ratio 9:16. 
A single tarot card in high-quality Japanese anime style. 
The card features: [CARD NAME] (Major Arcana [NUMBER]). 
Subject: [SPECIFIC SUBJECT DESCRIPTION]. 
Art Style: Studio Ghibli or Makoto Shinkai art style. Bright, vibrant colors, beautiful clear skies with fluffy clouds, highly detailed nature backgrounds. 
Layout constraints: The title of the card MUST be clearly written at the very top. The Roman numeral or number of the card MUST be written at the very bottom inside a decorative emblem. Do not put the title at the bottom.
```

## Examples

### The Magician (1)

> Vertical portrait aspect ratio 9:16. A single tarot card in high-quality Japanese anime style. The card features: The Magician (Major Arcana 1). Subject: A charismatic, brilliant young anime male character orchestrating elemental magic (fire, water, air, earth) floating above a stone altar in a mystical forest. Art Style: Studio Ghibli or Makoto Shinkai art style. Bright, vibrant colors, beautiful clear skies with fluffy clouds, highly detailed nature backgrounds. Layout constraints: The title of the card MUST be clearly written at the very top. The Roman numeral or number of the card MUST be written at the very bottom inside a decorative emblem. Do not put the title at the bottom.

### The High Priestess (2)

> Vertical portrait aspect ratio 9:16. A single tarot card in high-quality Japanese anime style. The card features: The High Priestess (Major Arcana 2). Subject: A serene, mysterious young anime female character sitting on a throne between a black and a white pillar, wearing flowing blue robes and a crescent moon crown, holding a scroll in her lap. Art Style: Studio Ghibli or Makoto Shinkai art style. Bright, vibrant colors, beautiful clear skies with fluffy clouds, highly detailed nature backgrounds. Layout constraints: The title of the card MUST be clearly written at the very top. The Roman numeral or number of the card MUST be written at the very bottom inside a decorative emblem. Do not put the title at the bottom.
