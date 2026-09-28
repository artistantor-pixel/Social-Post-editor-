const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Fix container height on mobile.
// Currently: min-h-[35vh] max-h-[40vh] sm:min-h-[40vh] md:max-h-none md:h-[calc(100vh-104px)]
code = code.replace(
  'min-h-[35vh] max-h-[40vh] sm:min-h-[40vh] md:max-h-none md:h-[calc(100vh-104px)]',
  'h-[420px] sm:h-[450px] md:h-[calc(100vh-104px)]'
);

// 2. Adjust the scale to fill the 420px box perfectly without overflowing.
// Currently:
// aspectRatio === 'square' ? 'scale-[0.30] sm:scale-[0.50] md:scale-[0.85] lg:scale-[0.95]' : 'scale-[0.30] sm:scale-[0.55] md:scale-[0.9] lg:scale-[1.0]'
code = code.replace(
  "aspectRatio === 'square' ? 'scale-[0.30] sm:scale-[0.50] md:scale-[0.85] lg:scale-[0.95]' : 'scale-[0.30] sm:scale-[0.55] md:scale-[0.9] lg:scale-[1.0]'",
  "aspectRatio === 'square' ? 'scale-[0.45] sm:scale-[0.50] md:scale-[0.85] lg:scale-[0.95]' : 'scale-[0.45] sm:scale-[0.55] md:scale-[0.9] lg:scale-[1.0]'"
);

fs.writeFileSync('src/app/page.tsx', code);
console.log("Mobile height and scale fixed!");
