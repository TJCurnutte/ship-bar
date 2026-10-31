// Real visit counter: server-side proxy to Abacus (abacus.jasoncameron.dev), a hosted atomic counter.
// POST/GET /api/visits        -> increments and returns {visits, stars}
// GET     /api/visits?peek=1  -> returns current count without incrementing
const NS = 'ship-bar-neural-forge', KEY = 'visits';
let starCache = { v: null, t: 0 };
async function stars() {
  if (Date.now() - starCache.t < 600000 && starCache.v !== null) return starCache.v;
  try {
    const r = await fetch('https://api.github.com/repos/TJCurnutte/ship-bar', { headers: { 'User-Agent': 'ship-bar-site', Accept: 'application/vnd.github+json' } });
    if (r.ok) { const j = await r.json(); starCache = { v: j.stargazers_count, t: Date.now() }; }
  } catch (e) {}
  return starCache.v;
}
module.exports = async (req, res) => {
  const peek = req.query && req.query.peek;
  let visits = null;
  try {
    const r = await fetch(`https://abacus.jasoncameron.dev/${peek ? 'get' : 'hit'}/${NS}/${KEY}`);
    if (r.ok) visits = (await r.json()).value ?? null;
  } catch (e) {}
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ visits, stars: await stars() });
};
