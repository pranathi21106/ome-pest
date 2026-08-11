const fs = require('fs');
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

async function searchDDG(query) {
  try {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent('site:unsplash.com ' + query)}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html'
      }
    });
    if (!response.ok) {
      console.log(`Failed to fetch DDG for ${query}: ${res.status}`);
      return [];
    }
    const html = await response.text();
    // Regex to match images.unsplash.com/photo-[0-9]+-[a-f0-9]+ or photo-[a-zA-Z0-9_-]+
    // Let's capture the part after photo-
    const regex = /images\.unsplash\.com\/photo-([a-zA-Z0-9_-]+)/g;
    const matches = new Set();
    let match;
    while ((match = regex.exec(html)) !== null) {
      const fullId = match[1];
      // Clean up the match: it might have query params like ?w=...
      const idOnly = fullId.split('?')[0];
      if (idOnly && idOnly.includes('-')) {
        matches.add(idOnly);
      }
    }
    return Array.from(matches).slice(0, 5);
  } catch (error) {
    console.error(`Error searching DDG for ${query}:`, error);
    return [];
  }
}

async function main() {
  const queries = {
    cockroach: 'cockroach insect',
    mosquito: 'mosquito skin',
    bedbug: 'bed bug mattress',
    rodent: 'mouse rat pest',
    spider: 'spider web',
    bird: 'pigeon bird',
    fly: 'housefly fly',
    snake: 'snake control',
    foodpest: 'weevil grain',
    disinfection: 'disinfection spray',
    audit: 'pest inspector'
  };

  const results = {};
  for (const [key, query] of Object.entries(queries)) {
    console.log(`Searching for ${key}...`);
    results[key] = await searchDDG(query);
    console.log(`Results for ${key}:`, results[key]);
    await new Promise(r => setTimeout(r, 2000));
  }

  fs.writeFileSync('unsplash_cdn_ids.json', JSON.stringify(results, null, 2));
  console.log('Saved results to unsplash_cdn_ids.json');
}

main();
