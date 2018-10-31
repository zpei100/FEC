const puppeteer = require('puppeteer')
const request = require('request');
const axios = require('axios');

const host = 'https://localhost:4000/room/25'

describe('Server interaction', () => {
  test('server responds 200', async () => {

    var response = await axios.get('http://localhost:4000/room/25')
    expect(response.status).toBe(200);
  });

  test('server renders gallery', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://localhost:4000/room/25')
    await expect(page).toMatchElement('.gallery');
    await browser.close()
  });

  test('server sends back static html enough to display page', async () => {
    var response = await axios.get('http://localhost:4000/room/25');
    expect(response).toMatchElement('.gallery');
    console.log(response.data);
  });

  test('server handles request with multiple room ids, each with different data responses', async () => {
    var room1 = await axios.get('http://localhost:4000/room/1').data
    var room2 = await axios.get('http://localhost:4000/room/2').data
    var room3 = await axios.get('http://localhost:4000/room/3').data
    var room4 = await axios.get('http://localhost:4000/room/4').data

    expect()
  })
});