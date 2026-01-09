const fs = require('fs')
const path = require('path')

const targets = ['pages', path.join('src', 'pages')]

for (const target of targets) {
  const targetPath = path.join(process.cwd(), target)
  if (fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true })
  }
}
