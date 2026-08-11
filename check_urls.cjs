const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

async function test() {
  const correctUrl = 'https://images.unsplash.com/photo-1624996379697-f01d168b1a52?w=10';
  const dummyUrl = 'https://images.unsplash.com/photo-1500000000000-f01d168b1a52?w=10';
  
  const res1 = await fetch(correctUrl, { method: 'HEAD' });
  const res2 = await fetch(dummyUrl, { method: 'HEAD' });
  
  console.log(`Correct url status: ${res1.status}`);
  console.log(`Dummy url status: ${res2.status}`);
}

test();
