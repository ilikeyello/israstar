const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Run babel
try {
  execSync('npx babel src --out-dir dist/src --presets=@babel/preset-react', { stdio: 'inherit' });
  execSync('npx babel admin --out-dir dist/admin --presets=@babel/preset-react', { stdio: 'inherit' });
} catch (e) {
  console.error('Babel build failed');
  process.exit(1);
}

// Copy files
const copyFile = (src, dest) => {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
};

copyFile('index.html', 'dist/index.html');
copyFile('admin.html', 'dist/admin.html');
copyFile('styles.css', 'dist/styles.css');
copyFile('admin-styles.css', 'dist/admin-styles.css');

// Copy assets if exists
if (fs.existsSync('assets')) {
  if (!fs.existsSync('dist/assets')) fs.mkdirSync('dist/assets');
  fs.readdirSync('assets').forEach(file => {
    copyFile(path.join('assets', file), path.join('dist/assets', file));
  });
}

// Modify HTML files
const updateHtml = (file) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\.jsx/g, '.js');
    content = content.replace(/type="text\/babel"/g, '');
    content = content.split('\n').filter(line => !line.includes('babel.min.js')).join('\n');
    fs.writeFileSync(file, content);
  }
};

updateHtml('dist/index.html');
updateHtml('dist/admin.html');

console.log('Build complete');
