// Standalone Puppeteer scraping server for Next.js integration
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.post('/scrape', async (req, res) => {
  const { website } = req.body;
  if (!website) return res.status(400).json({ error: 'No website provided' });
  let browser = null;
  try {
    const url = website.startsWith('http') ? website : `https://${website}`;
    let puppeteerLib;
    try {
      puppeteerLib = require('puppeteer-extra');
      const StealthPlugin = require('puppeteer-extra-plugin-stealth');
      puppeteerLib.use(StealthPlugin());
    } catch (err) {
      puppeteerLib = require('puppeteer');
    }
    browser = await puppeteerLib.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 });
    await page.evaluate(async () => {
      await new Promise(resolve => {
        let totalHeight = 0;
        const distance = 300;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= document.body.scrollHeight) {
            clearInterval(timer);
            resolve(null);
          }
        }, 200);
      });
    });
    const selectors = ['main', '#main', '.main', '#root', '#app', '.content', 'article'];
    let foundSelector = '';
    for (const sel of selectors) {
      if (await page.$(sel)) {
        foundSelector = sel;
        break;
      }
    }
    let text = '';
    if (foundSelector) {
      text = await page.$eval(foundSelector, el => el.innerText.replace(/\s+/g, ' ').trim());
    } else {
      text = await page.evaluate(() => document.body ? document.body.innerText.replace(/\s+/g, ' ').trim() : '');
    }
    await browser.close();
    if (!text || text.length < 100) {
      return res.json({ content: `No meaningful content found on ${website}.` });
    }
    return res.json({ content: text.slice(0, 2000) + (text.length > 2000 ? '...' : '') });
  } catch (e) {
    if (browser) try { await browser.close(); } catch {}
    return res.status(500).json({ error: e.message || String(e) });
  }
});

app.listen(port, () => {
  console.log(`Puppeteer scraping server running on port ${port}`);
});
