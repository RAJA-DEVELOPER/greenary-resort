const fs = require('fs');
const path = require('path');

const dir = __dirname;
const sourceFile = path.join(dir, 'index.html');
const source = fs.readFileSync(sourceFile, 'utf8');

function getBlock(content, startMarker, endMarker) {
  const start = content.indexOf(startMarker);
  if (start === -1) {
    throw new Error(`Missing start marker: ${startMarker}`);
  }

  const end = content.indexOf(endMarker, start);
  if (end === -1) {
    throw new Error(`Missing end marker after: ${startMarker}`);
  }

  return content.slice(start, end + endMarker.length);
}

const homeNavbar = getBlock(source, '<nav id="navbar"', '</nav>');
const homeMobileNav = getBlock(source, '<div id="nav-mobile"', '</div>');

function replaceBlock(content, startMarker, endMarker, replacement) {
  const start = content.indexOf(startMarker);
  if (start === -1) return { content, changed: false };

  const end = content.indexOf(endMarker, start);
  if (end === -1) {
    throw new Error(`Could not find ${endMarker} for block starting ${startMarker}`);
  }

  return {
    content: content.slice(0, start) + replacement + content.slice(end + endMarker.length),
    changed: true,
  };
}

fs.readdirSync(dir)
  .filter(file => file.endsWith('.html') && file !== 'index.html')
  .forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    const navbarResult = replaceBlock(content, '<nav id="navbar"', '</nav>', homeNavbar);
    content = navbarResult.content;

    const mobileResult = replaceBlock(content, '<div id="nav-mobile"', '</div>', homeMobileNav);
    content = mobileResult.content;

    if (navbarResult.changed || mobileResult.changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Synced navbar in ${file}`);
    }
  });

console.log('Navbar sync complete.');
