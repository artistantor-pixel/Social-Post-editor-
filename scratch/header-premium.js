const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const headerRegex = /<header[\s\S]*?<\/header>/;

const newHeader = `<header className="h-[72px] md:h-[88px] shrink-0 bg-white/70 backdrop-blur-3xl border-b border-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] px-4 md:px-8 flex items-center justify-between z-50 relative">
        <div className="flex items-center gap-4 md:gap-5">
          {/* Ultra Premium Logo */}
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
            <div className="relative h-10 w-10 md:h-12 md:w-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-xl flex items-center justify-center transform transition-transform group-hover:scale-105 border border-slate-700 overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30"></div>
               <LayoutTemplate className="h-5 w-5 md:h-6 md:w-6 text-white relative z-10" />
            </div>
          </div>
          
          <div>
            <h1 className="font-black text-xl md:text-3xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 drop-shadow-sm flex items-center">
              Khobor<span className="font-light text-indigo-600">Key</span>
            </h1>
            <div className="flex items-center gap-2 mt-0.5 md:mt-1">
               <div className="flex items-center gap-1 text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 shadow-sm">
                  <Sparkles className="w-2.5 h-2.5 text-indigo-500" /> PRO STUDIO
               </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            onClick={handleDownload} 
            disabled={isDownloading}
            className="relative overflow-hidden bg-slate-900 hover:bg-slate-800 text-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] rounded-full px-5 md:px-8 h-10 md:h-12 text-xs md:text-sm font-bold tracking-widest transition-all hover:scale-[1.02] active:scale-95 group border border-slate-700"
          >
            {/* Animated Shine Effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
            
            {isDownloading ? (
              <Loader2 className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin relative z-10 text-indigo-300" />
            ) : (
              <Download className="mr-2 h-4 w-4 md:h-5 md:w-5 relative z-10 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
            )}
            <span className="relative z-10 text-slate-100">{isDownloading ? "EXPORTING..." : "EXPORT HD"}</span>
          </Button>
        </div>
      </header>`;

code = code.replace(headerRegex, newHeader);

fs.writeFileSync('src/app/page.tsx', code);
console.log("Premium Header Applied!");
