var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var uri = 'mongodb+srv://user1:password_user1@cluster0-t2gwr.mongodb.net/test?retryWrites=true';
mongoose.connect(`${uri}/TodoApp`);
//mongoose.connect(`mongodb://localhost/TodoApp`);

module.exports = {
    mongoose
}