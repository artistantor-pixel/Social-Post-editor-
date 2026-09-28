const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Line 585 (Outer Wrapper)
const line585Old = 'bg-white/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b border-white/80 md:border-none relative flex flex-col items-center justify-center overflow-hidden sticky top-0 z-[60] md:static shadow-md md:shadow-none';
const line585New = 'bg-white/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b border-white/80 md:border-none relative flex flex-col overflow-hidden sticky top-0 z-[60] md:static shadow-md md:shadow-none';
code = code.replace(line585Old, line585New);

// 2. Line 589 (Scroll Container)
const line589Old = 'className="w-full flex-1 flex flex-col items-center justify-center p-2 sm:p-4 lg:p-8 z-10 overflow-y-auto custom-scrollbar relative h-full"';
const line589New = 'className="w-full flex-1 flex p-2 sm:p-4 lg:p-8 z-10 overflow-auto custom-scrollbar relative h-full"';
code = code.replace(line589Old, line589New);

// 3. Line 598 (Inner Wrapper)
const line598Old = 'className="relative z-10 flex flex-col items-center justify-center h-full w-full min-h-[400px]"';
const line598New = 'className="relative z-10 m-auto flex flex-col items-center justify-center min-h-[400px]"';
code = code.replace(line598Old, line598New);

// Ensure the main app wrapper doesn't have min-h-0 in a way that breaks desktop full-height layout?
// Wait, min-h-0 is needed for flex children to scroll.
// Let's also check if md:overflow-hidden on the flex-1 flex flex-col-reverse md:flex-row is preventing scrolling of its children.
// The sidebar has block, the canvas has flex-col. Both should scroll if their parent is constrained.
// Is the parent constrained? 
// <div className="max-w-[1600px] ... flex flex-col ... h-full ... overflow-hidden">
// This means it has a fixed height.
// Its child is <div className="flex-1 ... overflow-hidden min-h-0">. This will also have a constrained height.
// So the sidebar and canvas should scroll properly!

fs.writeFileSync('src/app/page.tsx', code);
console.log("Scroll un-clipped!");
