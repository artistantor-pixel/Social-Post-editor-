const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Reduce padding in the preview (canvas workspace) area
code = code.replace(
  '<div className="w-full flex-1 flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 z-10 overflow-y-auto md:overflow-hidden custom-scrollbar relative h-full">',
  '<div className="w-full flex-1 flex flex-col items-center justify-center p-2 sm:p-4 lg:p-8 z-10 overflow-y-auto md:overflow-hidden custom-scrollbar relative h-full">'
);

// 2. Reduce Transparency (Increase Opacity)

// Main App Container (Box)
code = code.replace(
  '<div className="max-w-[1600px] mx-auto w-full h-full flex flex-col bg-white/10 md:bg-white/20 backdrop-blur-xl md:backdrop-blur-2xl sm:rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.04)] ring-1 ring-white/40 md:ring-white/60 overflow-hidden relative z-10">',
  '<div className="max-w-[1600px] mx-auto w-full h-full flex flex-col bg-white/40 md:bg-white/60 backdrop-blur-xl md:backdrop-blur-2xl sm:rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.04)] ring-1 ring-white/60 overflow-hidden relative z-10">'
);

// Sticky Canvas Area (Mobile)
code = code.replace(
  '<div className="w-full md:flex-1 min-h-[400px] sm:min-h-[500px] md:min-h-0 bg-white/30 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b border-white/50 md:border-none relative flex flex-col items-center justify-center overflow-hidden sticky top-0 z-[60] md:static shadow-sm md:shadow-none">',
  '<div className="w-full md:flex-1 min-h-[400px] sm:min-h-[500px] md:min-h-0 bg-white/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b border-white/80 md:border-none relative flex flex-col items-center justify-center overflow-hidden sticky top-0 z-[60] md:static shadow-md md:shadow-none">'
);

// Header
code = code.replace(
  '<header className="h-[72px] md:h-[80px] shrink-0 bg-gradient-to-r from-white/40 via-white/50 to-white/40 backdrop-blur-2xl border-b border-white/60 px-4 md:px-8 flex items-center justify-between z-50 shadow-[0_8px_32px_rgba(31,38,135,0.05)] relative">',
  '<header className="h-[72px] md:h-[80px] shrink-0 bg-gradient-to-r from-white/60 via-white/70 to-white/60 backdrop-blur-2xl border-b border-white/80 px-4 md:px-8 flex items-center justify-between z-50 shadow-[0_8px_32px_rgba(31,38,135,0.05)] relative">'
);

// Sidebar
code = code.replace(
  '<div className="w-full md:w-[380px] lg:w-[420px] shrink-0 bg-white/40 backdrop-blur-2xl border-t md:border-t-0 md:border-r border-white/60 md:h-full md:overflow-y-auto flex flex-col z-40 relative custom-scrollbar shadow-[4px_0_24px_rgba(0,0,0,0.02)]">',
  '<div className="w-full md:w-[380px] lg:w-[420px] shrink-0 bg-white/70 backdrop-blur-2xl border-t md:border-t-0 md:border-r border-white/80 md:h-full md:overflow-y-auto flex flex-col z-40 relative custom-scrollbar shadow-[4px_0_24px_rgba(0,0,0,0.02)]">'
);

fs.writeFileSync('src/app/page.tsx', code);
console.log("UI Tweaks Applied!");
