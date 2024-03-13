const express = require('express');
const router = express.Router();

router.get('/testing', async (req, res) => {
  res.render('another.ejs');
});

module.exports = router;
