const express = require('express');

const app = express();

const port = process.env.PORT || 5000;
app.use(express.static('public'));

const homepageRouter = require('./routes/homepage.js');
const testingRouter = require('./routes/testing.js');
app.set('view engine', 'ejs');
app.use('/', homepageRouter);
app.use('/', testingRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
