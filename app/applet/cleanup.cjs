const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Fix orphaned logo CSS that lost its selector
    content = content.replace(/\n\s*height: (\d+)px;\s*object-fit: contain;\s*\}/g, (match, p1) => {
        return `
        .logo img {
            height: ${p1}px;
            object-fit: contain;
        }`;
    });

    content = content.replace(/\n\s*height: (\d+)px;\s*filter: brightness\(0\) invert\(1\);\s*margin-bottom: 20px;\s*\}/g, (match, p1) => {
        return `
        .footer-logo img {
            height: ${p1}px;
            filter: brightness(0) invert(1);
            margin-bottom: 20px;
        }`;
    });

    // Fix the case where the brace was on a separate line but is now orphaned or redundant
    // e.g. "height: 55px;}"
    content = content.replace(/\n\s*height: (\d+)px;\}/g, (match, p1) => {
        // This is likely safe because we already handled the full blocks above
        return `\n        height: ${p1}px;\n        }`;
    });

    // Special fix for index.html which has a weird mess.
    if (file === 'index.html') {
         content = content.replace(/height: 100px;display: flex;/g, 'height: 100px;\n            display: flex;');
    }

    fs.writeFileSync(file, content);
});
console.log('Fix script finished.');
