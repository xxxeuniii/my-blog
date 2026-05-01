import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const docsRoot = path.resolve(__dirname, '../docs')
const outputPath = path.resolve(docsRoot, '.vitepress/stats.json')

function parseDateFromFileName(filename) {
  const basename = filename.replace('.md', '')
  const datePattern = /(\d{4})(\d{2})(\d{2})/
  const match = basename.match(datePattern)
  if (match) {
    const year = match[1]
    const month = match[2]
    const day = match[3]
    return new Date(`${year}-${month}-${day}`)
  }
  return null
}

function scanMarkdownFiles(dir, relativePath = '') {
  const files = []
  
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name)
      const itemRelativePath = relativePath ? `${relativePath}/${item.name}` : item.name
      
      if (item.isDirectory()) {
        if (item.name.startsWith('.')) continue
        files.push(...scanMarkdownFiles(fullPath, itemRelativePath))
      } else if (item.isFile() && item.name.endsWith('.md') && item.name !== 'index.md' && item.name !== 'README.md' && item.name !== 'categories.md' && item.name !== 'articles.md' && item.name !== 'projects.md') {
        const stats = fs.statSync(fullPath)
        let createdAt = stats.birthtime
        const parsedDate = parseDateFromFileName(item.name)
        if (parsedDate) {
          createdAt = parsedDate
        }
        files.push({
          path: itemRelativePath,
          dir: relativePath.split('/')[0] || 'root',
          name: item.name,
          title: item.name.replace('.md', ''),
          createdAt: createdAt,
          modifiedAt: stats.mtime,
        })
      }
    }
  } catch (e) {
    console.error('Error scanning directory:', dir, e)
  }
  
  return files
}

function generateStats() {
  const files = scanMarkdownFiles(docsRoot)
  
  const stats = {
    total: files.length,
    byDirectory: {},
    byYear: {},
    generatedAt: new Date().toISOString(),
  }
  
  files.forEach(file => {
    const dir = file.dir
    if (!stats.byDirectory[dir]) {
      stats.byDirectory[dir] = { count: 0, files: [] }
    }
    stats.byDirectory[dir].count++
    stats.byDirectory[dir].files.push({
      title: file.title,
      path: file.path,
      createdAt: file.createdAt,
    })
    
    const year = file.createdAt.getFullYear().toString()
    if (!stats.byYear[year]) {
      stats.byYear[year] = { count: 0, files: [] }
    }
    stats.byYear[year].count++
    stats.byYear[year].files.push({
      title: file.title,
      path: file.path,
      dir: file.dir,
    })
  })
  
  const years = Object.keys(stats.byYear).sort((a, b) => parseInt(b) - parseInt(a))
  const sortedByYear = {}
  years.forEach(year => {
    sortedByYear[year] = stats.byYear[year]
  })
  stats.byYear = sortedByYear
  
  const dirs = Object.keys(stats.byDirectory).sort()
  const sortedByDir = {}
  dirs.forEach(dir => {
    sortedByDir[dir] = stats.byDirectory[dir]
  })
  stats.byDirectory = sortedByDir
  
  fs.writeFileSync(outputPath, JSON.stringify(stats, null, 2), 'utf8')
  console.log(`✅ Generated stats for ${files.length} files`)
  console.log(`📊 Statistics saved to ${outputPath}`)
}

generateStats()
