const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// I will look for the exact line containing "Describe the image you want..."
// Then I will append the UI right after the closing divs
const targetPattern = /<textarea value=\{aiPrompt\}.*?<\/Button>\s*<\/div>\s*\)\}\s*<\/div>/s;

const newBlock = `
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      {/* Image Position Settings */}
                      <div className="pt-3 border-t border-white/50 mt-3">
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
`;

code = code.replace(/<\/Button>\s*<\/div>\s*\)\}\s*<\/div>/s, newBlock);

fs.writeFileSync('src/app/page.tsx', code);
console.log("UI successfully appended");
