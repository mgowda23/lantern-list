import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { filterMarkets, findRegion, markets, regions } from './data/markets.js'
import { renderDetail, renderHome, renderNotFound } from './src/render.js'

const app = express()
const PORT = process.env.PORT || 3000
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use((req, res, next) => {
  if (req.path.length > 1 && req.path.endsWith('/')) {
    const query = req.url.slice(req.path.length)
    res.redirect(301, req.path.slice(0, -1) + query)
    return
  }
  next()
})

app.use(express.static(path.join(__dirname, 'public')))

function readParam(value) {
  const raw = Array.isArray(value) ? value[0] : value
  if (typeof raw !== 'string') return ''
  return raw.trim().slice(0, 80)
}

app.get('/', (req, res) => {
  const requestedRegion = readParam(req.query.region)
  const query = readParam(req.query.q)
  const activeRegion = findRegion(requestedRegion)
  const regionMiss = Boolean(requestedRegion) && !activeRegion
  const list = regionMiss ? [] : filterMarkets({ region: activeRegion, query: '' })

  res.status(200).send(
    renderHome({
      markets: list,
      regions,
      activeRegion,
      requestedRegion,
      regionMiss,
      query,
      total: markets.length,
    }),
  )
})

app.get('/markets/:slug', (req, res) => {
  const market = markets.find((item) => item.slug === req.params.slug)
  if (!market) {
    res.status(404).send(renderNotFound(req.path))
    return
  }
  res.status(200).send(renderDetail(market))
})

app.use((req, res) => {
  res.status(404).send(renderNotFound(req.path))
})

app.listen(PORT, () => {
  console.log(`Lantern List is running at http://localhost:${PORT}`)
})
