import { Router } from 'express'
import { filterMarkets, findRegion, markets, regions } from '../config/db.js'

const router = Router()

function readParam(value) {
  const raw = Array.isArray(value) ? value[0] : value
  if (typeof raw !== 'string') return ''
  return raw.trim().slice(0, 80)
}

router.get('/', (req, res) => {
  const requestedRegion = readParam(req.query.region)
  const query = readParam(req.query.q)
  const activeRegion = findRegion(requestedRegion)

  res.json({
    markets: activeRegion || !requestedRegion ? filterMarkets({ region: activeRegion, query }) : [],
    regions,
    total: markets.length,
    activeRegion,
    requestedRegion,
    query,
  })
})

router.get('/:slug', (req, res) => {
  const market = markets.find((item) => item.slug === req.params.slug)
  if (!market) {
    res.status(404).json({ error: 'Market not found' })
    return
  }
  res.json(market)
})

export default router