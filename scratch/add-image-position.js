const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Add state
code = code.replace(
  'const [bgImageUrl, setBgImageUrl] = useState("https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1200");',
  'const [bgImageUrl, setBgImageUrl] = useState("https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1200");\n  const [bgPosition, setBgPosition] = useState("center");'
);

// 2. Replace backgroundPosition in standard styles
code = code.replace(
  /backgroundPosition: 'center'/g,
  "backgroundPosition: bgPosition"
);

// 3. Add UI Dropdown
const targetUI = `                     </div>
                    </div>
                  </div>
              </section>

              {/* SECTION: DESIGN */}`;

const replaceUI = `                     </div>
                      
                      <div className="pt-3 border-t border-slate-100/50 mt-3">
                        <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Image Position</label>
                        <select value={bgPosition} onChange={(e) => setBgPosition(e.target.value)} className="h-9 w-full rounded-lg border border-white/60 bg-white/50 backdrop-blur-md hover:bg-white/70 shadow-sm px-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30">
                          <option value="center">Center</option>
                          <option value="top">Top</option>
                          <option value="bottom">Bottom</option>
                          <option value="left">Left</option>
                          <option value="right">Right</option>
                          <option value="top center">Top Center</option>
                          <option value="bottom center">Bottom Center</option>
                        </select>
                      </div>
                    </div>
                  </div>
              </section>

              {/* SECTION: DESIGN */}`;

code = code.replace(targetUI, replaceUI);

fs.writeFileSync('src/app/page.tsx', code);
console.log("Image position option added!");
