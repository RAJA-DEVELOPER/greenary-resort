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

    // Light text colors -> var(--ivory)
    content = content.replace(/color:\s*rgba\(\s*(237,\s*229,\s*218|232,\s*224,\s*213|248,\s*242,\s*232|250,\s*248,\s*245),\s*0\.[0-9]+\s*\)/gi, 'color: var(--ivory)');
    
    // Dark text colors -> var(--coal)
    content = content.replace(/color:\s*rgba\(\s*(18,\s*22,\s*26|17,\s*19,\s*21|3,\s*6,\s*8|10,\s*12,\s*14),\s*0\.[0-9]+\s*\)/gi, 'color: var(--coal)');

    // Gold text colors -> var(--gold)
    content = content.replace(/color:\s*rgba\(\s*(236,\s*186,\s*69|212,\s*168,\s*83|198,\s*169,\s*114),\s*0\.[0-9]+\s*\)/gi, 'color: var(--gold)');

    // Catch-all for any other stray rgba text colors (if any are missed, we can handle them manually, but this covers 99% of what we saw)
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Replaced rgba text colors in ${file}`);
      totalModifications++;
    }
  }
});

console.log(`Solid text colors applied. Modified ${totalModifications} files.`);
