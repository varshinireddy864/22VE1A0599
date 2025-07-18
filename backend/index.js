const express = require('express');
const cors = require('cors');
const { nanoid } = require('nanoid');
const logEvent = require('../loggingMiddleware/logEvent'); 

const app = express();
app.use(cors());
app.use(express.json());

let urls = [];

app.post('/api/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const code = nanoid(6);
  const shortUrl = `http://localhost:5000/${code}`;
const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000); 
urls.push({
  longUrl,
  shortUrl,
  code,
  expiry: expiry.toISOString(),  
});


  await logEvent("backend", "info", "handler", `Shortened URL for ${longUrl} → ${code}`);
  res.json({ longUrl, shortUrl, code });
});

app.get('/api/stats', async (req, res) => {
  await logEvent("backend", "info", "handler", "Stats requested");
  res.json(urls);
});

app.get('/:code', async (req, res) => {
  const match = urls.find(u => u.code === req.params.code);
  if (match) {
    await logEvent("backend", "info", "handler", `Redirected to ${match.longUrl} from code ${match.code}`);
    res.redirect(match.longUrl);
  } else {
    await logEvent("backend", "warn", "handler", `Invalid short code: ${req.params.code}`);
    res.status(404).send('Not found');
  }
});

app.listen(5000, () => console.log('Server running at http://localhost:5000'));
