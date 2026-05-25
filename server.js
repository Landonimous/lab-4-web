const https = require('https');
const express = require('express');

const app = express();
const LOGIN = 'landonimous';

app.get('/login', (req, res) => {
  res.send(LOGIN);
});

app.get('/id/:n', (req, res) => {
  const url = `https://nd.kodaktor.ru/users/${req.params.n}`;
  const req2 = https.request(url, { method: 'GET' }, (response) => {
    let data = '';
    response.on('data', chunk => data += chunk);
    response.on('end', () => {
      try {
        const json = JSON.parse(data);
        if (json.login !== undefined) {
          res.send(String(json.login));
        } else {
          res.status(500).send('No login field. Raw: ' + data);
        }
      } catch (e) {
        res.status(500).send('Parse error: ' + e.message + ' | Raw: ' + data);
      }
    });
  });
  req2.on('error', e => res.status(500).send('Request error: ' + e.message));
  req2.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
