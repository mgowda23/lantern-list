const markets = [
  {
    slug: 'raohe',
    name: 'Raohe Street Night Market',
    city: 'Taipei',
    region: 'Taiwan',
    specialty: 'Pepper buns',
    hours: 'Around 5 p.m. until midnight',
    priceRange: '$',
    bestFor: 'One famous snack and a single walkable street',
    vibe: 'A lit-up gate, a temple behind it, and a line that moves',
    description:
      'The gate does the inviting: rows of bulbs, lanterns, and a crowd already deciding what to eat. Raohe is one street, which makes it easy to do properly. Start with the pepper bun from the stall with the line, then walk the rest for herb soup, oyster vermicelli, or a custard tart. Cash is simpler than a card, and an earlier arrival means less shuffling.',
    image: '/images/raohe.jpg',
    imageAlt:
      'The illuminated gate of Raohe Street Night Market at night, with lanterns and people gathered outside.',
    photoCredit: 'Unsplash',
  },
  {
    slug: 'ningxia',
    name: 'Ningxia Night Market',
    city: 'Taipei',
    region: 'Taiwan',
    specialty: 'Oyster omelets and shaved ice',
    hours: 'Evening through late night',
    priceRange: '$',
    bestFor: 'Eating where the neighborhood eats',
    vibe: 'Tight aisles, scooters at the curb, cooking at eye level',
    description:
      'Ningxia is the night market people suggest when they want you to skip the biggest one. Stalls sit close together, orders happen at the counter, and the best clue is whatever the person beside you is already eating. An oyster omelet, a sausage wrapped in sticky rice, or a bowl of shaved ice will cover the greatest hits. You can eat your way across it in about an hour.',
    image: '/images/ningxia.jpg',
    imageAlt:
      'Night food stalls at Ningxia Night Market, with scooters parked beside customers at the counters.',
    photoCredit: 'Unsplash',
  },
  {
    slug: 'linjiang',
    name: 'Linjiang Street Night Market',
    city: 'Taipei',
    region: 'Taiwan',
    specialty: 'Peanut brittle and after-work snacks',
    hours: 'Evening until around midnight',
    priceRange: '$$',
    bestFor: 'A market that still feels like a neighborhood',
    vibe: 'Red lanterns overhead and a crowd coming from work',
    description:
      'Linjiang Street Night Market, still called Tonghua by plenty of locals, sits in Da\'an and feeds the blocks around it after work. Red lanterns run the length of the lane. Peanut brittle is the thing to carry home. Dinner is whatever is crackling at the stall in front of you. It feels less like a sightseeing stop and more like a street that decided to stay open.',
    image: '/images/linjiang.jpg',
    imageAlt:
      'A crowd under a row of red lanterns at a Taipei night market, passing a peanut-candy stall.',
    photoCredit: 'Unsplash',
  },
  {
    slug: 'yaowarat',
    name: 'Yaowarat Road',
    city: 'Bangkok',
    region: 'Thailand',
    specialty: 'Seafood and oyster omelets',
    hours: 'The street gets serious after sunset',
    priceRange: '$',
    bestFor: 'Eating standing up',
    vibe: 'Wet asphalt, neon, and a row of tuk-tuks',
    description:
      'Bangkok\'s Chinatown does not bother being a formal market. After dark, Yaowarat Road itself is the dining room. Neon doubles on the wet street, tuk-tuks wait at the curb, and seafood hits the wok in front of you. Order the oyster omelet, the crab, or fruit cut onto a stick. You will eat standing. You will not mind.',
    image: '/images/yaowarat.jpg',
    imageAlt:
      'Tuk-tuks parked on a rainy neon street in Bangkok at night, with food stalls along the sidewalk.',
    photoCredit: 'Unsplash',
  },
  {
    slug: 'sukhumvit',
    name: 'Sukhumvit Night Market',
    city: 'Bangkok',
    region: 'Thailand',
    specialty: 'Skewers and street sweets',
    hours: 'After dark',
    priceRange: '$$',
    bestFor: 'Grazing between other plans',
    vibe: 'String lights, scooters, and a roof over the alley',
    description:
      'Near Nana, a covered alley off Sukhumvit turns into a night market once the sun drops. There is no single stall you have to hunt. The point is a skewer, a sweet, and a cold drink, then back out onto the main road. The pavement stays shiny. The colored lights do the rest of the work.',
    image: '/images/sukhumvit.jpg',
    imageAlt:
      'A covered night-market alley in Bangkok strung with colored lights, the wet pavement reflecting the signs.',
    photoCredit: 'Unsplash',
  },
  {
    slug: 'temple-street',
    name: 'Temple Street Night Market',
    city: 'Jordan',
    region: 'Hong Kong',
    specialty: 'Claypot rice, egg waffles, and seafood',
    hours: 'Afternoon into the night; the market people mean starts after dusk',
    priceRange: '$$',
    bestFor: 'Lanterns, fortune-tellers, and a late dinner',
    vibe: 'A Kowloon lane under a ceiling of lanterns',
    description:
      'Temple Street in Jordan is the night market people picture when they picture Hong Kong. Stalls fill the lane, fortune-tellers take the side streets, and lanterns turn the sky into part of the decoration. Come hungry for claypot rice, an egg waffle, or seafood from the ice. The street is already busy in the afternoon. It becomes the market after dark.',
    image: '/images/temple-street.jpg',
    imageAlt:
      'A crowded Hong Kong night market under dozens of red and purple lanterns, with food stalls on both sides.',
    photoCredit: 'Unsplash',
  },
  {
    slug: 'mong-kok',
    name: 'Mong Kok Night Streets',
    city: 'Mong Kok',
    region: 'Hong Kong',
    specialty: 'Egg waffles and curry fish balls',
    hours: 'Late afternoon until late',
    priceRange: '$',
    bestFor: 'Looking up as much as looking at the food',
    vibe: 'Stacked neon, crowded sidewalks, and snacks you can carry',
    description:
      'Mong Kok stays loud after the shops could have closed. Neon signs climb the facades, and the sidewalks belong to people eating as they walk: egg waffles, curry fish balls, siu mai from a steam tray. Ladies\' Market is the stall stretch. The rest of the neighborhood is the show. Give the signs as much attention as the menu.',
    image: '/images/mong-kok.jpg',
    imageAlt:
      'A neon-signed street in Mong Kok at night, with pedestrians on the sidewalk and traffic below.',
    photoCredit: 'Unsplash',
  },
  {
    slug: 'myeongdong',
    name: 'Myeongdong',
    city: 'Seoul',
    region: 'South Korea',
    specialty: 'Hotteok, skewers, and snacks you can carry',
    hours: 'Dusk through the evening',
    priceRange: '$$',
    bestFor: 'A night out that happens to be edible',
    vibe: 'Signs brighter than the sky, and food on the pavement',
    description:
      'Myeongdong is a shopping district that spills street food onto the pavement. By dusk the signs outshine the sky, and the snacks are the reason to stop moving: hotteok, skewers, anything fried on a stick. It is not a traditional market hall. It is a walk you take slowly, because something is always being cooked at the next corner.',
    image: '/images/myeongdong.jpg',
    imageAlt: 'A neon shopping street in Seoul at dusk, lined with Korean signs.',
    photoCredit: 'Unsplash',
  },
]

export const regions = [...new Set(markets.map((market) => market.region))]

export function findRegion(input) {
  if (!input) return ''
  return regions.find((region) => region.toLowerCase() === input.toLowerCase()) || ''
}

export function searchBlob(market) {
  return [
    market.name,
    market.city,
    market.region,
    market.specialty,
    market.vibe,
    market.bestFor,
    market.description,
  ]
    .join(' ')
    .toLowerCase()
}

export function filterMarkets({ region, query }) {
  const needle = query.toLowerCase()
  return markets.filter((market) => {
    const regionOk = !region || market.region.toLowerCase() === region.toLowerCase()
    const queryOk = !needle || searchBlob(market).includes(needle)
    return regionOk && queryOk
  })
}

export { markets }
