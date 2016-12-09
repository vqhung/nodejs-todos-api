//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if(err) {
    return  console.log('Unable to connect to MongoDB server');
  } else {
    console.log('Connected to MongoDB server');
  }

  //findOneAndUpdate
//
//   db.collection('Todos').findOneAndUpdate({_id: new ObjectID('584a1da5f04f5e0d3a7aa6e9')},
//   {$set: {
//       text: "Eat lunch"
//   }
// }, false).then((result) => {
//   console.log(result);
// });

db.collection('Users').findOneAndUpdate({
  _id: new ObjectID('584a1ff7a023a60d3f33e6a9')
}, {
  $set: {name: 'Andrew'},
  $inc: {age: 1},
}, {
  returnOriginal: false
}).then((result) => {
  console.log(result);
});

//db.close();
});
