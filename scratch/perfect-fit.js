const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Set the section to a small, fixed comfortable height for mobile (350px).
code = code.replace(
  'h-[420px] sm:h-[450px] md:h-[calc(100vh-104px)]',
  'h-[350px] sm:h-[400px] md:h-[calc(100vh-104px)]'
);

// 2. Set the scale to perfectly fit inside the 350px section.
// If square is 800px, 800 * 0.40 = 320px (fits nicely in 350px).
// If portrait is 1080x1350, wait!
// The aspect ratios are:
// square (1:1) -> 800x800
// portrait (4:5) -> 800x1000. 1000 * 0.30 = 300px.
// landscape (16:9) -> 1200x675. 1200 * 0.30 = 360px wide (fits in phone width), 675 * 0.30 = 202px tall.
// So scale-[0.40] for square, scale-[0.30] for portrait/landscape on mobile.
code = code.replace(
  "aspectRatio === 'square' ? 'scale-[0.45] sm:scale-[0.50] md:scale-[0.85] lg:scale-[0.95]' : 'scale-[0.45] sm:scale-[0.55] md:scale-[0.9] lg:scale-[1.0]'",
  "aspectRatio === 'square' ? 'scale-[0.40] sm:scale-[0.50] md:scale-[0.85] lg:scale-[0.95]' : 'scale-[0.30] sm:scale-[0.40] md:scale-[0.9] lg:scale-[1.0]'"
);

fs.writeFileSync('src/app/page.tsx', code);
console.log("Section size reduced and poster scaled to fit!");
