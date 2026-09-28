const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Fix Canvas scroll on desktop
code = code.replace(
  '<div className="w-full flex-1 flex flex-col items-center justify-center p-2 sm:p-4 lg:p-8 z-10 overflow-y-auto md:overflow-hidden custom-scrollbar relative h-full">',
  '<div className="w-full flex-1 flex flex-col items-center justify-center p-2 sm:p-4 lg:p-8 z-10 overflow-y-auto custom-scrollbar relative h-full">'
);

// 2. Ensure Sidebar can scroll properly. Sometimes flex flex-col on the scrolling container breaks it.
// We change it to just a block scrolling container.
code = code.replace(
  '<div className="w-full md:w-[380px] lg:w-[420px] shrink-0 bg-white/70 backdrop-blur-2xl border-t md:border-t-0 md:border-r border-white/80 md:h-full md:overflow-y-auto flex flex-col z-40 relative custom-scrollbar shadow-[4px_0_24px_rgba(0,0,0,0.02)]">',
  '<div className="w-full md:w-[380px] lg:w-[420px] shrink-0 bg-white/70 backdrop-blur-2xl border-t md:border-t-0 md:border-r border-white/80 md:h-full md:overflow-y-auto block z-40 relative custom-scrollbar shadow-[4px_0_24px_rgba(0,0,0,0.02)]">'
);

// Also make sure the Main wrapper doesn't accidentally grow infinitely
code = code.replace(
  '<div className="flex-1 flex flex-col-reverse md:flex-row overflow-y-auto md:overflow-hidden custom-scrollbar">',
  '<div className="flex-1 flex flex-col-reverse md:flex-row overflow-y-auto md:overflow-hidden custom-scrollbar min-h-0">'
);

fs.writeFileSync('src/app/page.tsx', code);
console.log("Scroll fixed!");
