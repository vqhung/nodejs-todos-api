//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if(err) {
    return  console.log('Unable to connect to MongoDB server');
  } else {
    console.log('Connected to MongoDB server');
  }

  // db.collection('Todos').insertOne({
  //   text: 'Something to do next',
  //   completed: false
  // }, (err, result) => {
  //   if(err){
  //     return console.log('Unable to insert todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result, undefined, 2));
  //
  // });
  //
  // db.collection('Users').insertOne({
  //   name: "Hung Truc",
  //   age: 34,
  //   location: "My Tho, Tien Giang"
  // },(err,result) => {
  //   if (err){
  //     consolog.log('Unable to insert user');
  //   }
  //
  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  db.close();
});
