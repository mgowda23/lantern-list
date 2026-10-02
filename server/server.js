import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import marketsRouter from './routes/markets.js'

const app = express()
const PORT = process.env.PORT || 3001
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const clientDist = path.join(__dirname, '..', 'client', 'dist')

app.use((req, res, next) => {
  if (req.path.length > 1 && req.path.endsWith('/')) {
    const query = req.url.slice(req.path.length)
    res.redirect(301, req.path.slice(0, -1) + query)
    return
  }
  next()
})

app.use(express.json())

app.use('/api/markets', marketsRouter)

app.get('/', (req, res, next) => {
  if (fs.existsSync(path.join(clientDist, 'index.html'))) {
    next()
    return
  }
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Lantern List API</h1>')
})

if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist))
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      next()
      return
    }
    res.sendFile(path.join(clientDist, 'index.html'))
  })
}

app.use((req, res) => res.status(404).json({ error: 'Route not found' }))

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
