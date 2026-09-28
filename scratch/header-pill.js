const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const headerRegex = /<header className="h-\[72px\].*?<\/header>/s;

const newHeader = `<div className="sticky top-0 z-[70] pt-4 md:pt-6 px-4 md:px-8 w-full pb-4">
      <header className="h-[64px] md:h-[76px] bg-white/80 backdrop-blur-3xl border border-white shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-full px-2 md:px-3 pr-2 md:pr-3 flex items-center justify-between w-full max-w-[1500px] mx-auto transition-all">
        <div className="flex items-center gap-3 md:gap-4 pl-3 md:pl-5">
          {/* Sleek Minimal Logo Mark */}
          <div className="relative h-9 w-9 md:h-11 md:w-11 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 flex items-center justify-center transform transition-transform hover:rotate-12">
             <div className="absolute inset-[1px] bg-white rounded-full flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-full"></div>
               <LayoutTemplate className="h-4 w-4 md:h-5 md:w-5 text-indigo-600 relative z-10" />
             </div>
          </div>
          
          {/* Typography Logo */}
          <div className="flex flex-col justify-center">
            <h1 className="font-extrabold text-[17px] md:text-[22px] tracking-tight text-slate-900 leading-none flex items-center gap-1">
              Khobor<span className="text-indigo-600">Key</span>
            </h1>
            <span className="text-[9px] md:text-[10px] font-bold text-slate-400 tracking-[0.25em] uppercase leading-none mt-1.5 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-amber-500" /> Pro Studio
            </span>
          </div>
        </div>

        <div className="flex items-center">
          {/* Ultra Premium Export Button */}
          <Button 
            onClick={handleDownload} 
            disabled={isDownloading}
            className="relative overflow-hidden group bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-full px-5 md:px-8 h-10 md:h-[52px] text-[11px] md:text-[13px] font-extrabold tracking-[0.15em] transition-all shadow-[0_4px_20px_rgba(79,70,229,0.4)] hover:shadow-[0_8px_25px_rgba(79,70,229,0.5)] border-none hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            {isDownloading ? (
              <Loader2 className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin relative z-10 text-white" />
            ) : (
              <Download className="mr-2 h-4 w-4 md:h-5 md:w-5 relative z-10 text-white" />
            )}
            <span className="relative z-10">{isDownloading ? "EXPORTING..." : "EXPORT HD"}</span>
          </Button>
        </div>
      </header>
    </div>`;

code = code.replace(headerRegex, newHeader);

// Adjust the canvas area top offset to align with the new floating header height (pt-6 (24) + h-76 + pb-4 (16) = 116px roughly)
code = code.replace(
  'sticky top-0 md:top-[88px] z-[40]',
  'sticky top-0 md:top-[104px] z-[40]'
);
// Adjust canvas area height calculation 
code = code.replace(
  'md:h-[calc(100vh-88px)]',
  'md:h-[calc(100vh-104px)]'
);


fs.writeFileSync('src/app/page.tsx', code);
console.log("Floating Pill Header Applied!");
