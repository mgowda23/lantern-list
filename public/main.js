const input = document.querySelector('#q')
const cards = [...document.querySelectorAll('.card')]
const count = document.querySelector('#count')
const empty = document.querySelector('#empty')

if (input && cards.length > 0) {
  const apply = () => {
    const query = input.value.trim().toLowerCase()
    let shown = 0

    for (const card of cards) {
      const match = card.dataset.search.includes(query)
      card.hidden = !match
      if (match) shown += 1
    }

    if (count) {
      const noun = shown === 1 ? 'market' : 'markets'
      const region = count.dataset.region
      const typed = input.value.trim()
      if (region && query) count.textContent = `${shown} ${noun} in ${region} matching “${typed}”`
      else if (region) count.textContent = `${shown} ${noun} in ${region}`
      else if (query) count.textContent = `${shown} ${noun} matching “${typed}”`
      else count.textContent = `${shown} night ${noun}`
    }

    if (empty) empty.hidden = shown !== 0
  }

  input.addEventListener('input', apply)
}
