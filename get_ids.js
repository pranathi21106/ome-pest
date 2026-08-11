const fs = require('fs');

async function searchUnsplash(query) {
  try {
    const url = `https://unsplash.com/s/photos/${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html'
      }
    });
    if (!response.ok) {
      console.log(`Failed to fetch ${query}: ${response.status}`);
      return [];
    }
    const html = await response.text();
    // Unsplash photo URLs are in format "/photos/some-slug-ID"
    // Let's use regex to find all matches of href="/photos/[^"]+"
    const regex = /\/photos\/([a-zA-Z0-9_-]+)/g;
    const matches = new Set();
    let match;
    while ((match = regex.exec(html)) !== null) {
      const fullId = match[1];
      // The ID is the last part after the last dash
      const parts = fullId.split('-');
      const id = parts[parts.length - 1];
      if (id && id.length >= 5 && id.length <= 15) {
        matches.add(id);
      }
    }
    return Array.from(matches).slice(0, 10);
  } catch (error) {
    console.error(`Error searching for ${query}:`, error);
    return [];
  }
}

async function main() {
  const queries = {
    termite: 'termite-damage',
    cockroach: 'cockroach',
    rodent: 'mouse-rat',
    mosquito: 'mosquito',
    bedbug: 'bedbug',
    woodborer: 'wood-worm',
    spider: 'spider-web',
    bird: 'pigeon-bird',
    fly: 'housefly',
    snake: 'snake',
    foodpest: 'weevil-beetle',
    disinfection: 'disinfection-spray',
    audit: 'inspector-pest'
  };

  const results = {};
  for (const [key, query] of Object.entries(queries)) {
    console.log(`Searching for ${key}...`);
    results[key] = await searchUnsplash(query);
    console.log(`Results for ${key}:`, results[key]);
    await new Promise(r => setTimeout(r, 1000));
  }

  fs.writeFileSync('unsplash_ids.json', JSON.stringify(results, null, 2));
  console.log('Saved results to unsplash_ids.json');
}

main();
