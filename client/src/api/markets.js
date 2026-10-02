export async function getMarkets(search = '') {
  const response = await fetch(`/api/markets${search}`)
  if (!response.ok) throw new Error('Unable to load markets')
  return response.json()
}

export async function getMarket(slug) {
  const response = await fetch(`/api/markets/${encodeURIComponent(slug)}`)
  if (!response.ok) return null
  return response.json()
}