require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { ObjectID } = require('mongodb');
const cors = require('cors');

var { mongoose } = require('./db/mongoose.js');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { log } = require('../helper/logger.js');
var { authenticate } = require('./middleware/authenticate');
var { setHeaders } = require('./middleware/setHeaders');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

//CORS
var corsOptions = {
  allowedHeaders: ['Content-Range', 'Date', 'X-Auth'],
  exposedHeaders: ['Content-Range', 'Date', 'X-Auth']
};
app.options('*', cors(corsOptions)); // include before other routes

//todo API
app.get('/api/todos', authenticate, (req, res) => {
  Todo.find({ _creator: req.user._id })
    .then(todos => {
      res.send(todos);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.get('/api/todos/:id', authenticate, (req, res) => {
  Todo.findOne({
    _id: req.params.id,
    _creator: req.user._id
  })
    .then(doc => {
      if (!doc) return res.status(404).send();
      res.send(doc);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.post('/api/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  todo
    .save()
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      //log(err);
      res.status(400).send(err);
    });
});

app.delete('/api/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOneAndRemove({
    _id: req.params.id,
    _creator: req.user._id
  })
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.patch('/api/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate(
    {
      _id: req.params.id,
      _creator: req.user._id
    },
    { $set: body },
    { new: true }
  )
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send(todo);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

//user API
app.post('/api/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
      //res.send(doc);
    })
    .then(token => {
      res.header('x-auth', token).send(user);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

//private route - to authenticate API request
app.get('/api/users/me', authenticate, (req, res) => {
  res.send(req.user);
});
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password)
    .then(user => {
      user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user);
      });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.delete('/api/users/me/token', authenticate, (req, res) => {
  req.user
    .removeToken(req.token)
    .then(() => {
      res.status(200).send();
    })
    .catch(err => {
      res.status(400).send();
    });
});
//dev-routes
app.get('/users', (req, res) => {
  User.find()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.delete('/api/drop-all', (req, res) => {
  Todo.remove({}, err => {});
  User.remove({}, err => {});
  res.status(200).send();
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  log(`Started on port ${port}`);
});
