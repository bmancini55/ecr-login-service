
const fs = require('fs');

module.exports = {
  fileExists,
  readFile,
};

/**
 * [fileExists description]
 * @param  {[type]} file [description]
 * @return {[type]}      [description]
 */
async function fileExists(file) {
  return new Promise((resolve) => fs.access(file, fs.constants.F_OK, (err) => resolve(!err)));
}

/**
 * Helper function to read a file and return a promise
 * @param  {[type]} file [description]
 * @return {[type]}      [description]
 */
async function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if(err) reject(err);
      else    resolve(data);
    });
  });
}
