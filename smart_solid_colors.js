const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir);

let totalModifications = 0;

files.forEach(file => {
  if (file.endsWith('.html') || file.endsWith('.css')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // We will match ANY color: rgba(...) or color:rgba(...)
    // Using a replacer function to determine if it should be ivory, coal, or gold
    const regex = /color:\s*rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)(?:\s*!important)?/gi;

    content = content.replace(regex, (match, rStr, gStr, bStr, aStr) => {
      const r = parseInt(rStr, 10);
      const g = parseInt(gStr, 10);
      const b = parseInt(bStr, 10);

      // Check if it has !important
      const hasImportant = match.toLowerCase().includes('!important');
      const suffix = hasImportant ? ' !important' : '';

      // Identify gold (R > G > B, specifically yellowish)
      // e.g., 236,186,69 or 198,169,114 or 212,168,83
      if (r > 180 && g > 150 && b < 130) {
        return `color: var(--gold)${suffix}`;
      }

      // Check lightness (average of RGB or standard luminance)
      // Luminance roughly: (r + g + b) / 3
      const avg = (r + g + b) / 3;

      if (avg > 150) {
        // It's a light color (off-white, light gray, etc.)
        return `color: var(--ivory)${suffix}`;
      } else {
        // It's a dark color (dark gray, black, etc.)
        return `color: var(--coal)${suffix}`;
      }
    });

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Replaced all rgba text colors in ${file}`);
      totalModifications++;
    }
  }
});

console.log(`Intelligent solid text colors applied. Modified ${totalModifications} files.`);
