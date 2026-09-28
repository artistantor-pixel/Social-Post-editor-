const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Unstick on mobile, make it taller
code = code.replace(
  'min-h-[450px] sm:min-h-[500px] md:h-[calc(100vh-104px)] bg-white/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b border-white/80 md:border-none relative flex flex-col overflow-hidden sticky top-0 md:top-[104px] self-start z-[40] shadow-md md:shadow-none',
  'min-h-[550px] sm:min-h-[650px] md:h-[calc(100vh-104px)] bg-white/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b border-white/80 md:border-none relative flex flex-col overflow-hidden md:sticky md:top-[104px] md:self-start z-[40] shadow-md md:shadow-none'
);

// 2. Remove internal scroll on mobile
code = code.replace(
  'className="w-full flex-1 flex p-2 sm:p-4 lg:p-8 z-10 overflow-auto custom-scrollbar relative h-full"',
  'className="w-full flex-1 flex p-2 sm:p-4 lg:p-8 z-10 overflow-hidden md:overflow-auto custom-scrollbar relative h-full"'
);

// 3. Make the mobile scale bigger
// Original: scale-[0.50] sm:scale-[0.65] md:scale-[0.85] lg:scale-[0.95]
// Original non-square: scale-[0.55] sm:scale-[0.7] md:scale-[0.9] lg:scale-[1.0]
code = code.replace(
  "aspectRatio === 'square' ? 'scale-[0.50] sm:scale-[0.65] md:scale-[0.85] lg:scale-[0.95]' : 'scale-[0.55] sm:scale-[0.7] md:scale-[0.9] lg:scale-[1.0]'",
  "aspectRatio === 'square' ? 'scale-[0.65] sm:scale-[0.75] md:scale-[0.85] lg:scale-[0.95]' : 'scale-[0.70] sm:scale-[0.80] md:scale-[0.9] lg:scale-[1.0]'"
);

fs.writeFileSync('src/app/page.tsx', code);
console.log("Mobile preview updated!");
