const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Change outer wrapper padding
const outerWrapperOld = '<div className="h-screen flex flex-col bg-[#eef2f6] font-sans text-slate-900 selection:bg-indigo-200 selection:text-indigo-900 overflow-hidden relative">';
const outerWrapperNew = '<div className="h-screen flex flex-col bg-[#eef2f6] font-sans text-slate-900 selection:bg-indigo-200 selection:text-indigo-900 overflow-hidden relative p-0 sm:p-4 md:p-6 lg:p-8">';
code = code.replace(outerWrapperOld, outerWrapperNew);

// 2. Insert Boxed Container
const blobsEnd = '<div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-blue-300/30 blur-[120px] pointer-events-none" />';
const blobsNew = blobsEnd + '\n      \n      {/* Boxed App Container */}\n      <div className="max-w-[1600px] mx-auto w-full h-full flex flex-col bg-white/20 backdrop-blur-2xl sm:rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.04)] ring-1 ring-white/60 overflow-hidden relative z-10">';
code = code.replace(blobsEnd, blobsNew);

// 3. Add closing div at the end
const closingTagsOld = `          </div> {/* End Preview Glass Box */}
          
        </div>
            </div>
    </div>
    </div>
  );
}`;
const closingTagsNew = `          </div> {/* End Preview Glass Box */}
          
        </div>
            </div>
    </div>
      </div>
    </div>
  );
}`;
code = code.replace(closingTagsOld, closingTagsNew);

fs.writeFileSync('src/app/page.tsx', code);
console.log("Box width applied!");
