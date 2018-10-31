const puppeteer = require('puppeteer');
const request = require('request');
const axios = require('axios');
const $ = require('jquery');

const host = 'https://localhost:4000/room/25';

describe('Server interaction', () => {
  test('server responds 200', async () => {
    var response = await axios.get('http://localhost:4000/room/25');
    expect(response.status).toBe(200);
  });
});

describe('Server side rendering', () => {
  test('server renders gallery component and sends it back initially', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const num = 25;
    await page.goto(`http://localhost:4000/room/${num}`);
    await expect(page).toMatchElement('.gallery');
    await browser.close();
  });
});

// describe('Server sends response based on request url s param id', () => {
//   test('server handles request with multiple room ids, each with different data responses', async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     const id_one = Math.floor(Math.random() * 50);
//     let id_two;

//     while (true) {
//       id_two = Math.floor(Math.random() * 50);
//       if (id_two !== id_one) break;
//     }

//     await browser.close()

//   })
// })
