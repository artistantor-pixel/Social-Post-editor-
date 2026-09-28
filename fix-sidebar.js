const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const sidebarStart = code.indexOf('{/* Left Sidebar - Settings */}');
const sidebarEnd = code.indexOf('{/* Right Area - Canvas Workspace */}');

if (sidebarStart === -1 || sidebarEnd === -1) {
    console.error("Couldn't find markers");
    process.exit(1);
}

const cleanSidebar = `{/* Left Sidebar - Settings */}
        <div className="w-full md:w-[380px] lg:w-[420px] shrink-0 bg-white border-r border-slate-200 h-full overflow-y-auto flex flex-col z-40 relative custom-scrollbar shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
           <div className="p-6 space-y-8 pb-32">
              
              {/* SECTION: CONTENT */}
              <section className="space-y-5">
                 <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Type className="w-4 h-4 text-indigo-500" />
                    <h2 className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-900">Text Content</h2>
                 </div>
                 
                 <div className="space-y-4">
                   <div className="space-y-2">
                     <div className="flex items-center justify-between">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
                         <Type className="h-4 w-4" /> Headline Text
                       </label>
                       <Button variant="ghost" size="sm" className="h-6 text-xs text-primary px-2" onClick={rewriteHeadline} disabled={isRewriting}>
                         {isRewriting ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Wand2 className="h-3 w-3 mr-1" />}
                         AI Rewrite
                       </Button>
                     </div>
                     <textarea 
                       value={headline}
                       onChange={(e) => setHeadline(e.target.value)}
                       rows={3}
                       className="w-full rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-sm px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                     />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Category / Tag</label>
                       <input 
                         type="text" 
                         value={category}
                         onChange={(e) => setCategory(e.target.value)}
                         className="h-11 w-full rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-sm px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                       />
                     </div>
                     <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Date</label>
                       <input 
                         type="text" 
                         value={postDate}
                         onChange={(e) => setPostDate(e.target.value)}
                         className="h-11 w-full rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-sm px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                         placeholder="e.g. 28 Sept, 2026"
                       />
                     </div>
                   </div>

                   <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">News Source</label>
                     <input 
                       type="text" 
                       value={newsSource}
                       onChange={(e) => setNewsSource(e.target.value)}
                       className="h-11 w-full rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-sm px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                       placeholder="e.g. Source: Reuters (Leave empty to hide)"
                     />
                   </div>
                 </div>
              </section>

              {/* SECTION: MEDIA */}
              <section className="space-y-5">
                 <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <ImageIcon className="w-4 h-4 text-indigo-500" />
                    <h2 className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-900">Media & Image</h2>
                 </div>
                 
                 <div className="space-y-4">
                   <div className="space-y-3">
                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
                       Background Image
                     </label>
                     <div className="flex bg-slate-100 p-1 border border-slate-200 shadow-sm text-slate-700 rounded-lg">
                       <button onClick={() => setImageMethod('upload')} className={\`flex-1 text-xs py-1.5 rounded-md font-medium \${imageMethod === 'upload' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}\`}>Upload</button>
                       <button onClick={() => setImageMethod('url')} className={\`flex-1 text-xs py-1.5 rounded-md font-medium \${imageMethod === 'url' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}\`}>URL</button>
                       <button onClick={() => setImageMethod('ai')} className={\`flex-1 text-xs py-1.5 rounded-md font-medium \${imageMethod === 'ai' ? 'bg-white text-slate-900 shadow-sm text-primary flex justify-center gap-1' : 'text-slate-500 hover:text-slate-800 flex justify-center gap-1'}\`}><Sparkles className="h-3 w-3" /> AI Gen</button>
                     </div>

                     <div className="pt-2">
                       {imageMethod === 'upload' && (
                         <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-indigo-300 transition-colors" onClick={() => fileInputRef.current?.click()}>
                           <Upload className="h-6 w-6 text-slate-400 mb-2" />
                           <p className="text-xs font-semibold text-slate-600">Click to upload image</p>
                           <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                         </div>
                       )}
                       {imageMethod === 'url' && (
                         <input type="text" value={bgImageUrl} onChange={(e) => setBgImageUrl(e.target.value)} className="h-11 w-full rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-sm px-3 py-2 text-sm" placeholder="Paste image URL here..." />
                       )}
                       {imageMethod === 'ai' && (
                         <div className="space-y-2">
                           <textarea value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} rows={2} className="w-full rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-sm px-3 py-2 text-sm" placeholder="Describe the image you want..." />
                           <Button onClick={generateAIImage} disabled={isGeneratingImg} className="w-full h-10 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700">
                             {isGeneratingImg ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : <><Sparkles className="mr-2 h-4 w-4" /> Generate AI Image</>}
                           </Button>
                         </div>
                       )}
                     </div>
                   </div>
                 </div>
              </section>

              {/* SECTION: DESIGN */}
              <section className="space-y-5">
                 <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Palette className="w-4 h-4 text-indigo-500" />
                    <h2 className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-900">Design & Layout</h2>
                 </div>
                 
                 <div className="space-y-4">
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Format / Size</label>
                     <div className="flex gap-4">
                       <label className="flex items-center gap-2 text-sm cursor-pointer">
                         <input type="radio" checked={aspectRatio === "square"} onChange={() => setAspectRatio("square")} className="text-indigo-600 focus:ring-indigo-600" />
                         Square (FB/Insta)
                       </label>
                       <label className="flex items-center gap-2 text-sm cursor-pointer">
                         <input type="radio" checked={aspectRatio === "landscape"} onChange={() => setAspectRatio("landscape")} className="text-indigo-600 focus:ring-indigo-600" />
                         Landscape (Link)
                       </label>
                     </div>
                   </div>

                   <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Design Template</label>
                     <select value={template} onChange={(e) => setTemplate(e.target.value)} className="flex h-11 w-full rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-sm px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
                       <option value="breaking">1. Breaking News (Color Gradient)</option>
                       <option value="standard">2. Standard News (Dark Overlay)</option>
                       <option value="glass">3. Glassmorphism Card (Modern)</option>
                       <option value="minimal_white">4. Minimalist White (Clean)</option>
                       <option value="bordered">5. Bold Border Frame (Pop Art)</option>
                       <option value="split">6. Split Screen (Top Image / Bottom Color)</option>
                       <option value="duotone">7. Cyberpunk Duotone</option>
                       <option value="quote">8. Quote / Statement (Beautiful)</option>
                       <option value="neon_glow">9. Neon Glow (Futuristic)</option>
                       <option value="magazine">10. Editorial Magazine (Classy)</option>
                       <option value="cinematic">11. Cinematic Widescreen (Epic)</option>
                     </select>
                   </div>

                   {/* Quote Specific Settings */}
                   {template === 'quote' && (
                     <div className="space-y-4 border border-indigo-100 bg-indigo-50/50 p-4 rounded-xl">
                       <label className="text-xs font-bold text-indigo-700 uppercase tracking-wide">Quote Details</label>
                       <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                           <label className="text-[10px] font-bold text-slate-500 uppercase">Author Name</label>
                           <input type="text" value={quoteAuthor} onChange={(e) => setQuoteAuthor(e.target.value)} className="h-9 w-full rounded-md border border-slate-200 px-3 text-xs" />
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] font-bold text-slate-500 uppercase">Designation</label>
                           <input type="text" value={quoteDesignation} onChange={(e) => setQuoteDesignation(e.target.value)} className="h-9 w-full rounded-md border border-slate-200 px-3 text-xs" />
                         </div>
                       </div>
                       <div className="space-y-2">
                         <label className="text-[10px] font-bold text-slate-500 uppercase">Author Photo (Square)</label>
                         <div className="flex gap-2">
                           <Button variant="outline" size="sm" className="h-9 w-full text-xs" onClick={() => authorImgInputRef.current?.click()}>
                             <Upload className="h-3 w-3 mr-1" /> {quoteAuthorImg ? 'Change Photo' : 'Upload Photo'}
                           </Button>
                           <input type="file" ref={authorImgInputRef} className="hidden" accept="image/*" onChange={handleAuthorImgUpload} />
                         </div>
                       </div>
                     </div>
                   )}

                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1"><Palette className="h-3 w-3"/> Brand Color</label>
                       <div className="flex items-center gap-2">
                         <input type="color" value={brandColor} onChange={(e) => setBrandColor(e.target.value)} className="h-10 w-12 rounded cursor-pointer border-none bg-transparent" />
                         <span className="text-xs text-slate-500 uppercase font-mono">{brandColor}</span>
                       </div>
                     </div>
                     <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Darkness ({overlayOpacity}%)</label>
                       <input type="range" min="0" max="95" value={overlayOpacity} onChange={(e) => setOverlayOpacity(Number(e.target.value))} className="w-full mt-3 accent-indigo-600" />
                     </div>
                   </div>

                   <div className="grid grid-cols-3 gap-2">
                     <div className="space-y-2 col-span-1">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Size</label>
                       <select value={headlineSize} onChange={(e) => setHeadlineSize(e.target.value)} className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs">
                         <option value="small">Small</option>
                         <option value="medium">Medium</option>
                         <option value="large">Large</option>
                       </select>
                     </div>
                     <div className="space-y-2 col-span-1">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Font</label>
                       <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs">
                         <option value="lishadhinata">Bengali</option>
                         <option value="sans">Sans-Serif</option>
                         <option value="serif">Serif</option>
                         <option value="mono">Mono</option>
                       </select>
                     </div>
                     <div className="space-y-2 col-span-1">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Align</label>
                       <div className="flex bg-slate-100 border border-slate-200 shadow-sm text-slate-700 rounded-lg p-1 h-10">
                         <button onClick={() => setTextAlign('left')} className={\`flex-1 flex justify-center items-center rounded-md \${textAlign === 'left' ? 'bg-white text-slate-900 shadow-sm' : ''}\`}><AlignLeft className="h-4 w-4" /></button>
                         <button onClick={() => setTextAlign('center')} className={\`flex-1 flex justify-center items-center rounded-md \${textAlign === 'center' ? 'bg-white text-slate-900 shadow-sm' : ''}\`}><AlignCenter className="h-4 w-4" /></button>
                         <button onClick={() => setTextAlign('right')} className={\`flex-1 flex justify-center items-center rounded-md \${textAlign === 'right' ? 'bg-white text-slate-900 shadow-sm' : ''}\`}><AlignRight className="h-4 w-4" /></button>
                       </div>
                     </div>
                   </div>
                 </div>
              </section>

              {/* SECTION: BRANDING & ADS */}
              <section className="space-y-5">
                 <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Star className="w-4 h-4 text-indigo-500" />
                    <h2 className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-900">Branding & Ads</h2>
                 </div>
                 
                 <div className="space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Logo Position</label>
                       <select value={logoPosition} onChange={(e) => setLogoPosition(e.target.value)} className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs">
                         <option value="top-left">Top Left</option>
                         <option value="top-right">Top Right</option>
                         <option value="bottom-left">Bottom Left</option>
                         <option value="bottom-right">Bottom Right</option>
                         <option value="hidden">Hidden</option>
                       </select>
                     </div>
                     <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1">Logo Size ({logoSize}px)</label>
                       <input type="range" min="16" max="64" value={logoSize} onChange={(e) => setLogoSize(Number(e.target.value))} className="w-full h-10 accent-indigo-600" />
                     </div>
                   </div>
                   
                   <div className="space-y-3">
                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2 cursor-pointer">
                       <input type="checkbox" checked={showWatermark} onChange={(e) => setShowWatermark(e.target.checked)} className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 w-4 h-4" />
                       Show Watermark Text
                     </label>
                     {showWatermark && (
                       <input type="text" value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} className="h-10 w-full rounded-lg border border-slate-200 px-3 text-xs" placeholder="e.g. www.khoborkey.com" />
                     )}
                   </div>

                   <div className="space-y-3 pt-4 border-t border-slate-100">
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Sponsorships (Optional)</label>
                     
                     <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                       <div className="space-y-2">
                         <label className="text-xs font-medium text-slate-700">Sponsor Text</label>
                         <input type="text" value={sponsorText} onChange={(e) => setSponsorText(e.target.value)} className="h-9 w-full rounded-md border border-slate-200 px-3 text-xs" placeholder="e.g. Sponsored by" />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-medium text-slate-700">Corner Sponsor Logo</label>
                         <div className="flex gap-2">
                           <Button variant="outline" size="sm" className="h-9 w-full text-xs" onClick={() => sponsorInputRef.current?.click()}>
                             <Upload className="h-3 w-3 mr-1" /> {sponsorLogo ? 'Change' : 'Upload'}
                           </Button>
                           {sponsorLogo && (
                             <Button variant="ghost" size="sm" className="h-9 px-2 text-red-500" onClick={() => setSponsorLogo("")}>Clear</Button>
                           )}
                           <input type="file" ref={sponsorInputRef} className="hidden" accept="image/*" onChange={handleSponsorUpload} />
                         </div>
                       </div>
                     </div>

                     <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                       <label className="text-xs font-medium text-slate-700 mb-2 block">Full-Width Bottom Banner Ad</label>
                       <div className="flex gap-2">
                         <Button variant="outline" size="sm" className="h-9 w-full text-xs" onClick={() => bottomAdInputRef.current?.click()}>
                           <Upload className="h-3 w-3 mr-1" /> {bottomAdUrl ? 'Change Banner' : 'Upload Long Banner Ad'}
                         </Button>
                         {bottomAdUrl && (
                           <Button variant="ghost" size="sm" className="h-9 px-3 text-red-500" onClick={() => setBottomAdUrl("")}>Clear Banner</Button>
                         )}
                         <input type="file" ref={bottomAdInputRef} className="hidden" accept="image/*" onChange={handleBottomAdUpload} />
                       </div>
                     </div>
                   </div>
                 </div>
              </section>

           </div>
        </div>
        
        `;

code = code.substring(0, sidebarStart) + cleanSidebar + code.substring(sidebarEnd);
fs.writeFileSync('src/app/page.tsx', code);
console.log("Success");
