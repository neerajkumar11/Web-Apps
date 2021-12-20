const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");


mongoose.connect("mongodb://localhost:27017/apitododb", {useNewUrlParser: true, useUnifiedTopology: true});

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

const testList = new List({
  name: "testList",
  items: item2
});

const list2 = new List({
  name: "list2",
  items: defaultItems
});

const list3 = new List({
  name: "list3",
  items: item3
});

const lists = [list2, list3]


const apiSchema = new mongoose.Schema({
  emailId: String,
  password: String,
  content: [listSchema]
});


const Api = mongoose.model("Api", apiSchema);

const db1 = new Api({
  emailId: "ny1711@gmail.com",
  password: "12345",
  content: testList
});

db1.save();

const db2 = new Api({
  emailId: "nrj@gmail.com",
  password: "qwerty",
  content: lists
});

db2.save();
