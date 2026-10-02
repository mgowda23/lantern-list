export const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;')

export function countLabel({ shown, region, query }) {
  const noun = shown === 1 ? 'market' : 'markets'
  if (region && query) return `${shown} ${noun} in ${region} matching “${query}”`
  if (region) return `${shown} ${noun} in ${region}`
  if (query) return `${shown} ${noun} matching “${query}”`
  return `${shown} night ${noun}`
}