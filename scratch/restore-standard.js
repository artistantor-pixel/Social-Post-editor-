const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const standardCode = `            ) : (
              {/* --- STANDARD TEMPLATES LAYOUT --- */}
              <div className={\`
                flex flex-col relative z-10
                \${textAlign === 'center' ? 'items-center text-center' : textAlign === 'right' ? 'items-end text-right' : 'items-start text-left'}
                \${template === 'glass' ? 'bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl mt-auto' : ''}
                \${template === 'glass_dark' ? 'bg-black/60 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl shadow-2xl mt-auto' : ''}
                \${template === 'magazine' ? 'bg-white p-6 sm:p-8 m-4 sm:m-6 mt-auto rounded-none shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)] border-l-8' : ''}
                \${template === 'brutalism' ? 'bg-[#f4f4f0] p-6 sm:p-8 m-4 sm:m-6 mt-auto rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]' : ''}
                \${template === 'polaroid' ? 'bg-white p-6 sm:p-8 pt-12 m-4 sm:m-6 mt-auto rounded-sm shadow-xl' : ''}
                \${template === 'tweet' ? 'bg-white p-6 sm:p-8 m-4 sm:m-6 mt-auto rounded-2xl shadow-md border border-slate-200' : ''}
                \${template === 'news_ticker' ? 'bg-white p-4 sm:p-6 mt-auto rounded-none border-t-[6px] w-full' : ''}
                \${template === 'elegant_serif' ? 'p-8 pb-10 mb-auto bg-gradient-to-b from-white/90 to-transparent w-full' : ''}
                \${template === 'cinematic' ? 'p-6 pb-8 mt-auto flex justify-center items-center h-[25%] text-center mb-0' : ''}
                \${template === 'split' ? 'p-8 pb-10 mt-auto' : ''}
                \${template === 'sports_stat' ? 'p-8 pb-10 mt-auto bg-gradient-to-t from-black via-black/80 to-transparent skew-y-[-2deg] origin-bottom-left' : ''}
                \${(aspectRatio === 'square' && !['glass', 'glass_dark', 'split', 'magazine', 'cinematic', 'brutalism', 'polaroid', 'tweet', 'news_ticker', 'elegant_serif', 'sports_stat'].includes(template)) ? 'p-8 pb-10 mt-auto' : (!['glass', 'glass_dark', 'split', 'magazine', 'cinematic', 'brutalism', 'polaroid', 'tweet', 'news_ticker', 'elegant_serif', 'sports_stat'].includes(template)) ? 'p-6 pb-8 mt-auto' : ''}
              \`} style={(template === 'magazine' || template === 'news_ticker') ? { borderColor: brandColor } : {}}>

                {/* Top Row: Category and Logo */}
                {template !== 'tweet' && template !== 'news_ticker' && (
                  <div className={\`flex justify-between items-start w-full mb-6 \${template === 'split' ? 'mb-8' : ''}\`}>
                    {category && (
                      <div className={\`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm border border-white/20
                        \${isLightBackground ? 'bg-black text-white' : 'text-white backdrop-blur-md'}
                      \`} style={!isLightBackground ? { backgroundColor: \`\${brandColor}99\` } : {}}>
                        {category}
                      </div>
                    )}
                    
                    {logoPosition !== 'hidden' && (
                      <Image 
                        src="/logo.svg" 
                        alt="Khobor Key Logo" 
                        width={logoSize * 3} 
                        height={logoSize} 
                        style={{ height: \`\${logoSize}px\`, width: 'auto' }}
                        className={\`drop-shadow-md transition-all \${isLightBackground ? 'brightness-100' : 'brightness-0 invert'}\`}
                      />
                    )}
                  </div>
                )}

                {/* Special Template Headers */}
                {template === 'tweet' && (
                  <div className="flex items-center gap-3 mb-4 w-full">
                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                      <Image src={quoteAuthorImg || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"} alt="Avatar" width={40} height={40} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-bold text-slate-900 flex items-center gap-1">{quoteAuthor || "NewsDesk"} <svg className="w-4 h-4 text-blue-500 fill-current" viewBox="0 0 24 24"><path d="M22.5 12.5c0-.82-.68-1.5-1.5-1.5h-1c-.55 0-1-.45-1-1v-1c0-.82-.68-1.5-1.5-1.5-.27 0-.52.07-.74.2-.42.24-.97.16-1.3-.23l-.7-.8c-.43-.5-1.12-.66-1.72-.4l-1.03.45c-.48.2-1.04.1-1.42-.25l-.78-.7c-.55-.5-1.38-.6-2.03-.24-.22.13-.47.2-.74.2-.82 0-1.5.68-1.5 1.5v1c0 .55-.45 1-1 1h-1c-.82 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5h1c.55 0 1 .45 1 1v1c0 .82.68 1.5 1.5 1.5.27 0 .52-.07.74-.2.42-.24.97-.16 1.3.23l.7.8c.43.5 1.12.66 1.72.4l1.03-.45c.48-.2 1.04-.1 1.42.25l.78.7c.55.5 1.38.6 2.03.24.22-.13.47-.2.74-.2.82 0 1.5-.68 1.5-1.5v-1c0-.55.45-1 1-1h1c.82 0 1.5-.68 1.5-1.5z"/></svg></span>
                      <span className="text-xs font-medium text-slate-500">@latest_updates</span>
                    </div>
                  </div>
                )}
                {template === 'news_ticker' && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-sm animate-pulse tracking-widest uppercase">LIVE</span>
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{category || "BREAKING NEWS"}</span>
                  </div>
                )}

                {/* Headline Text */}
                <h1 className={\`font-bold leading-snug drop-shadow-lg \${getHeadlineClasses()} \${template === 'elegant_serif' ? 'font-serif tracking-tight' : ''} \${template === 'brutalism' ? 'font-black uppercase tracking-tighter drop-shadow-none' : ''} \${template === 'cyber_glitch' ? 'uppercase font-black tracking-widest' : ''}
                  \${isLightBackground ? 'text-black drop-shadow-none' : 'text-white'}
                \`}
                style={template === 'neon_glow' ? { textShadow: \`0 0 10px \${brandColor}, 0 0 20px \${brandColor}, 0 0 40px \${brandColor}\`, color: '#fff' } : template === 'cyber_glitch' ? { textShadow: '3px 0 0 #ff003c, -3px 0 0 #00f0ff' } : {}}
                >
                  {headline}
                </h1>
                
                {/* Date and Source */}
                {(postDate || newsSource) && template !== 'cinematic' && (
                  <div className={\`mt-3 flex flex-wrap items-center gap-3 text-xs md:text-sm font-medium drop-shadow-md
                    \${isLightBackground ? 'text-gray-700 drop-shadow-none' : 'text-gray-300'}
                  \`}>
                    {postDate && <span className="flex items-center gap-1 opacity-90">{postDate}</span>}
                    {postDate && newsSource && <span className="opacity-50">•</span>}
                    {newsSource && <span className="flex items-center gap-1 opacity-90 text-white bg-black/40 px-2 py-0.5 rounded-sm">{newsSource}</span>}
                  </div>
                )}

                {/* Split Template Special Footer */}
                {template === 'split' && (
                  <div className="mt-8 flex justify-between items-end border-t border-black/10 pt-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-black/50 uppercase tracking-widest">In Focus</span>
                      <span className="text-lg font-black text-black">KHOBOR KEY</span>
                    </div>
                    {textAlign === 'right' && <div className={\`w-8 h-[2px] \${isLightBackground ? 'bg-black' : 'bg-white/50'}\`} style={template === 'neon_glow' ? { backgroundColor: brandColor, boxShadow: \`0 0 5px \${brandColor}\` } : {}} />}
                  </div>
                )}
              </div>
            )} {/* End Conditional Template Check */}`;

code = code.replace(
  '            ) : (\n\n\n            </div> {/* End Main Image & Content Area */}',
  standardCode + '\n            </div> {/* End Main Image & Content Area */}'
);

fs.writeFileSync('src/app/page.tsx', code);
console.log("Standard template restored!");
