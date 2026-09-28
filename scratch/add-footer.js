const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const footerJSX = `      {/* INFORMATIVE FOOTER */}
      <footer className="w-full mt-12 md:mt-24 pb-8 pt-12 md:pt-16 border-t border-white/40 bg-white/30 backdrop-blur-3xl px-4 md:px-8 relative z-10 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Info */}
          <div className="flex flex-col col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-md flex items-center justify-center">
                <LayoutTemplate className="h-4 w-4 text-white" />
              </div>
              <h1 className="font-extrabold text-xl tracking-tight text-slate-900 leading-none flex items-center gap-1">
                Khobor<span className="text-indigo-600">Key</span>
              </h1>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-[280px] font-medium">
              The ultimate professional social media poster and news graphics generator for journalists, creators, and media houses.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="font-bold text-slate-900 mb-5 tracking-wider text-xs uppercase flex items-center gap-2"><Sparkles className="w-3 h-3 text-indigo-500"/> Studio</h3>
            <ul className="space-y-3.5 text-sm font-semibold text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors flex items-center gap-2">Create Poster</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors flex items-center gap-2">Template Gallery</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors flex items-center gap-2">My Projects</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors flex items-center gap-2">Pricing & Pro <span className="bg-indigo-100 text-indigo-600 text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-widest font-black">New</span></a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col">
            <h3 className="font-bold text-slate-900 mb-5 tracking-wider text-xs uppercase">Resources</h3>
            <ul className="space-y-3.5 text-sm font-semibold text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Design Tutorials</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Blog & Updates</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">API Documentation</a></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="flex flex-col">
            <h3 className="font-bold text-slate-900 mb-5 tracking-wider text-xs uppercase">Company</h3>
            <ul className="space-y-3.5 text-sm font-semibold text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-[1400px] mx-auto mt-12 md:mt-16 pt-6 md:pt-8 border-t border-slate-300/40 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-bold tracking-wide text-slate-400">
          <p>© {new Date().getFullYear()} KhoborKey Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-indigo-600 transition-colors uppercase">Twitter</a>
            <a href="#" className="hover:text-indigo-600 transition-colors uppercase">Facebook</a>
            <a href="#" className="hover:text-indigo-600 transition-colors uppercase">Instagram</a>
          </div>
        </div>
      </footer>`;

const replacementString = `    </div>
      </div>
    </div>
${footerJSX}
  );
}`;

// Use lastIndexOf to find the final "    </div>\n      </div>\n    </div>\n  );\n}"
const targetSuffix = "    </div>\n      </div>\n    </div>\n  );\n}";
const index = code.lastIndexOf(targetSuffix);

if (index !== -1) {
  code = code.substring(0, index) + replacementString;
  fs.writeFileSync('src/app/page.tsx', code);
  console.log("Footer added successfully!");
} else {
  console.log("Could not find the target suffix.");
  // Try fallback logic
  const fallbackSuffix = "    </div>\n      </div>\n    </div>\n  );\n}\n";
  const index2 = code.lastIndexOf(fallbackSuffix);
  if (index2 !== -1) {
    code = code.substring(0, index2) + replacementString + "\n";
    fs.writeFileSync('src/app/page.tsx', code);
    console.log("Footer added successfully with fallback!");
  }
}
