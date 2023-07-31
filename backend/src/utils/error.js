const { badRequest, serverError } = require("./response");

function handleAPIError(res, error) {
  // The request was made and the server responded with a status code out of 200
  if (error.response) {
    badRequest(res, error.response.data.message);
  } else {
    serverError(res, 'Unknown bank API error');
  }
}

module.exports = {
  handleAPIError
}