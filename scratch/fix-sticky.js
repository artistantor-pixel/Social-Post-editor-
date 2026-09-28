const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Line 237: Remove overflow-x-hidden
code = code.replace(
  'overflow-x-hidden relative p-0 sm:p-4 md:p-6 lg:p-8',
  'relative p-0 sm:p-4 md:p-6 lg:p-8'
);

// Line 244: Remove overflow-clip
code = code.replace(
  'ring-1 ring-white/60 overflow-clip relative z-10',
  'ring-1 ring-white/60 relative z-10'
);

// To prevent horizontal scrolling if blobs overflow, we can put overflow-x-hidden on the body in global CSS, OR just use overflow-clip on the blobs themselves?
// Actually, putting overflow-x-hidden on body/html is safe for sticky! Let's do that in a style tag, or just let next.js body handle it if it doesn't break.
// Actually, I can just wrap the blobs in an absolute container with overflow-hidden, but we want them to overflow the screen.

fs.writeFileSync('src/app/page.tsx', code);
console.log("Sticky constraints removed!");
