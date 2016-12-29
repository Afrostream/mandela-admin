const express = require('express');
const morgan = require('morgan')

const app = express();

app.set('port', (process.env.PORT || 9000));

app.use(morgan('dev'));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api/auth', (req, res) => {
  res.json({authenticated: true})
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});