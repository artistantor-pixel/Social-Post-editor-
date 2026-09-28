const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

code = code.replace(
  'className="w-full flex-1 flex items-center justify-center p-2 sm:p-4 lg:p-8 z-10 overflow-hidden md:overflow-auto custom-scrollbar relative h-full"',
  'className="w-full flex-1 flex max-md:items-center max-md:justify-center p-2 sm:p-4 lg:p-8 z-10 overflow-hidden md:overflow-auto custom-scrollbar relative h-full"'
);

fs.writeFileSync('src/app/page.tsx', code);
console.log("Desktop scroll protected!");
