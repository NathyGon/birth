const express = require('express');

const app = express();

const port = process.env.PORT || 5000;
app.use(express.static('public'));

const homepageRouter = require('./routes/homepage.js');
app.set('view engine', 'ejs');
app.use('/', homepageRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
