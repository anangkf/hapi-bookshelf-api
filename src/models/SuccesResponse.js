const Response = require('./Response');

class SuccessResponse extends Response {
  constructor(status, message, data) {
    super(status, message);
    this.data = data;
  }
}

module.exports = SuccessResponse;
