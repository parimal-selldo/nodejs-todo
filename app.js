const express = require("express");
const todoController = require("./controllers/todoController");

let app = express();

//set up templates
app.set("view engine", "ejs");

// set static files
app.use(express.static("./public"));

// fire controllers
todoController(app);

// listen to a port
app.listen(3000);
console.log("App is listening to port 3000");





