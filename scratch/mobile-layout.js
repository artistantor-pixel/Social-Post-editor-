const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Header Export button sizing for mobile
code = code.replace(
  'px-6 h-10 font-medium tracking-wide',
  'px-4 md:px-6 h-9 md:h-10 text-xs md:text-sm font-medium tracking-wide'
);
// Also adjust header padding
code = code.replace(
  'px-6 flex items-center justify-between',
  'px-4 md:px-6 flex items-center justify-between'
);
// Adjust title text size on mobile
code = code.replace(
  'font-bold text-xl tracking-tight bg-clip-text',
  'font-bold text-lg md:text-xl tracking-tight bg-clip-text'
);

// 2. Main App Area Flex direction
const mainAppAreaOld = '<div className="flex-1 flex overflow-hidden">';
const mainAppAreaNew = '<div className="flex-1 flex flex-col-reverse md:flex-row overflow-y-auto md:overflow-hidden custom-scrollbar">';
code = code.replace(mainAppAreaOld, mainAppAreaNew);

// 3. Sidebar mobile adjustments
const sidebarOld = '<div className="w-full md:w-[380px] lg:w-[420px] shrink-0 bg-white/40 backdrop-blur-2xl border-r border-white/60 h-full overflow-y-auto flex flex-col z-40 relative custom-scrollbar shadow-[4px_0_24px_rgba(0,0,0,0.02)]">';
const sidebarNew = '<div className="w-full md:w-[380px] lg:w-[420px] shrink-0 bg-white/40 backdrop-blur-2xl border-t md:border-t-0 md:border-r border-white/60 md:h-full md:overflow-y-auto flex flex-col z-40 relative custom-scrollbar shadow-[4px_0_24px_rgba(0,0,0,0.02)]">';
code = code.replace(sidebarOld, sidebarNew);

// Adjust sidebar padding bottom on mobile so it doesn't leave 32px of blank space
code = code.replace(
  '<div className="p-6 space-y-8 pb-32">',
  '<div className="p-4 md:p-6 space-y-8 pb-12 md:pb-32">'
);

// 4. Canvas Area mobile adjustments
const canvasAreaOld = '<div className="flex-1 bg-transparent relative flex flex-col items-center justify-center overflow-hidden">';
const canvasAreaNew = '<div className="w-full md:flex-1 min-h-[450px] sm:min-h-[500px] md:min-h-0 bg-transparent relative flex flex-col items-center justify-center overflow-hidden">';
code = code.replace(canvasAreaOld, canvasAreaNew);

// Canvas inner padding on mobile
code = code.replace(
  '<div className="w-full flex-1 flex flex-col items-center justify-center p-8 lg:p-12 z-10 overflow-y-auto custom-scrollbar relative h-full">',
  '<div className="w-full flex-1 flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 z-10 overflow-y-auto md:overflow-hidden custom-scrollbar relative h-full">'
);

// 5. Canvas Scaler for mobile
// It's currently: scale-[0.6] sm:scale-[0.75] md:scale-[0.85] lg:scale-[0.95]
// It should be fine, but let's make it slightly smaller on tiny mobile phones
code = code.replace(
  "aspectRatio === 'square' ? 'scale-[0.6] sm:scale-[0.75] md:scale-[0.85] lg:scale-[0.95]' : 'scale-[0.7] sm:scale-[0.8] md:scale-90 lg:scale-[1.0]'",
  "aspectRatio === 'square' ? 'scale-[0.55] sm:scale-[0.75] md:scale-[0.85] lg:scale-[0.95]' : 'scale-[0.65] sm:scale-[0.8] md:scale-[0.9] lg:scale-[1.0]'"
);

fs.writeFileSync('src/app/page.tsx', code);
console.log("Mobile layout optimized!");
