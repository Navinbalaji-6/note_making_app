require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const app = express();
const port = process.env.PORT || 5000;
mongoose.connect( process.env.DB , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
          })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise;
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());
app.use('/api', routes);
app.use((err, req, res, next) => {
  console.log(err);
  next();
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});