const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Set dynamic container height based on aspect ratio
// Look for the current height class string: 'h-[350px] sm:h-[400px] md:h-[calc(100vh-104px)]'
code = code.replace(
  'h-[350px] sm:h-[400px] md:h-[calc(100vh-104px)]',
  "${aspectRatio === 'square' ? 'h-[390px]' : 'h-[240px]'} md:h-[calc(100vh-104px)]"
);

// 2. Set the scale to make the poster BIG and fill the area nicely
// Current string: aspectRatio === 'square' ? 'scale-[0.40] sm:scale-[0.50] md:scale-[0.85] lg:scale-[0.95]' : 'scale-[0.30] sm:scale-[0.40] md:scale-[0.9] lg:scale-[1.0]'
code = code.replace(
  "aspectRatio === 'square' ? 'scale-[0.40] sm:scale-[0.50] md:scale-[0.85] lg:scale-[0.95]' : 'scale-[0.30] sm:scale-[0.40] md:scale-[0.9] lg:scale-[1.0]'",
  "aspectRatio === 'square' ? 'scale-[0.70] sm:scale-[0.80] md:scale-[0.85] lg:scale-[0.95]' : 'scale-[0.60] sm:scale-[0.75] md:scale-[0.9] lg:scale-[1.0]'"
);

fs.writeFileSync('src/app/page.tsx', code);
console.log("Fill area applied!");
