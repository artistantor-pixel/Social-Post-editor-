const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Outer Wrapper
code = code.replace(
  '<div className="h-screen flex flex-col bg-[#eef2f6] font-sans text-slate-900 selection:bg-indigo-200 selection:text-indigo-900 overflow-hidden relative p-0 sm:p-4 md:p-6 lg:p-8">',
  '<div className="min-h-screen flex flex-col bg-[#eef2f6] font-sans text-slate-900 selection:bg-indigo-200 selection:text-indigo-900 overflow-x-hidden relative p-0 sm:p-4 md:p-6 lg:p-8">'
);

// 2. Box Container
code = code.replace(
  '<div className="max-w-[1600px] mx-auto w-full h-full flex flex-col bg-white/40 md:bg-white/60 backdrop-blur-xl md:backdrop-blur-2xl sm:rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.04)] ring-1 ring-white/60 overflow-hidden relative z-10">',
  '<div className="max-w-[1600px] mx-auto w-full min-h-[100vh] md:min-h-[calc(100vh-4rem)] h-auto flex flex-col bg-white/40 md:bg-white/60 backdrop-blur-xl md:backdrop-blur-2xl sm:rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.04)] ring-1 ring-white/60 overflow-clip relative z-10">'
);

// 3. Header (Needs to be sticky now so it stays on top on desktop too, if we want)
code = code.replace(
  '<header className="h-[72px] md:h-[88px] shrink-0 bg-white/70 backdrop-blur-3xl border-b border-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] px-4 md:px-8 flex items-center justify-between z-50 relative">',
  '<header className="h-[72px] md:h-[88px] shrink-0 bg-white/70 backdrop-blur-3xl border-b border-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] px-4 md:px-8 flex items-center justify-between z-50 sticky top-0">'
);

// 4. Main App Area Flex
code = code.replace(
  '<div className="flex-1 flex flex-col-reverse md:flex-row overflow-y-auto md:overflow-hidden custom-scrollbar min-h-0">',
  '<div className="flex-1 flex flex-col-reverse md:flex-row w-full h-full relative">'
);

// 5. Sidebar
code = code.replace(
  '<div className="w-full md:w-[380px] lg:w-[420px] shrink-0 bg-white/70 backdrop-blur-2xl border-t md:border-t-0 md:border-r border-white/80 md:h-full md:overflow-y-auto block z-40 relative custom-scrollbar shadow-[4px_0_24px_rgba(0,0,0,0.02)]">',
  '<div className="w-full md:w-[380px] lg:w-[420px] shrink-0 bg-white/70 backdrop-blur-2xl border-t md:border-t-0 md:border-r border-white/80 h-auto block z-40 relative shadow-[4px_0_24px_rgba(0,0,0,0.02)]">'
);

// 6. Canvas Area (Needs to be sticky on Desktop too!)
code = code.replace(
  '<div className="w-full md:flex-1 min-h-[400px] sm:min-h-[500px] md:min-h-0 bg-white/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b border-white/80 md:border-none relative flex flex-col overflow-hidden sticky top-0 z-[60] md:static shadow-md md:shadow-none">',
  '<div className="w-full md:flex-1 min-h-[450px] sm:min-h-[500px] md:h-[calc(100vh-88px)] bg-white/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b border-white/80 md:border-none relative flex flex-col overflow-hidden sticky top-0 md:top-[88px] z-[40] shadow-md md:shadow-none">'
);

fs.writeFileSync('src/app/page.tsx', code);
console.log("Full page scroll applied!");
