const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Add 15 options
const optionsRegex = /<option value="cinematic">11\. Cinematic Widescreen \(Epic\)<\/option>/;
const newOptions = `<option value="cinematic">11. Cinematic Widescreen (Epic)</option>
                       <option value="polaroid">12. Vintage Polaroid (Retro)</option>
                       <option value="tweet">13. Twitter/X Post (Social)</option>
                       <option value="news_ticker">14. Live News Ticker (Broadcast)</option>
                       <option value="brutalism">15. Neo-Brutalism (Bold/Harsh)</option>
                       <option value="holographic">16. Holographic Tech (Futuristic)</option>
                       <option value="elegant_serif">17. Elegant Luxury (Clean)</option>
                       <option value="sports_stat">18. Sports Match Day (Dynamic)</option>
                       <option value="podcast">19. Podcast Cover (Audio)</option>
                       <option value="retro_wave">20. 80s Retro Wave (Synth)</option>
                       <option value="comic_book">21. Comic Book Panel (Pop Art)</option>
                       <option value="cyber_glitch">22. Cyber Glitch (Hacker)</option>
                       <option value="watercolor">23. Soft Watercolor (Artistic)</option>
                       <option value="glass_dark">24. Dark Glass Card (Sleek)</option>
                       <option value="monochrome">25. B&W Monochrome (Dramatic)</option>
                       <option value="neon_border">26. Glowing Neon Border (Vivid)</option>`;
code = code.replace(optionsRegex, newOptions);

// 2. Add isLightBackground variable before return
const returnRegex = /return \(/;
const isLightBackgroundDecl = `const isLightBackground = ['minimal_white', 'magazine', 'polaroid', 'tweet', 'brutalism', 'elegant_serif', 'comic_book', 'watercolor'].includes(template);
  
  return (`
code = code.replace(returnRegex, isLightBackgroundDecl);

// 3. Replace all "template === 'minimal_white' || template === 'magazine'" with isLightBackground
code = code.replace(/template === 'minimal_white' \|\| template === 'magazine'/g, 'isLightBackground');
// Update includes arrays for background and text
code = code.replace(/!\['minimal_white', 'split', 'magazine'\]\.includes\(template\)/g, "!isLightBackground && template !== 'split'");
code = code.replace(/!\['glass', 'split', 'magazine', 'cinematic'\]\.includes\(template\)/g, "(!['glass', 'split', 'cinematic', 'polaroid', 'tweet', 'news_ticker', 'brutalism', 'glass_dark'].includes(template) && !isLightBackground)");

// 4. Add Background Overlays
const bgOverlaysRegex = /<div className="absolute inset-0 bg-black\/20" \/>\s*<\/>\s*\)}/s;
const newBgOverlays = `<div className="absolute inset-0 bg-black/20" />
                </>
              )}
              {template === 'holographic' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/40 via-purple-500/40 to-pink-500/40 mix-blend-color" />
              )}
              {template === 'retro_wave' && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/50 to-pink-600/80" style={{ backgroundImage: 'linear-gradient(transparent 95%, rgba(255, 255, 255, 0.3) 100%), linear-gradient(90deg, transparent 95%, rgba(255, 255, 255, 0.3) 100%)', backgroundSize: '40px 40px' }} />
              )}
              {template === 'comic_book' && (
                <div className="absolute inset-0 bg-white/10 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '10px 10px' }} />
              )}
              {template === 'cyber_glitch' && (
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-screen" />
              )}
              {template === 'watercolor' && (
                <div className="absolute inset-0 shadow-[inset_0_0_80px_60px_rgba(255,255,255,0.8)]" />
              )}
              {template === 'monochrome' && (
                <div className="absolute inset-0 backdrop-grayscale backdrop-contrast-125" />
              )}
              {template === 'neon_border' && (
                <div className="absolute inset-4 border-[6px] rounded-xl z-20" style={{ borderColor: brandColor, boxShadow: \`0 0 20px \${brandColor}, inset 0 0 20px \${brandColor}\` }} />
              )}`;
code = code.replace(bgOverlaysRegex, newBgOverlays);

// 5. Add Layout Classes to Standard Layout
// I need to carefully replace the layout block
const layoutBlockRegex = /\{\/\* --- STANDARD TEMPLATES LAYOUT ---\s*\*\/}.*?style=\{template === 'magazine' \? \{ borderColor: brandColor \} : \{\}\}>/s;
const newLayoutBlock = `{/* --- STANDARD TEMPLATES LAYOUT --- */}
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
              \`} style={(template === 'magazine' || template === 'news_ticker') ? { borderColor: brandColor } : {}}>`;
code = code.replace(layoutBlockRegex, newLayoutBlock);


// 6. Fix Logo Colors for all light backgrounds
code = code.replace(
  /\${template === 'minimal_white' \? 'brightness-100' : 'brightness-0 invert'}/g,
  "${isLightBackground ? 'brightness-100' : 'brightness-0 invert'}"
);


// 7. Inject specific template content blocks
// e.g., if tweet, show an avatar. If news_ticker, show a red live badge.
const headlineRegex = /\{\/\* Headline Text \*\/\}\s*<h1 className=\{`font-bold leading-snug drop-shadow-lg \$\{getHeadlineClasses\(\)\}/s;
const newHeadlineBlock = `{/* Special Template Headers */}
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
                <h1 className={\`font-bold leading-snug drop-shadow-lg \${getHeadlineClasses()} \${template === 'elegant_serif' ? 'font-serif tracking-tight' : ''} \${template === 'brutalism' ? 'font-black uppercase tracking-tighter drop-shadow-none' : ''} \${template === 'cyber_glitch' ? 'uppercase font-black tracking-widest' : ''}\``;
code = code.replace(headlineRegex, newHeadlineBlock);


// 8. Cyber Glitch specific text shadow
code = code.replace(
  "style={template === 'neon_glow' ? { textShadow: `0 0 10px ${brandColor}, 0 0 20px ${brandColor}, 0 0 40px ${brandColor}`, color: '#fff' } : {}}",
  "style={template === 'neon_glow' ? { textShadow: `0 0 10px ${brandColor}, 0 0 20px ${brandColor}, 0 0 40px ${brandColor}`, color: '#fff' } : template === 'cyber_glitch' ? { textShadow: '3px 0 0 #ff003c, -3px 0 0 #00f0ff' } : {}}"
);


// Write out
fs.writeFileSync('src/app/page.tsx', code);
console.log("15 new templates injected successfully!");
