const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Header Upgrade
const oldHeader = '<header className="h-[72px] shrink-0 bg-white/40 backdrop-blur-2xl border-b border-white/60 px-4 md:px-6 flex items-center justify-between z-50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] relative">';
const newHeader = '<header className="h-[72px] md:h-[80px] shrink-0 bg-gradient-to-r from-white/40 via-white/50 to-white/40 backdrop-blur-2xl border-b border-white/60 px-4 md:px-8 flex items-center justify-between z-50 shadow-[0_8px_32px_rgba(31,38,135,0.05)] relative">';
code = code.replace(oldHeader, newHeader);

// Header Title Gradient
code = code.replace(
  'font-bold text-lg md:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700',
  'font-extrabold text-lg md:text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-600 drop-shadow-sm'
);

// Header Export Button
const oldButton = 'className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 rounded-full px-4 md:px-6 h-9 md:h-10 text-xs md:text-sm font-medium tracking-wide transition-all"';
const newButton = 'className="relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] rounded-full px-5 md:px-8 h-9 md:h-11 text-xs md:text-sm font-bold tracking-widest transition-all hover:scale-105 active:scale-95 group"';
code = code.replace(oldButton, newButton);

// 2. Make Canvas Area Sticky on Mobile & Add Glassmorphism to it
const oldCanvasArea = '<div className="w-full md:flex-1 min-h-[450px] sm:min-h-[500px] md:min-h-0 bg-transparent relative flex flex-col items-center justify-center overflow-hidden">';
const newCanvasArea = '<div className="w-full md:flex-1 min-h-[400px] sm:min-h-[500px] md:min-h-0 bg-white/30 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b border-white/50 md:border-none relative flex flex-col items-center justify-center overflow-hidden sticky top-0 z-[60] md:static shadow-sm md:shadow-none">';
code = code.replace(oldCanvasArea, newCanvasArea);

// Adjust the canvas scaler on mobile slightly smaller so it doesn't take the entire height when sticky
code = code.replace(
  "aspectRatio === 'square' ? 'scale-[0.55] sm:scale-[0.75] md:scale-[0.85] lg:scale-[0.95]' : 'scale-[0.65] sm:scale-[0.8] md:scale-[0.9] lg:scale-[1.0]'",
  "aspectRatio === 'square' ? 'scale-[0.50] sm:scale-[0.65] md:scale-[0.85] lg:scale-[0.95]' : 'scale-[0.55] sm:scale-[0.7] md:scale-[0.9] lg:scale-[1.0]'"
);

// 3. Make Mobile Glassmorphism pop more
// Change outer container bg on mobile to let blobs show through better
const oldAppContainer = '<div className="max-w-[1600px] mx-auto w-full h-full flex flex-col bg-white/20 backdrop-blur-2xl sm:rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.04)] ring-1 ring-white/60 overflow-hidden relative z-10">';
const newAppContainer = '<div className="max-w-[1600px] mx-auto w-full h-full flex flex-col bg-white/10 md:bg-white/20 backdrop-blur-xl md:backdrop-blur-2xl sm:rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.04)] ring-1 ring-white/40 md:ring-white/60 overflow-hidden relative z-10">';
code = code.replace(oldAppContainer, newAppContainer);

// Make the blobs much bigger and more colorful for mobile so they show behind the layout
const oldBlobs = `{/* Light Glassmorphism Background Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-300/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-300/40 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-blue-300/30 blur-[120px] pointer-events-none" />`;
const newBlobs = `{/* Dynamic Glassmorphism Background Blobs (Enhanced for Mobile) */}
      <div className="absolute top-[-10%] left-[-20%] md:left-[-10%] w-[80%] md:w-[50%] h-[50%] rounded-full bg-indigo-400/50 md:bg-indigo-300/40 blur-[100px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] md:right-[-10%] w-[80%] md:w-[50%] h-[50%] rounded-full bg-fuchsia-400/50 md:bg-purple-300/40 blur-[100px] md:blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] left-[20%] md:left-[60%] w-[60%] md:w-[30%] h-[40%] md:h-[30%] rounded-full bg-blue-400/40 md:bg-blue-300/30 blur-[100px] md:blur-[120px] pointer-events-none" />`;
code = code.replace(oldBlobs, newBlobs);


fs.writeFileSync('src/app/page.tsx', code);
console.log("Upgraded!");
