
const fs = require('../common/fs');

module.exports = {
  readSecret,
};


/**
 * Reads the secret file and returns a string
 * @param  {[type]} secret [description]
 * @return {[type]}        [description]
 */
async function readSecret(secret) {
  if(await fs.fileExists(`/run/secrets/${secret}`)) {
    console.log('reading secret ', secret);
    let buffer = await fs.readFile(`/run/secrets/${secret}`);
    return buffer.toString();
  }
}

