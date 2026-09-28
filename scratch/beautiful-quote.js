const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Remove the 'none' background image for the quote template so it uses the uploaded image
code = code.replace(
  "backgroundImage: template === 'quote' ? 'none' : `url(${bgImageUrl})`,",
  "backgroundImage: `url(${bgImageUrl})`,"
);

// 2. Rewrite the entire Quote Template JSX block
const quoteBlockRegex = /\{\/\* --- COMPLETELY UNIQUE QUOTE TEMPLATE LAYOUT --- \*\/\}.*?\{\/\* End Conditional Template Check \*\/\}/s;

const newQuoteBlock = `{/* --- COMPLETELY UNIQUE QUOTE TEMPLATE LAYOUT --- */}
            {template === 'quote' ? (
              <div className="relative w-full h-full flex flex-col p-5 sm:p-8">
                {/* Vibrant Brand-tinted glassmorphism background overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />
                <div className="absolute inset-0 mix-blend-color opacity-50" style={{ backgroundColor: brandColor }} />
                
                {/* Beautiful Inner Card */}
                <div className="flex-1 bg-white/95 backdrop-blur-3xl rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col p-8 sm:p-10 relative overflow-hidden border-2 border-white/80 ring-1 ring-black/5">
                  
                  {/* Subtle Gradient Glow inside the card */}
                  <div className="absolute -top-20 -right-20 w-80 h-80 opacity-20 rounded-full blur-[60px] pointer-events-none" style={{ backgroundColor: brandColor }} />
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 opacity-10 rounded-full blur-[40px] pointer-events-none" style={{ backgroundColor: brandColor }} />
                  
                  {/* Massive background quote mark */}
                  <div className="absolute -top-6 -left-2 opacity-5 pointer-events-none rotate-6">
                    <Quote size={240} style={{ color: brandColor, fill: brandColor }} />
                  </div>

                  {/* Header Row: Category & Date (Informative) */}
                  <div className="flex justify-between items-center w-full relative z-10 mb-8 border-b border-slate-200/50 pb-4">
                    <div className="flex items-center gap-3">
                      {category && (
                        <div className="px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-sm" style={{ backgroundColor: brandColor }}>
                          {category}
                        </div>
                      )}
                      {postDate && (
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{postDate}</span>
                      )}
                    </div>
                    
                    {logoPosition !== 'hidden' && (
                      <Image 
                        src="/logo.svg" 
                        alt="Khobor Key Logo" 
                        width={logoSize * 2.5} 
                        height={logoSize * 0.8} 
                        style={{ height: \`\${logoSize * 0.7}px\`, width: 'auto' }}
                        className="opacity-90"
                      />
                    )}
                  </div>

                  {/* Centered Quote Text */}
                  <div className="flex-1 flex flex-col justify-center relative z-10 my-4">
                    <h1 className={\`font-serif font-bold tracking-tight text-slate-800 leading-[1.3] drop-shadow-sm \${getHeadlineClasses()} \${textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left'}\`} style={{ textShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                      "{headline}"
                    </h1>
                  </div>

                  {/* Bottom Footer: Author Profile & Source (Informative) */}
                  <div className="mt-6 pt-5 border-t-2 border-slate-100 flex items-center justify-between relative z-10 bg-slate-50/50 -mx-8 -mb-8 px-8 pb-8 pt-6 rounded-b-3xl">
                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      {quoteAuthorImg && (
                        <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg shrink-0 border-2" style={{ borderColor: brandColor }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={quoteAuthorImg} alt={quoteAuthor} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <h3 className="text-base font-black text-slate-900 leading-tight tracking-tight uppercase">{quoteAuthor || 'Anonymous'}</h3>
                        {quoteDesignation && (
                          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.15em] mt-1" style={{ color: brandColor }}>{quoteDesignation}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* News Source / Domain */}
                    {newsSource && (
                      <div className="flex flex-col items-end text-right">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Source</span>
                        <span className="text-xs font-bold text-slate-800">{newsSource}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
`;

code = code.replace(quoteBlockRegex, newQuoteBlock);

fs.writeFileSync('src/app/page.tsx', code);
console.log("Quote template made beautiful and informative!");
