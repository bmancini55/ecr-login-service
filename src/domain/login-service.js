
const ecr = require('../data/aws-api');
const docker = require('../data/docker-system');
const secrets = require('../data/docker-secrets');

module.exports = {
  authenticate
};

/**
 * Performs authentication
 * @return {[type]} [description]
 */
async function authenticate() {
  let accessKeyId = await secrets.readSecret('ecrAccessKeyId');
  let secretAccessKey = await secrets.readSecret('ecrSecretAccessKey');
  let region = process.env.ECR_REGION;
  let registryIds = (process.env.ECR_REGISTRY_IDS);

  let { authorizationToken, proxyEndpoint } = await ecr.getAuthorizationToken({ accessKeyId, secretAccessKey, region, registryIds });
  let userToken = splitAuthorizationToken(authorizationToken);

  proxyEndpoint = proxyEndpoint.substr('https://'.length);
  let result = await docker.authenticate({ username: userToken.username, password: userToken.password, serveraddress: proxyEndpoint });
  console.log(result);
}

/////////////////////////////////

/**
 * Converts the authorization token from ecr.getAuthorizationToken
 * into the corresponding username/usertoken required for the docker
 * login command.  For more information on the formation refer to:
 * http://docs.aws.amazon.com/AmazonECR/latest/userguide/Registries.html
 * @param  {[type]} authToken [description]
 * @return {[type]}           [description]
 */
function splitAuthorizationToken(authToken) {
  let buffer = new Buffer(authToken, 'base64');
  let [ username, password ] = buffer.toString().split(':');
  return {
    username,
    password,
  };
}