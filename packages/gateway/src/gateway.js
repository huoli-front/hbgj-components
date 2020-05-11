export default class Gateway {
  static REQUEST_TYPE = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete"
  }
  REQUEST_TYPE = Gateway.REQUEST_TYPE;
  constructor() {

  }

  config(options = {}) {
    const header = options.header;
  }

  request(type = Gateway.REQUEST_TYPE.GET) {

  }
}
