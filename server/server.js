var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {log} = require('../helper/logger.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
    var todo = new Todo({
        text:req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        //log(err);
        res.status(400).send(err);       
    });
});

app.listen(3000, () => {
    log('Started on port 3000');
});