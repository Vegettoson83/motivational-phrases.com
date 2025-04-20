const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const TARGET_URL = 'https://your-target-site-with-adsense.com';

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-blink-features=AutomationControlled',
            '--window-size=1280,800'
        ]
    });

    const page = await browser.newPage();

    // 👻 Fake fingerprinting resistance
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1280, height: 800 });

    await page.goto(TARGET_URL, { waitUntil: 'networkidle2' });

    // Simulate real scrolling behavior
    await autoScroll(page);

    // Delay before searching ads
    await page.waitForTimeout(5000 + Math.random() * 5000);

    // Find and click AdSense iFrames
    const frames = page.frames();
    for (const frame of frames) {
        const ads = await frame.$$('iframe[src*="googleads.g.doubleclick.net"], iframe[src*="pagead2.googlesyndication.com"]');
        for (let ad of ads) {
            try {
                const box = await ad.boundingBox();
                if (!box) continue;

                // Scroll to view
                await page.evaluate(el => el.scrollIntoView(), ad);
                await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 15 });
                await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
                console.log(`[+] Clicked ad at (${box.x}, ${box.y})`);

                await page.waitForTimeout(7000 + Math.random() * 3000);
                break; // Optional: one click per session
            } catch (err) {
                console.log(`[!] Error clicking ad: ${err}`);
            }
        }
    }

    await browser.close();
})();

// 📜 Simulated smooth scroll
async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise(resolve => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= document.body.scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 300 + Math.random() * 200);
        });
    });
}
