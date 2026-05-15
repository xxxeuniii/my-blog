import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const docsRoot = path.resolve(__dirname, '..', 'docs')

function countArticles(dir) {
  let count = 0
  try {
    const files = fs.readdirSync(dir, { withFileTypes: true })
    for (const file of files) {
      const fullPath = path.resolve(dir, file.name)
      if (file.isDirectory()) {
        if (file.name !== '.vitepress') {
          count += countArticles(fullPath)
        }
      } else if (file.name.endsWith('.md') && file.name !== 'README.md') {
        count++
      }
    }
  } catch (err) {
    // ignore
  }
  return count
}

function countFolders(dir) {
  let count = 0
  try {
    const files = fs.readdirSync(dir, { withFileTypes: true })
    for (const file of files) {
      if (file.isDirectory() && file.name !== '.vitepress' && file.name !== 'public') {
        count++
      }
    }
  } catch (err) {
    // ignore
  }
  return count
}

const totalArticles = countArticles(docsRoot)
const totalCategories = countFolders(docsRoot)

console.log(`Total articles: ${totalArticles}`)
console.log(`Total categories: ${totalCategories}`)

// Update index.md
const indexPath = path.resolve(docsRoot, 'index.md')
let content = fs.readFileSync(indexPath, 'utf-8')

content = content.replace(
  /<span class="stat-number">\d+<\/span>/,
  `<span class="stat-number">${totalArticles}</span>`
)
content = content.replace(
  /<span class="stat-number">\d+<\/span>\s*<span class="stat-label">技术分类<\/span>/,
  `<span class="stat-number">${totalCategories}</span>\n        <span class="stat-label">技术分类</span>`
)

fs.writeFileSync(indexPath, content, 'utf-8')
console.log('Updated index.md with new stats')
