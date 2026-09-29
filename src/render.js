import { searchBlob } from '../data/markets.js'

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function layout({ title, description, body, search = false }) {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="dark">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,560;9..144,680&family=Outfit:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>
    <a class="skip" href="#content">Skip to content</a>
    <header class="site-header">
      <nav class="container site-nav" aria-label="Site">
        <a class="brand" href="/">Lantern List</a>
        <span class="nav-note">Night markets worth staying out for</span>
      </nav>
    </header>
    <main id="content" class="container">
      ${body}
    </main>
    <footer class="container site-footer">
      <p>A field guide to night markets and night food streets. Photos via Unsplash. Styled with Pico CSS.</p>
    </footer>
    ${search ? '<script src="/main.js" defer></script>' : ''}
  </body>
</html>`
}

function countLabel({ shown, activeRegion, query, regionMiss, requestedRegion }) {
  const place = regionMiss ? requestedRegion : activeRegion
  const marketWord = shown === 1 ? 'market' : 'markets'
  if (!place && !query) return `${shown} night ${marketWord}`
  if (place && query) return `${shown} ${marketWord} in ${place} matching “${query}”`
  if (place) return `${shown} ${marketWord} in ${place}`
  return `${shown} ${marketWord} matching “${query}”`
}

function regionLinks({ regions, activeRegion, query }) {
  const querySuffix = query ? `&q=${encodeURIComponent(query)}` : ''
  const allHref = query ? `/?q=${encodeURIComponent(query)}` : '/'
  const allCurrent = activeRegion ? '' : ' aria-current="page"'
  const chips = regions
    .map((region) => {
      const current = region === activeRegion ? ' aria-current="page"' : ''
      const href = `/?region=${encodeURIComponent(region)}${querySuffix}`
      return `<a href="${href}"${current}>${escapeHtml(region)}</a>`
    })
    .join('')

  return `<nav class="filters" aria-label="Filter by region">
        <a href="${allHref}"${allCurrent}>All</a>
        ${chips}
      </nav>`
}

function marketCard(market, query) {
  const search = searchBlob(market)
  const hidden = query && !search.includes(query.toLowerCase()) ? ' hidden' : ''

  return `<a class="card" href="/markets/${encodeURIComponent(market.slug)}" data-search="${escapeHtml(search)}"${hidden}>
        <article>
          <div class="media">
            <img src="${escapeHtml(market.image)}" alt="${escapeHtml(market.imageAlt)}" width="1400" height="875">
            <span class="price">${escapeHtml(market.priceRange)}</span>
          </div>
          <p class="kicker">${escapeHtml(market.city)} · ${escapeHtml(market.region)}</p>
          <h2>${escapeHtml(market.name)}</h2>
          <p>${escapeHtml(market.specialty)}</p>
        </article>
      </a>`
}

export function renderHome({
  markets,
  regions,
  activeRegion,
  requestedRegion,
  regionMiss,
  query,
  total,
}) {
  const shown = markets.filter(
    (market) => !query || searchBlob(market).includes(query.toLowerCase()),
  ).length
  const label = countLabel({
    shown,
    activeRegion,
    query,
    regionMiss,
    requestedRegion,
  })

  const cards = markets.map((market) => marketCard(market, query)).join('')
  const empty = markets.length
    ? `<p id="empty" class="empty"${shown === 0 ? '' : ' hidden'}>Nothing on this page matches that search. Clear the box, or <a href="/">start over</a>.</p>`
    : `<p class="empty">Nothing matches. <a href="/">Clear filters</a> and browse all ${total} markets.</p>`

  const hiddenRegion = activeRegion
    ? `<input type="hidden" name="region" value="${escapeHtml(activeRegion)}">`
    : ''

  const body = `<section class="hero">
        <p class="kicker">Field guide</p>
        <h1>Lantern List</h1>
        <p class="lede">Eight night markets and night food streets. Each card shows the place, the snack to hunt down, and what the evening feels like. Open one for every detail.</p>
      </section>
      ${regionLinks({ regions, activeRegion, query })}
      <form class="search" action="/" method="get" role="search">
        ${hiddenRegion}
        <label for="q">Search markets
          <input id="q" type="search" name="q" value="${escapeHtml(query)}" placeholder="Try pepper bun, Seoul, lanterns…">
        </label>
      </form>
      <p id="count" class="count" data-region="${escapeHtml(activeRegion)}">${escapeHtml(label)}</p>
      ${empty}
      <section class="cards" aria-label="Night markets">
        ${cards}
      </section>`

  return layout({
    title: 'Lantern List',
    description: 'A field guide to night markets and night food streets in Taipei, Bangkok, Hong Kong, and Seoul.',
    body,
    search: true,
  })
}

function fact(label, value) {
  return `<div>
        <dt>${escapeHtml(label)}</dt>
        <dd>${escapeHtml(value)}</dd>
      </div>`
}

export function renderDetail(market) {
  const route = `/markets/${market.slug}`
  const body = `<p class="back"><a href="/">← All markets</a></p>
      <article class="detail">
        <div class="detail-layout">
          <img src="${escapeHtml(market.image)}" alt="${escapeHtml(market.imageAlt)}" width="1400" height="875">
          <div>
            <p class="kicker">${escapeHtml(market.city)} · ${escapeHtml(market.region)}</p>
            <h1>${escapeHtml(market.name)}</h1>
            <p class="lede">${escapeHtml(market.description)}</p>
            <p class="route">Unique URL: <a href="${escapeHtml(route)}"><code>${escapeHtml(route)}</code></a></p>
          </div>
        </div>
        <h2>All details</h2>
        <dl class="facts">
          ${fact('Name', market.name)}
          ${fact('City', market.city)}
          ${fact('Region', market.region)}
          ${fact('Specialty', market.specialty)}
          ${fact('Hours', market.hours)}
          ${fact('Price range', market.priceRange)}
          ${fact('Best for', market.bestFor)}
          ${fact('Vibe', market.vibe)}
          ${fact('Description', market.description)}
          ${fact('Photo', market.image)}
          ${fact('Photo description', market.imageAlt)}
          ${fact('Photo credit', market.photoCredit)}
          ${fact('Slug', market.slug)}
        </dl>
      </article>`

  return layout({
    title: `${market.name} · Lantern List`,
    description: `${market.name} in ${market.city}: ${market.specialty}.`,
    body,
  })
}

export function renderNotFound(path) {
  const body = `<section class="missing">
        <p class="kicker">404</p>
        <h1>This stall closed early</h1>
        <p>No page is served for <code>${escapeHtml(path)}</code>. The route does not match the list or a market.</p>
        <a href="/" role="button">Back to Lantern List</a>
      </section>`

  return layout({
    title: 'Page not found · Lantern List',
    description: 'That route does not match a page on Lantern List.',
    body,
  })
}
