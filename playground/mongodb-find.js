//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if(err) {
    return  console.log('Unable to connect to MongoDB server');
  } else {
    console.log('Connected to MongoDB server');
  }

  db.collection('Todos').find({_id: new ObjectID('584a5e7488e42bb41f12ba2b')}).count().then((count) => {
    console.log(`Todos count: ${count}` );
    }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  db.close();
});
