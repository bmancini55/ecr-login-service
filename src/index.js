
const loginService = require('./domain/login-service');

const inteveral = 3600 * 1000; // 1hour

run();
setInterval(run, inteveral);

function run(){
  console.log('authenticating');
  loginService
    .authenticate()
    .then(() => 'authenticate complete')
    .catch(console.log);
}