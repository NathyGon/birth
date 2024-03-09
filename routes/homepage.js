const express = require('express');
const router = express.Router();
const rootDir = process.cwd();
const util = require('../src/util');

router.get('/', async (req, res) => {
  let path_name = rootDir + '/public/images';
  let list_of_dir = await util.getFilenames(path_name);

  res.render('index.ejs', { image_path: list_of_dir });
});

module.exports = router;
