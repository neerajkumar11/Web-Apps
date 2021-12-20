const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  rating: 7,
  review: "Good for health"
});

// fruit.save();


const personSchema= new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const pineapple = new Fruit({
  name: "Pineapple",
  rating: 9,
  review: "Great Fruit"
});

// pineapple.save();

const mango = new Fruit({
  name: "Mango",
  rating: 8,
  review: "Happy to eat"
})

const Person = mongoose.model("Person", personSchema);

// const person = new Person({
//   name: "John",
//   age: 26
// });

// person.save();

const amy = new Person({
  name: "Amy",
  age: 14,
  favouriteFruit: pineapple
});

// amy.save();


const kiwi = new Fruit({
  name: "Kiwi",
  rating: 4,
  review: "Not taste yet"
});

const orange = new Fruit({
  name: "Orange",
  rating: 10,
  review: "Fantastic"
});

const banana = new Fruit({
  name: "banana",
  rating: 7,
  review: "Sometimes good sometimes not"
});

// Fruit.insertMany([kiwi, orange, banana], function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("successfully saved all fruits to fruitsDB");
//   }
// });

Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  } else {

    mongoose.connection.close();

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });

  }
});

// Fruit.updateOne({_id: "5f39c53256b5d2362c22ed6c"}, {name: "Peach", review: "Too Good"}, function(err){
//   if(err){
//     console.log(err);
//   } else{
//     console.log("Data successfully updated");
//   }
// });

// Fruit.deleteOne({_id: "5f372de8db19fb2a08c57f02"}, function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("Data successfully Deleted");
//   }
// });

// Person.deleteMany({name: "John"}, function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("Data Successsfully deleted");
//   }
// });

// Person.updateOne({_id: "5f39cf105a7fda1ee83c8479"}, {favouriteFruit: mango}, function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("Data Successfully Updated");
//   }
// });
