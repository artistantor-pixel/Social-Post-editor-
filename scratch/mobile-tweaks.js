const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// --- FOOTER FIXES ---
// 1. Center brand info on mobile
code = code.replace(
  '<div className="flex flex-col col-span-1 md:col-span-1">',
  '<div className="flex flex-col items-center md:items-start text-center md:text-left col-span-1 md:col-span-1">'
);

// 2. Hide links on mobile
code = code.replace(
  '<div className="flex flex-col">',
  '<div className="hidden md:flex flex-col">'
);
code = code.replace(
  '<div className="flex flex-col">',
  '<div className="hidden md:flex flex-col">'
);
code = code.replace(
  '<div className="flex flex-col">',
  '<div className="hidden md:flex flex-col">'
);
// (Since replace only does first occurrence, running it 3 times replaces the 3 link columns)

// 3. Center bottom bar on mobile
code = code.replace(
  '<div className="max-w-[1400px] mx-auto mt-12 md:mt-16 pt-6 md:pt-8 border-t border-slate-300/40 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-bold tracking-wide text-slate-400">',
  '<div className="max-w-[1400px] mx-auto mt-8 md:mt-16 pt-6 md:pt-8 border-t border-slate-300/40 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-bold tracking-wide text-slate-400 text-center md:text-left">'
);


// --- PREVIEW SECTION FIXES ---
// User wants preview to be 1/3 of the space on mobile (approx 33vh).
// Current: min-h-[550px] sm:min-h-[650px] md:h-[calc(100vh-104px)]
code = code.replace(
  'min-h-[550px] sm:min-h-[650px] md:h-[calc(100vh-104px)] bg-white/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b border-white/80 md:border-none relative flex flex-col overflow-hidden md:sticky md:top-[104px] md:self-start z-[40] shadow-md md:shadow-none',
  'min-h-[35vh] max-h-[40vh] sm:min-h-[40vh] md:max-h-none md:h-[calc(100vh-104px)] bg-white/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b border-white/80 md:border-none relative flex flex-col overflow-hidden md:sticky md:top-[104px] md:self-start z-[40] shadow-md md:shadow-none'
);

// Scale down the poster on mobile to fit the 35vh container.
// Previous: 
// scale-[0.65] sm:scale-[0.75] md:scale-[0.85] lg:scale-[0.95]
// scale-[0.70] sm:scale-[0.80] md:scale-[0.9] lg:scale-[1.0]
code = code.replace(
  "aspectRatio === 'square' ? 'scale-[0.65] sm:scale-[0.75] md:scale-[0.85] lg:scale-[0.95]' : 'scale-[0.70] sm:scale-[0.80] md:scale-[0.9] lg:scale-[1.0]'",
  "aspectRatio === 'square' ? 'scale-[0.40] sm:scale-[0.50] md:scale-[0.85] lg:scale-[0.95]' : 'scale-[0.45] sm:scale-[0.55] md:scale-[0.9] lg:scale-[1.0]'"
);


fs.writeFileSync('src/app/page.tsx', code);
console.log("Mobile layout tweaks applied!");
