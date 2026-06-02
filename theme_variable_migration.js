const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir);

let totalModifications = 0;

const hexToVarMap = {
  // Darks -> --coal
  '#030608': 'var(--coal)',
  '#0a0c0e': 'var(--coal)',
  '#060709': 'var(--coal)',
  '#06100b': 'var(--coal)',
  '#000000': 'var(--coal)',
  '#000': 'var(--coal)',
  
  // Dark softs -> --coal-soft
  '#07100c': 'var(--coal-soft)',
  '#12141a': 'var(--coal-soft)',
  
  // Graphites -> --graphite
  '#0c1812': 'var(--graphite)',
  '#141618': 'var(--graphite)',
  
  // Lights -> --ivory
  '#faf8f5': 'var(--ivory)',
  '#f8f2e8': 'var(--ivory)',
  '#ffffff': 'var(--ivory)',
  '#fff': 'var(--ivory)',
  
  // Linens -> --linen
  '#ede4d5': 'var(--linen)',
  '#ede5da': 'var(--linen)',
  
  // Golds -> --gold
  '#ecba45': 'var(--gold)',
  '#d4a853': 'var(--gold)',
  '#c6a972': 'var(--gold)',
  
  // Embers -> --ember
  '#e8643c': 'var(--ember)',
  '#ff826e': 'var(--ember)',
  
  // Forests -> --forest
  '#4caf82': 'var(--forest)',
  '#5e9e6b': 'var(--forest)',
  '#2d6a4f': 'var(--forest)'
};

// Regex to match CSS properties assigning hardcoded hex values
// We look for common properties like color, background, border, fill, stroke etc.
// The negative lookbehind `(?<!--)` is conceptually what we want, but since it's not supported in all older engines,
// we'll just explicitly match the property names to avoid matching `--var-name: #hex;`.
const propRegex = /(color|background|background-color|border|border-color|border-top-color|border-bottom-color|border-left-color|border-right-color|fill|stroke):\s*(#[0-9A-Fa-f]{3,6})(?=\s*!important|\s*;|\s*\}|\s*")/gi;

files.forEach(file => {
  if (file.endsWith('.html') || file.endsWith('.css') || file.endsWith('.js')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    content = content.replace(propRegex, (match, propName, hexValue) => {
      const lowerHex = hexValue.toLowerCase();
      if (hexToVarMap[lowerHex]) {
        return `${propName}: ${hexToVarMap[lowerHex]}`;
      }
      // If it's a hex not in our map, keep it unchanged
      return match;
    });

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Migrated hex to variables in ${file}`);
      totalModifications++;
    }
  }
});

console.log(`Theme variable migration complete. Modified ${totalModifications} files.`);
