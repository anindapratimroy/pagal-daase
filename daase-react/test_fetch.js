const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzSXaHZ9UjyUh9MDi7CAX5ULucK0Gefwc0vQvyTPUfWTrVI0mQjflyTD_WdF_mcfm-rBA/exec';
const url = SHEETS_URL + '?refresh=true&t=' + Date.now();
fetch(url, { cache: 'no-store' })
  .then(res => {
    console.log('Status:', res.status);
    return res.text();
  })
  .then(text => console.log('Response:', text.substring(0, 100)))
  .catch(err => console.error('Error:', err));
