var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var uri = `mongodb://user1:password_user1@cluster0-shard-00-00-t2gwr.mongodb.net:27017,cluster0-shard-00-01-t2gwr.mongodb.net:27017,cluster0-shard-00-02-t2gwr.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true/TodoApp`;
//var uri = 'mongodb+srv://user1:password_user1@cluster0-t2gwr.mongodb.net/TodoApp?retryWrites=true';
mongoose.connect(`${uri}`);
//mongoose.connect(`mongodb://localhost/TodoApp`);

module.exports = {
    mongoose
}