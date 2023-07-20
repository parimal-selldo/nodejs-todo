let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let mongoose = require("mongoose");

// connect to the database
mongoose.connect("mongodb://localhost:27017/todo");

// create a schema
let todoSchema = new mongoose.Schema({
  item: String
});

// create a model based on above schema
let todoModel = mongoose.model("todo_data", todoSchema);

module.exports = function(app) {

  app.get("/todo", function(req, res) {
    // get the data from mongodb and pass it to the view.
    todoModel.find({}).then((data) => {
      res.render("todo", {
        data: data
      });
    });
  });

  app.post("/todo", urlencodedParser, function(req, res) {
    // get the data form post request from ajax, add it to the mongodb.
    todoModel(req.body).save().then(data => {
      res.json(data);
    });
  });

  app.delete("/todo/:id", function(req, res) {
    todoModel.findOneAndRemove({ _id: req.params.id })
    .then(data => {
      res.json(data);
    });
  });

}
