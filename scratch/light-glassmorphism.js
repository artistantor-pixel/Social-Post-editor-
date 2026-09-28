const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. App Wrapper and Blobs
const appWrapperOld = '<div className="h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-indigo-200 selection:text-indigo-900 overflow-hidden">';
const appWrapperNew = `<div className="h-screen flex flex-col bg-[#eef2f6] font-sans text-slate-900 selection:bg-indigo-200 selection:text-indigo-900 overflow-hidden relative">
      {/* Light Glassmorphism Background Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-300/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-300/40 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-blue-300/30 blur-[120px] pointer-events-none" />`;
code = code.replace(appWrapperOld, appWrapperNew);

// 2. Header
code = code.replace(
  '<header className="h-[72px] shrink-0 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-50 shadow-sm relative">',
  '<header className="h-[72px] shrink-0 bg-white/40 backdrop-blur-2xl border-b border-white/60 px-6 flex items-center justify-between z-50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] relative">'
);

// 3. Sidebar
code = code.replace(
  '<div className="w-full md:w-[380px] lg:w-[420px] shrink-0 bg-white border-r border-slate-200 h-full overflow-y-auto flex flex-col z-40 relative custom-scrollbar shadow-[4px_0_24px_rgba(0,0,0,0.02)]">',
  '<div className="w-full md:w-[380px] lg:w-[420px] shrink-0 bg-white/40 backdrop-blur-2xl border-r border-white/60 h-full overflow-y-auto flex flex-col z-40 relative custom-scrollbar shadow-[4px_0_24px_rgba(0,0,0,0.02)]">'
);

// 4. Input Fields
// Regular inputs (h-11)
code = code.replace(
  /h-11 w-full rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-sm px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500\/20 focus:border-indigo-500/g,
  "h-11 w-full rounded-xl border border-white/60 bg-white/50 backdrop-blur-md hover:bg-white/70 transition-all shadow-sm px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white/90"
);

// Textareas
code = code.replace(
  /w-full rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-sm px-3 py-2\.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500\/20 focus:border-indigo-500/g,
  "w-full rounded-xl border border-white/60 bg-white/50 backdrop-blur-md hover:bg-white/70 transition-all shadow-sm px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white/90"
);
// h-10 inputs (selects, smaller inputs)
code = code.replace(
  /flex h-10 w-full rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-sm px-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500\/20 focus:border-indigo-500/g,
  "flex h-10 w-full rounded-xl border border-white/60 bg-white/50 backdrop-blur-md hover:bg-white/70 transition-all shadow-sm px-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white/90"
);

code = code.replace(
  /flex h-10 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs/g,
  "flex h-10 w-full rounded-xl border border-white/60 bg-white/50 backdrop-blur-md hover:bg-white/70 transition-all shadow-sm px-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white/90"
);

code = code.replace(
  /flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs/g,
  "flex h-10 w-full rounded-xl border border-white/60 bg-white/50 backdrop-blur-md hover:bg-white/70 transition-all shadow-sm px-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white/90"
);

code = code.replace(
  /h-9 w-full rounded-md border border-slate-200 px-3 text-xs/g,
  "h-9 w-full rounded-lg border border-white/60 bg-white/50 backdrop-blur-md hover:bg-white/70 transition-all shadow-sm px-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white/90"
);

code = code.replace(
  /h-10 w-full rounded-lg border border-slate-200 px-3 text-xs/g,
  "h-10 w-full rounded-xl border border-white/60 bg-white/50 backdrop-blur-md hover:bg-white/70 transition-all shadow-sm px-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white/90"
);

// Toggle/Group buttons
code = code.replace(
  /flex bg-slate-100 p-1 border border-slate-200 shadow-sm text-slate-700 rounded-lg/g,
  "flex bg-white/30 backdrop-blur-md p-1 border border-white/60 shadow-sm text-slate-700 rounded-xl"
);
code = code.replace(
  /flex bg-slate-100 border border-slate-200 shadow-sm text-slate-700 rounded-lg p-1 h-10/g,
  "flex bg-white/30 backdrop-blur-md border border-white/60 shadow-sm text-slate-700 rounded-xl p-1 h-10"
);

// Right Area Workspace Wrapper
code = code.replace(
  '<div className="flex-1 bg-[#F8FAFC] relative flex flex-col items-center justify-center overflow-hidden">',
  '<div className="flex-1 bg-transparent relative flex flex-col items-center justify-center overflow-hidden">'
);
code = code.replace(
  '<div className="absolute inset-0 bg-dot-pattern opacity-[0.25]" />',
  '<div className="absolute inset-0 bg-dot-pattern opacity-[0.15]" />'
);

// Adjust section header underlines to white/60
code = code.replace(
  /border-b border-slate-100 pb-3/g,
  "border-b border-white/50 pb-3"
);

// Inner boxes (like Quote Details)
code = code.replace(
  /border border-indigo-100 bg-indigo-50\/50 p-4 rounded-xl/g,
  "border border-white/70 bg-white/40 backdrop-blur-xl p-4 rounded-2xl shadow-sm"
);

// Ad boxes
code = code.replace(
  /bg-slate-50 p-4 rounded-xl border border-slate-100/g,
  "bg-white/40 backdrop-blur-xl p-4 rounded-2xl border border-white/70 shadow-sm"
);

fs.writeFileSync('src/app/page.tsx', code);
console.log("Light glassmorphism applied!");
