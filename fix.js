import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/rgba\(80,\s*60,\s*130,\s*0\.3\)/g, 'rgba(80,60,130,0.7)');
code = code.replace(/rgba\(80,\s*60,\s*130,\s*0\.35\)/g, 'rgba(80,60,130,0.75)');
code = code.replace(/rgba\(80,\s*60,\s*130,\s*0\.38\)/g, 'rgba(80,60,130,0.78)');
code = code.replace(/rgba\(80,\s*60,\s*130,\s*0\.4\)/g, 'rgba(80,60,130,0.8)');
code = code.replace(/rgba\(80,\s*60,\s*130,\s*0\.45\)/g, 'rgba(80,60,130,0.85)');
code = code.replace(/rgba\(80,\s*60,\s*130,\s*0\.5\)/g, 'rgba(80,60,130,0.9)');

code = code.replace(/rgba\(60,\s*40,\s*100,\s*0\.35\)/g, 'rgba(60,40,100,0.75)');
code = code.replace(/rgba\(60,\s*40,\s*100,\s*0\.4\)/g, 'rgba(60,40,100,0.8)');
code = code.replace(/rgba\(60,\s*40,\s*100,\s*0\.45\)/g, 'rgba(60,40,100,0.85)');
code = code.replace(/rgba\(60,\s*40,\s*100,\s*0\.5\)/g, 'rgba(60,40,100,0.9)');
code = code.replace(/rgba\(60,\s*40,\s*100,\s*0\.55\)/g, 'rgba(60,40,100,0.9)');
code = code.replace(/rgba\(60,\s*40,\s*100,\s*0\.6\)/g, 'rgba(60,40,100,0.95)');
code = code.replace(/rgba\(60,\s*40,\s*100,\s*0\.65\)/g, 'rgba(60,40,100,0.95)');

fs.writeFileSync('src/App.tsx', code);
