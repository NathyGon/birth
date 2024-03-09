const fs = require('fs');
const util = require('util');

const getFilenames = async (path_name) => {
  fileNames = [];
  list = await listFileName(path_name);
  for (const file of list) {
    if (file.includes('.')) {
      fileNames.push(file);
    } else {
      let newPath = path_name + '/' + file;
      fileNames = [...fileNames, await listFileName(newPath, file)];
    }
  }

  return fileNames;
};
async function listFileName(path_name, subdir) {
  const readdir = util.promisify(fs.readdir);
  file_names = await readdir(path_name);

  return subdir == null
    ? file_names
    : file_names.map((file) => subdir + '/' + file);
}
module.exports = {
  getFilenames,
};
