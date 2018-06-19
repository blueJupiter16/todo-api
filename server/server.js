const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {log} = require('../helper/logger.js');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
    var todo = new Todo({
        text:req.body.text,
        completed:req.body.completed        
    });
    todo.save().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        //log(err);
        res.status(400).send(err);       
    });
});

app.delete('todos/:id', (req,res) => {
    var id = req.params.id;
    if(ObjectID.isValid(id)){
        Todo.findByIdAndRemove(id).then((doc) => {

            if(!doc) {
                res.status(404).send();
            }
            else{
                res.send(doc);
            }
            
        }).catch((err) => {
            log(err);
        });
    }
    else{
        res.status(404).send('Not a valid ID');
    }
    
});

app.get('/todos', (req,res) => {
    Todo.find().then((todos) => {
        res.send(todos);
    }).catch((err) =>{ 
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req,res) => {
    Todo.findById(req.params.id).then((doc) => {
        if(!doc)
            return res.status(404).send();
        res.send(doc);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.listen(port, () => {
    log(`Started on port ${port}`);
});