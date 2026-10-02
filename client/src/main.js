import './css/styles.css'
import { getMarket, getMarkets } from './api/markets.js'
import { countLabel, escapeHtml } from './render.js'

const app = document.querySelector('#content')

function renderHome({ markets, regions, activeRegion, query, total }) {
  const count = countLabel({ shown: markets.length, region: activeRegion, query })
  const regionLinks = ['All', ...regions].map((region) => {
    const isAll = region === 'All'
    const current = isAll ? !activeRegion : region === activeRegion
    const params = new URLSearchParams()
    if (!isAll) params.set('region', region)
    if (query) params.set('q', query)
    const queryString = params.toString()
    const href = queryString ? `/?${queryString}` : '/'
    return `<a href="${href}"${current ? ' aria-current="page"' : ''}>${escapeHtml(region)}</a>`
  }).join('')

  const cards = markets.map((market) => `<a class="card" href="/markets/${encodeURIComponent(market.slug)}">
    <article>
      <div class="media"><img src="${escapeHtml(market.image)}" alt="${escapeHtml(market.imageAlt)}" width="1400" height="875"><span class="price">${escapeHtml(market.priceRange)}</span></div>
      <p class="kicker">${escapeHtml(market.city)} · ${escapeHtml(market.region)}</p>
      <h2>${escapeHtml(market.name)}</h2>
      <p>${escapeHtml(market.specialty)}</p>
    </article>
  </a>`).join('')

  app.innerHTML = `<section class="hero"><p class="kicker">Field guide</p><h1>Lantern List</h1><p class="lede">Eight night markets and night food streets. Each card shows the place, the snack to hunt down, and what the evening feels like.</p></section>
    <nav class="filters" aria-label="Filter by region">${regionLinks}</nav>
    <form class="search" id="search-form" role="search"><label for="q">Search markets<input id="q" type="search" value="${escapeHtml(query)}" placeholder="Try pepper bun, Seoul, lanterns…"></label></form>
    <p class="count">${escapeHtml(count)}</p>
    ${markets.length ? `<section class="cards" aria-label="Night markets">${cards}</section>` : `<p class="empty">Nothing matches. <a href="/">Clear filters</a> and browse all ${total} markets.</p>`}`

  document.querySelector('#search-form').addEventListener('submit', (event) => {
    event.preventDefault()
    const params = new URLSearchParams(location.search)
    const value = document.querySelector('#q').value.trim()
    if (value) params.set('q', value)
    else params.delete('q')
    const queryString = params.toString()
    history.pushState({}, '', queryString ? `/?${queryString}` : '/')
    loadHome()
  })
}

async function loadHome() {
  renderHome(await getMarkets(location.search))
}

async function loadDetail(slug) {
  const market = await getMarket(slug)
  if (!market) {
    renderMissing(location.pathname)
    return
  }
  const facts = [['Name', market.name], ['City', market.city], ['Region', market.region], ['Specialty', market.specialty], ['Hours', market.hours], ['Price range', market.priceRange], ['Best for', market.bestFor], ['Vibe', market.vibe], ['Description', market.description]]
  app.innerHTML = `<p class="back"><a href="/">← All markets</a></p><article class="detail"><div class="detail-layout"><img src="${escapeHtml(market.image)}" alt="${escapeHtml(market.imageAlt)}" width="1400" height="875"><div><p class="kicker">${escapeHtml(market.city)} · ${escapeHtml(market.region)}</p><h1>${escapeHtml(market.name)}</h1><p class="lede">${escapeHtml(market.description)}</p></div></div><h2>All details</h2><dl class="facts">${facts.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('')}</dl></article>`
}

function renderMissing(route) {
  app.innerHTML = `<section class="missing"><p class="kicker">404</p><h1>That lantern is out.</h1><p>There is no market or page at <code>${escapeHtml(route)}</code>.</p><p class="route"><a href="/">Return to the market list</a></p></section>`
}

async function render() {
  try {
    const match = location.pathname.match(/^\/markets\/([^/]+)\/?$/)
    if (match) await loadDetail(match[1])
    else if (location.pathname === '/' || location.pathname === '') await loadHome()
    else renderMissing(location.pathname)
  } catch {
    renderMissing(location.pathname)
  }
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('a')
  if (!link || link.origin !== location.origin || link.target === '_blank') return
  event.preventDefault()
  history.pushState({}, '', link.href)
  render()
})
window.addEventListener('popstate', render)
render()