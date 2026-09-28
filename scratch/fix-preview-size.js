const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix syntax error on line 618 and set mobile height to 35vh
code = code.replace(
  '<div className="w-full md:flex-1 ${aspectRatio === \'square\' ? \'h-[390px]\' : \'h-[240px]\'} md:h-[calc(100vh-104px)] bg-white/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b border-white/80 md:border-none relative flex flex-col overflow-hidden transform-gpu isolate sticky top-[96px] md:top-[104px] self-start z-[40] shadow-md md:shadow-none">',
  '<div className={`w-full md:flex-1 h-[35vh] md:h-[calc(100vh-104px)] bg-white/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b border-white/80 md:border-none relative flex flex-col overflow-hidden transform-gpu isolate sticky top-[96px] md:top-[104px] self-start z-[40] shadow-md md:shadow-none`}>'
);

// Fix scaling on line 636 to prevent overflow on mobile with the new 35vh height
code = code.replace(
  "${aspectRatio === 'square' ? 'scale-[0.70] sm:scale-[0.80] md:scale-[0.85] lg:scale-[0.95]' : 'scale-[0.60] sm:scale-[0.75] md:scale-[0.9] lg:scale-[1.0]'}",
  "${aspectRatio === 'square' ? 'scale-[0.50] sm:scale-[0.65] md:scale-[0.85] lg:scale-[0.95]' : 'scale-[0.50] sm:scale-[0.65] md:scale-[0.9] lg:scale-[1.0]'}"
);

fs.writeFileSync('src/app/page.tsx', code);
console.log("Preview sizing fixed!");
