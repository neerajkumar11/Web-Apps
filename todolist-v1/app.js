//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname+"/date.js");
const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

let items = [];
let workItems =[];

app.get("/", function(req, res){

  let day = date();

  res.render("list", {listTitle: day, route:"/", newItems: items});

});

app.post("/", function(request, response){
  let item = request.body.newToDo;
  items.push(item);
  response.redirect("/");
});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", route:"/work", newItems: workItems})
});

app.post("/work", function(request, response){
  let workItem = request.body.newToDo;
  workItems.push(workItem);
  response.redirect("/work");
});

app.get("/about", function(req,res){
  res.render("about");
});

app.listen(3000, function(){
  console.log("Server Running");
})
