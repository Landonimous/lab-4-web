const https = require('https');
const express = require('express');

const app = express();
const LOGIN = 'landonimous';

app.get('/login', (req, res) => {
  res.send(LOGIN);
});

app.get('/id/:n', (req, res) => {
  const url = `https://nd.kodaktor.ru/users/${req.params.n}`;
  https.get(url, { headers: {} }, (response) => {
    let data = '';
    response.on('data', chunk => data += chunk);
    response.on('end', () => {
      try {
        const json = JSON.parse(data);
        res.send(json.login);
      } catch (e) {
        res.status(500).send('Parse error: ' + e.message);
      }
    });
  }).on('error', e => res.status(500).send(e.message));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
