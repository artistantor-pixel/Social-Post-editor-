const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// The file currently ends with:
// 911:     </div>
// 912:       {/* INFORMATIVE FOOTER */}
// ...
// 973:       </footer>
// 974:   );
// 975: }

// I will replace `    </div>\n      {/* INFORMATIVE FOOTER */}` with `      {/* INFORMATIVE FOOTER */}`
// And I will replace `      </footer>\n  );\n}` with `      </footer>\n    </div>\n  );\n}`

code = code.replace(/    <\/div>\n      \{\/\* INFORMATIVE FOOTER \*\/\}/g, '      {/* INFORMATIVE FOOTER */}');
code = code.replace(/      <\/footer>\n  \);\n}/g, '      </footer>\n    </div>\n  );\n}');

fs.writeFileSync('src/app/page.tsx', code);
console.log("Footer JSX fixed!");
