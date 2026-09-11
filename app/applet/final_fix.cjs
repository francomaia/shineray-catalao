const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // 1. Fix the specific broken logo blocks I created earlier
    content = content.replace(/\.logo img \{(\s*)height: 75px;\s*object-fit: contain;\s*\}/g, `
        .logo img {
            height: 75px;
            object-fit: contain;
        }`);

    content = content.replace(/\.footer-logo img \{(\s*)height: 65px;\s*filter: brightness\(0\) invert\(1\);\s*margin-bottom: 20px;\s*\}/g, `
        .footer-logo img {
            height: 65px;
            filter: brightness(0) invert(1);
            margin-bottom: 20px;
        }`);

    // 2. Fix unbalanced media queries
    // We look for @media blocks and ensure they have TWO closing braces if they contain a rule
    // This is specifically targeting the ones like:
    // @media ... { .rule { ... }
    content = content.replace(/(@media[^{]*\{[^{}]*\{[^{}]*\})\s*(?=@media|<\/style>|\/\*)/g, '$1\n        }\n\n');

    fs.writeFileSync(file, content);
});
console.log('Brace fix complete.');
