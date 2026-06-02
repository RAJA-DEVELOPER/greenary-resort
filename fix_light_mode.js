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

    // Specifically target color properties that were incorrectly set to var(--coal)
    // var(--coal) evaluates to #FAF8F5 (Light Ivory) in Light Mode, which causes light text on light backgrounds
    // We should change these to var(--ivory), which evaluates to #12161A (Dark Coal) in Light Mode and #FAF8F5 in Dark Mode.
    // NOTE: We only want to change "color:" properties, NOT background-color or border-color!
    
    // Replace `color: var(--coal)` and `color: var(--coal) !important` with var(--ivory)
    content = content.replace(/color:\s*var\(--coal\)([\s!important]*);/gi, 'color: var(--ivory)$1;');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed light mode contrast in ${file}`);
      totalModifications++;
    }
  }
});

console.log(`Light mode visibility fix applied. Modified ${totalModifications} files.`);
