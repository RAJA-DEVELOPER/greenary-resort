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

    // Pattern to match color properties with low opacity for the main text colors
    // Matches: color: rgba(232, 224, 213, 0.something) or color: rgba(237, 228, 213, 0.something)
    // and changes opacity to 0.85
    
    // For CSS properties
    content = content.replace(/color:\s*rgba\(\s*23[27],\s*22[48],\s*213,\s*0\.[2-6]\d*\s*\)/gi, 'color: rgba(237, 228, 213, 0.85)');
    
    // Specifically handle some CSS classes in upgrade.css and style.css where color isn't explicitly written with 'color:'
    // We already targeted 'color:' which is safe. Let's see if there are other low opacity texts.
    // Also handle input placeholders in upgrade.css
    content = content.replace(/rgba\(237,\s*228,\s*213,\s*0\.28\)/g, 'rgba(237, 228, 213, 0.6)'); // For placeholders
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated contrast in ${file}`);
      totalModifications++;
    }
  }
});

console.log(`Contrast fix completed. Modified ${totalModifications} files.`);
