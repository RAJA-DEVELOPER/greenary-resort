const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir);

let totalModifications = 0;

const hexToVarMap = {
  // Coals
  '#050608': 'var(--coal)',
  '#111': 'var(--coal)',
  
  // Graphites
  '#1b1d1f': 'var(--graphite)',
  
  // Golds
  '#f9d060': 'var(--gold-light)',
  '#f0c865': 'var(--gold)',
  
  // Light Mode specific (but safer to use variables)
  '#ede8df': 'var(--graphite)',
  '#f4efeb': 'var(--coal-soft)',
  
  // Forests
  '#1e4e30': 'var(--forest)',
  
  // Embers
  '#ff7b54': 'var(--ember)',
  '#c6641e': 'var(--ember)',
  '#dc503c': 'var(--ember)'
};

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
      return match;
    });

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Migrated remaining hex to variables in ${file}`);
      totalModifications++;
    }
  }
});

console.log(`Phase 2 complete. Modified ${totalModifications} files.`);
