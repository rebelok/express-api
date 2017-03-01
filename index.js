const path       = require('path');
const express    = require('express');
const bodyParser = require('body-parser');

const createRoutes = require('./routes');
const port         = process.env.PORT || 8080;
const app          = express();
const router       = express.Router();

if (process.env.NODE_ENV !== 'production') {
  app.use(require('morgan')('tiny'));
}

// configure app to use bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// REGISTER ROUTES
createRoutes(router);
app.use('/api', router);

app.listen(port);
console.log(`API started on port ${port}`);