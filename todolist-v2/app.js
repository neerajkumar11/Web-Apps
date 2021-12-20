//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


// mongoose.connect("mongodb+srv://admin-neeraj:Helloji@cluster0.t49cg.mongodb.net/todolistDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect("mongodb://localhost: 27107/todolistDB", { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);


const itemsSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to our todolist!"
});

const item2 = new Item({
  name: "Hit this to delete a item -->"
});

const item3 = new Item({
  name: "<-- Hit this to cross a item"
});

const defaultItems = [item1, item2, item3];

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema]
});

const List = mongoose.model("List", listSchema);

const newList = ["Today"];
const newItems = [item1, item2, item3];

const defaultList = new List({
  name: "Today",
  items: defaultItems
})

const userSchema = new mongoose.Schema({
  emailId: String,
  password: String,
  content: [listSchema]
});

const User = mongoose.model("User", userSchema);

app.get("/", function(req, res){
  res.render("register");
});

app.get("/login", function(req, res){
  res.render("login")
});


app.post("/", function(req, res){
  const userId = req.body.userId;
  const password = req.body.password;

  const newUser = new User({
    emailId: userId,
    password: password,
    content: defaultList
  });

  User.findOne({emailId: userId}, function(err, result){
    if(result){
      console.log("You have already a account");
    } else {
      newUser.save();
      res.render("list", {listTitle: "Today", newItems: defaultItems, userid: userId, userPassword: password });
    }
  });
});

app.post("/home", function(req, res){
  const user = req.body.userid;
  const pass = req.body.password;
  const itemName = req.body.newToDo;
  const listName = req.body.button;

  const itm = new Item({
       name: itemName
     });

  newItems.push(itm);

  const newlist = new List({
    name: "Today",
    items: newItems
  })

  User.updateOne({emailId: user, password: pass},{content: newlist}, function(err, rslt){
    if(err){
      console.log(err);
    } else {
      console.log(rslt);
      User.findOne({emailId: user, password: pass}, function(err, result){
       if(err){
         console.log("There is some error");
       } else {
         console.log(result.content[0].items);
      res.render("list", {listTitle: "Today", newItems: result.content[0].items, userid: user, userPassword: pass } );
       }
      });
    }
  });
});

app.post("/login", function(req, res){
  const userid = req.body.userId;
  const password = req.body.password;

  User.findOne({emailId: userid, password: password}, function(err, result){
    if(err){
      console.log("Register yourself");
    } else {
      res.render("list", {listTitle: "Today", newItems: result.content[0].items, userid: userid, userPassword: password })
    }
  })
});

app.post("/delete", function(req, res){
  const itemId = req.body.checkedItem;
  const itemName = req.body.itemName;
  const userId = req.body.userid;
  const password = req.body.password;
  const obj = {itemId, itemName};

  newItems.splice((newItems.indexOf({itemId})), 1);
  console.log(newItems.indexOf(obj));

  const newlist = new List({
    name: "Today",
    items: newItems
  });

  User.updateOne({emailId: userId, password: password},{content: newlist}, function(err, rslt){
    if(err){
      console.log(err);
    } else {
      console.log(rslt);
      User.findOne({emailId: userId, password: password}, function(err, result){
       if(err){
         console.log("There is some error");
       } else {
         console.log(result.content[0].items);
      res.render("list", {listTitle: "Today", newItems: result.content[0].items, userid: userId, userPassword: password } );
       }
      });
    }
  });


});


// app.get("/home", function(req, res){

    // Item.find({}, function(err, result){
    //   if(result.length === 0){
    //     Item.insertMany(defaultItems, function(err){
    //       if(err){
    //         console.log(err);
    //       } else {
    //         console.log("Successfuly inserted items");
    //       };
    //     });
        // res.redirect("/home");
    //   } else {
    //     res.render("list", {listTitle: "Today", newItems: result});
    //   };
    // });
// });
//
//
// app.get("/about", function(req, res){
//   res.render("about");
// });

// app.get("/home/:customListName", function(req, res){
//   const customListName = _.capitalize(req.params.customListName);
//
//   List.findOne({name: customListName}, function(err, results){
//     if(!err){
//       if(! results){
//         // Create a new list
//         const list = new List({
//           name: customListName,
//           items: defaultItems
//         });
//
//         list.save();
//         res.redirect("/home"+customListName);
//
//       } else {
//         // Show an existing list
//         res.render("list", {listTitle: results.name, newItems: results.items});
//       }
//     }
//   });
// });
//
// app.post("/register", function(req, res){
//   const userId = req.body.userId;
//   const password = req.body.password;
//
//   const newUser = new User({
//     emailId: userId,
//     password: password,
//     content: defaultList
//   });
//
//   User.findOne({emailId: userId}, function(err, result){
//     if(result){
//       console.log("You have already a account");
//     } else {
//       newUser.save();
//       res.render("about");
//     }
//   });
//
// });
//
// app.post("/home", function(request, response){
//   let itemName = request.body.newToDo;
//   let listName = request.body.button;
//
//   const item = new Item({
//     name: itemName
//   });
//
//   if(listName === "Today"){
//     item.save();
//     response.redirect("/home");
//   } else {
//     List.findOne({name: listName}, function(err, foundList){
//       foundList.items.push(item);
//       foundList.save();
//       response.redirect("/home"+listName);
//     })
//   }
// });
//
//
//
// app.get("/about", function(req,res){
//   res.render("about");
// });
//
// app.post("/delete", function(request, response){
//   const checkedItemId = request.body.checkedItem;
//   const listName = request.body.listName;
//
//   if(listName === "Today"){
//     Item.findByIdAndRemove(checkedItemId, function(err){
//       if(err){
//         console.log(err);
//       } else {
//         console.log("Successfully delete item");
//       }
//     });
//     response.redirect("/home")
//   } else {
//     List.findOneAndUpdate({name: listName},{$pull: {items: {_id: checkedItemId}}},function(err, foundList){
//       if(!err){
//         response.redirect("/home"+listName);
//       };
//     });
//   };
// });

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
};

app.listen(port, function(){
  console.log("Server Running");
});
