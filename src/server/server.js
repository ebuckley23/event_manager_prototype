require('dotenv').config();
const path = require('path');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');

const events_handler = require('./handlers/events');

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/events', events_handler);

//catch-all fallback route for spa
app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log('success'));