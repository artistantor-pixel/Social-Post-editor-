const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Fix Safari overflow bug by adding transform-gpu and isolating the container
// Line 601: outer container
code = code.replace(
  'bg-white/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b border-white/80 md:border-none relative flex flex-col overflow-hidden sticky top-[96px] md:top-[104px] self-start z-[40] shadow-md md:shadow-none',
  'bg-white/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b border-white/80 md:border-none relative flex flex-col overflow-hidden transform-gpu isolate sticky top-[96px] md:top-[104px] self-start z-[40] shadow-md md:shadow-none'
);

// 2. Reduce the mobile scale so it perfectly fits within the 35vh height
code = code.replace(
  "aspectRatio === 'square' ? 'scale-[0.40] sm:scale-[0.50] md:scale-[0.85] lg:scale-[0.95]' : 'scale-[0.45] sm:scale-[0.55] md:scale-[0.9] lg:scale-[1.0]'",
  "aspectRatio === 'square' ? 'scale-[0.30] sm:scale-[0.50] md:scale-[0.85] lg:scale-[0.95]' : 'scale-[0.30] sm:scale-[0.55] md:scale-[0.9] lg:scale-[1.0]'"
);

// 3. To be absolutely sure it doesn't bleed, change inner overflow-hidden to overflow-clip
code = code.replace(
  'className="w-full flex-1 flex max-md:items-center max-md:justify-center p-2 sm:p-4 lg:p-8 z-10 overflow-hidden md:overflow-auto custom-scrollbar relative h-full"',
  'className="w-full flex-1 flex max-md:items-center max-md:justify-center p-2 sm:p-4 lg:p-8 z-10 overflow-clip md:overflow-auto custom-scrollbar relative h-full transform-gpu"'
);

fs.writeFileSync('src/app/page.tsx', code);
console.log("Safari fix applied!");
