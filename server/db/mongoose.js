var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var uri = 'mongodb+srv://<tinwalajunaid@gmail.com>:<Lenovo1996!>@cluster0-t2gwr.mongodb.net/test?retryWrites=true';
mongoose.connect(`${uri}/TodoApp`);

module.exports = {
    mongoose
}