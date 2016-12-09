//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if(err) {
    return  console.log('Unable to connect to MongoDB server');
  } else {
    console.log('Connected to MongoDB server');
  }

  //DeleteMany

  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  //DeleteOne

  // db.collection('Todos').deleteOne({text: 'Walk the dog'}).then((result) => {
  //   console.log(result);
  // });

  //findOne and DeleteOne

  db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    console.log(result);
  });

//db.close();
});
