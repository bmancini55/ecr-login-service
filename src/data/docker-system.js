
const docker = require('../common/docker-api');

// exports
module.exports = {
  authenticate,
};


/**
 * Performs a login with the supplied credentials
 * @param  {[type]} options.username      [description]
 * @param  {[type]} options.password      [description]
 * @param  {[type]} options.serveraddress [description]
 * @return {[type]}                       [description]
 */
async function authenticate({ username, password, serveraddress }) {
  let body = {
    username,
    password,
    email: 'none',
    serveraddress
  };
  console.log(body);
  return await docker.post('/auth', body);
}