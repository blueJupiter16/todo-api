var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//var uri = 'mongodb://user1:zigmEnQn4NqIHKbV@cluster0-shard-00-00-t2gwr.mongodb.net:27017,cluster0-shard-00-01-t2gwr.mongodb.net:27017,cluster0-shard-00-02-t2gwr.mongodb.net:27017/TodoApp?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
//var uri = 'mongodb://localhost/TodoApp';
//var uri = 'mongodb://user1:cNbB60QSPGVkttH9@cluster0-shard-00-00-t2gwr.mongodb.net:27017,cluster0-shard-00-01-t2gwr.mongodb.net:27017,cluster0-shard-00-02-t2gwr.mongodb.net:27017/TodoApp?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

mongoose.connect(process.env.MONGODB_URI,(err) => {
    if(err) {
        console.log(`Error: ${err}`);
    } else {
        console.log('Connected to DB');
    }

});
//mongoose.connect(`mongodb://localhost/TodoApp`);

module.exports = {
    mongoose
}