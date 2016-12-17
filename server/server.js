require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

const port = process.env.PORT;

var app = express();

app.use(bodyParser.json());

app.post('/todos', (request, response) => {
  var todo = new Todo({
    text: request.body.text
  });

  todo.save().then((doc) => {
    response.send(doc)
  }, (e) =>{
    response.status(400).send(e);
  });
});

app.get('/todos', (request, response) => {
  Todo.find().then((todos) => {
    response.send({todos});
  }, (e) => {
    response.status(400).send(e);
  });
});

app.get('/todos/:id', (request, response) => {

  var id = request.params.id;

  if(!ObjectID.isValid(id)){
    return response.status(404).send();
  }

  Todo.findById(id).then((todo) => {

    if(!todo) {
      return response.status(404).send()
    }

    response.send({todo})

  }).catch((e) => {

    response.status(400).send();
  });


});

app.delete('/todos/:id', (request, response) => {

    var id = request.params.id;

    if(!ObjectID.isValid(id)) {
      return response.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {

      if(!todo) {
        return response.status(404).send();
      }

      response.send({todo});
    }).catch((e) => {

      response.status(400).send();
    });
});

// Modify git commit name

app.patch('/todos/:id', (request, response) => {

  var id = request.params.id;
  var body = _.pick(request.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)) {
    return response.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return response.status(404).send();
    }
    response.send({todo});
  }).catch((e) => {
    response.status(400).send();
  });
});

app.post('/users', (request, response) => {

  var body = _.pick(request.body, ['email', 'password']);

  var user = new User(body);

  user.save().then((user) => {
    return user.generateAuthToken();
    //response.send(user);
  }).then((token) => {
    response.header('x-auth',token).send(user);
  }).catch((e) => {
    response.status(400).send(e);
  });

});



app.get('/users/me', authenticate, (request, response) => {
  response.send(request.user);
});

app.listen(port, () => {
  console.log(`Started at port ${port}`);
});


module.exports = {app};
