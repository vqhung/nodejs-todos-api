var {User} = require('./../models/user');

var authenticate = (resquest, response, next) => {
  var token = request.header('x-auth');

  User.findByToken(token).then((user) => {
    if(!user) {
      return Promise.reject();
    }
    request.user = user;
    request.token = token;
    next();
  }).catch((e) => {
    response.status(401).send(e);
  });
};

module.exports = {authenticate};
