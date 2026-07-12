const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxaP1P0p5q-muWS31yU89khUJlmrgCxC-IRXFVH0Ir-CWJBxD0JEyjLAsWI3I31leXD/exec';
const url = SHEETS_URL + '?refresh=true&t=' + Date.now();
fetch(url, { cache: 'no-store' })
  .then(res => {
    console.log('Status:', res.status);
    return res.text();
  })
  .then(text => console.log('Response:', text.substring(0, 100)))
  .catch(err => console.error('Error:', err));
