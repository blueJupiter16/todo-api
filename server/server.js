const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {log} = require('../helper/logger.js');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//todo API
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

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    Todo.findByIdAndRemove(id).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
  
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    });
  });

app.patch('/todos/:id', (req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text','completed']);

    if(!ObjectID.isValid(id)){
        return res.status(400).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();

    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,{$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send(todo);
    }).catch((err) => {
        res.status(400).send(err);
    });
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

//user API
app.post('/users', (req,res) => {
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
        //res.send(doc);
    }).then((token) => {
        res.header('x-auth',token).send(user);
    }).catch((err) =>{
        res.status(400).send(err);
    });
});

app.listen(port, () => {
    log(`Started on port ${port}`);
});