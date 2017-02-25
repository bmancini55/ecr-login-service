
const AWS = require('aws-sdk');

module.exports = {
  getAuthorizationToken,
};

/**
 * Fetches the authorization token
 * @param  {[type]} options.accessKeyId     [description]
 * @param  {[type]} options.secretAccessKey [description]
 * @param  {[type]} options.region          [description]
 * @param  {[type]} options.registryIds     [description]
 * @return {[type]}                         [description]
 */
async function getAuthorizationToken({ accessKeyId, secretAccessKey, region, registryIds }) {
  let credentials = { accessKeyId, secretAccessKey };
  if(region) {
    credentials.region = region;
  }

  let params = {};
  if(registryIds) {
    params.registryIds = registryIds;
  }

  let ecr = new AWS.ECR(credentials);
  return await ecr
    .getAuthorizationToken(params)
    .promise()
    .then((res) => res.authorizationData[0]);
}