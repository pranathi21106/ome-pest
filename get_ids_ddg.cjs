const fs = require('fs');

async function searchDDG(query) {
  try {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent('site:unsplash.com/photos/ ' + query)}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html'
      }
    });
    if (!response.ok) {
      console.log(`Failed to fetch DDG for ${query}: ${response.status}`);
      return [];
    }
    const html = await response.text();
    // Search for patterns containing unsplash.com/photos/[a-zA-Z0-9_-]+
    // In duckduckgo html, URLs might be in href or text, let's find all occurrences of unsplash.com/photos/([a-zA-Z0-9_-]+)
    const regex = /unsplash\.com\/photos\/([a-zA-Z0-9_-]+)/g;
    const matches = new Set();
    let match;
    while ((match = regex.exec(html)) !== null) {
      const fullId = match[1];
      const parts = fullId.split('-');
      const id = parts[parts.length - 1];
      if (id && id.length >= 5 && id.length <= 15) {
        matches.add(id);
      }
    }
    return Array.from(matches).slice(0, 10);
  } catch (error) {
    console.error(`Error searching DDG for ${query}:`, error);
    return [];
  }
}

async function main() {
  const queries = {
    termite: 'termite wood damage',
    cockroach: 'cockroach infestation',
    rodent: 'mouse rat rodent control',
    mosquito: 'mosquito insect skin bite',
    bedbug: 'bedbug mattress skin',
    woodborer: 'wood damage holes beetle',
    spider: 'spider web insect',
    bird: 'pigeon building spikes control',
    fly: 'housefly fly insect',
    snake: 'snake control',
    foodpest: 'weevil pantry moth beetles',
    disinfection: 'disinfection sanitizing spray',
    audit: 'pest technician inspector service'
  };

  const results = {};
  for (const [key, query] of Object.entries(queries)) {
    console.log(`Searching for ${key}...`);
    results[key] = await searchDDG(query);
    console.log(`Results for ${key}:`, results[key]);
    await new Promise(r => setTimeout(r, 1500));
  }

  fs.writeFileSync('unsplash_ids.json', JSON.stringify(results, null, 2));
  console.log('Saved results to unsplash_ids.json');
}

main();
