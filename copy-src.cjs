const fs = require('fs');
const path = require('path');

function copyDirStructure(srcDir, destDir) {
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'pages') { // we don't want to copy pages directory blindly and overwrite
         copyDirStructure(srcPath, destPath);
      }
    } else {
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}
copyDirStructure('temp-clone/src', 'src');
