const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const canvasOld = '<div className="w-full md:flex-1 min-h-[450px] sm:min-h-[500px] md:h-[calc(100vh-104px)] bg-white/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b border-white/80 md:border-none relative flex flex-col overflow-hidden sticky top-0 md:top-[104px] z-[40] shadow-md md:shadow-none">';
const canvasNew = '<div className="w-full md:flex-1 min-h-[450px] sm:min-h-[500px] md:h-[calc(100vh-104px)] bg-white/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b border-white/80 md:border-none relative flex flex-col overflow-hidden sticky top-0 md:top-[104px] self-start z-[40] shadow-md md:shadow-none">';

code = code.replace(canvasOld, canvasNew);

fs.writeFileSync('src/app/page.tsx', code);
console.log("Self-start added!");
