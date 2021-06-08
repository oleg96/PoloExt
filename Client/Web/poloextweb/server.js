const path = require('path');
const express = require('express');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');

const options = {
  key: fs.readFileSync('./keys/privkey.pem'),
  cert: fs.readFileSync('./keys/fullchain.pem'),
  dhparam: fs.readFileSync('./keys/dh-strong.pem')
};

const DIST_DIR = path.join(__dirname, 'dist');
const app = express();

app.use(express.static(DIST_DIR));
app.use(helmet());

app.get('*', function (req, res) {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

https.createServer(options, app).listen(8080);
