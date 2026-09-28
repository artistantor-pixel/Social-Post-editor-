const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Reduce text size for quote template so it doesn't push the footer out of bounds
code = code.replace(
  "if (template === 'quote') classes += ' text-3xl md:text-5xl';",
  "if (template === 'quote') classes += ' text-2xl md:text-3xl lg:text-4xl';"
);

// 2. Reduce inner paddings to save vertical space
code = code.replace(
  'className="flex-1 bg-white/95 backdrop-blur-3xl rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col p-8 sm:p-10 relative overflow-hidden border-2 border-white/80 ring-1 ring-black/5"',
  'className="flex-1 bg-white/95 backdrop-blur-3xl rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col p-6 sm:p-8 relative overflow-hidden border-2 border-white/80 ring-1 ring-black/5"'
);

// 3. Make the quote icon a bit smaller
code = code.replace(
  '<Quote size={240} style={{ color: brandColor, fill: brandColor }} />',
  '<Quote size={180} style={{ color: brandColor, fill: brandColor }} />'
);

fs.writeFileSync('src/app/page.tsx', code);
console.log("Quote sizing reduced!");
