const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Make sticky on mobile and set top-[96px]
code = code.replace(
  'md:sticky md:top-[104px] md:self-start z-[40]',
  'sticky top-[96px] md:top-[104px] self-start z-[40]'
);

// 2. Fix centering by removing min-h-[400px] on mobile (which causes off-center clipping)
code = code.replace(
  'className="relative z-10 m-auto flex flex-col items-center justify-center min-h-[400px]"',
  'className="relative z-10 m-auto flex flex-col items-center justify-center min-h-0 md:min-h-[400px]"'
);

// 3. Make sure the container for the inner content is fully centering.
// w-full flex-1 flex p-2 sm:p-4 lg:p-8 z-10 overflow-hidden md:overflow-auto custom-scrollbar relative h-full
code = code.replace(
  'className="w-full flex-1 flex p-2 sm:p-4 lg:p-8 z-10 overflow-hidden md:overflow-auto custom-scrollbar relative h-full"',
  'className="w-full flex-1 flex items-center justify-center p-2 sm:p-4 lg:p-8 z-10 overflow-hidden md:overflow-auto custom-scrollbar relative h-full"'
);

fs.writeFileSync('src/app/page.tsx', code);
console.log("Mobile sticky and centering applied!");
