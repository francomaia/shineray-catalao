const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Most media queries in these files have rules inside.
    // So they should end with }}
    // If they end with only } before next @media or </style>, we add one.
    
    // First, fix the ones where the interior rule lost its brace
    // and was merged with the media query brace.
    // e.g. .rule { ... } } became .rule { ... }
    
    // We look for: } [whitespace] (@media | </style>)
    // and change it to: } } [whitespace] (@media | </style>)
    // BUT only if they are unbalanced.
    
    let styleMatch = content.match(/<style[\s\S]*?<\/style>/);
    if (!styleMatch) return;
    let style = styleMatch[0];
    
    let parts = style.split(/(@media[^{]*\{)/);
    for (let i = 1; i < parts.length; i += 2) {
        let header = parts[i];
        let body = parts[i+1];
        
        // Find everything until the next piece of header or </style>
        // and check balance
        let balance = 1; // for the @media {
        let lastBraceIdx = -1;
        
        for (let j = 0; j < body.length; j++) {
            if (body[j] === '{') balance++;
            if (body[j] === '}') {
                balance--;
                lastBraceIdx = j;
            }
            if (balance === 0) break;
        }
        
        if (balance > 0) {
            console.log(`Fixing imbalance in ${file} at ${header.substring(0, 20)}...`);
            // Add missing brace at the end of the current content block
            // but before the next portion. 
            // This is complex because of the split.
            
            // Let's just find the end of the body and insert }
            if (lastBraceIdx !== -1) {
                 parts[i+1] = body.substring(0, lastBraceIdx + 1) + '\n        }' + body.substring(lastBraceIdx + 1);
            } else {
                 // No braces found?
                 parts[i+1] = body + '\n        }';
            }
        }
    }
    
    let newStyle = parts.join('');
    content = content.replace(style, newStyle);
    fs.writeFileSync(file, content);
});
console.log('Fix script finished.');
