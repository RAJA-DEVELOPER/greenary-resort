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

    // Handle rgba(237,229,218, 0.something)
    content = content.replace(/color:\s*rgba\(\s*237,\s*229,\s*218,\s*0\.[2-6]\d*\s*\)/gi, 'color: rgba(237, 229, 218, 0.85)');
    
    // Handle rgba(236,186,69, 0.something) -> gold text
    content = content.replace(/color:\s*rgba\(\s*236,\s*186,\s*69,\s*0\.[2-6]\d*\s*\)/gi, 'color: rgba(236, 186, 69, 0.9)');
    
    // Handle other low opacity text
    content = content.replace(/color:\s*rgba\(\s*248,\s*242,\s*232,\s*0\.[2-6]\d*\s*\)/gi, 'color: rgba(248, 242, 232, 0.85)');
    
    // Handle rgba(17, 19, 21, 0.65) -> make it full 0.85 or 0.9
    content = content.replace(/color:\s*rgba\(\s*17,\s*19,\s*21,\s*0\.[2-6]\d*\s*\)/gi, 'color: rgba(17, 19, 21, 0.85)');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated contrast in ${file}`);
      totalModifications++;
    }
  }
});

console.log(`Contrast fix completed. Modified ${totalModifications} files.`);
