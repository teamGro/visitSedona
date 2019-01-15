let mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const likesScheme = new Schema({
	id: String,
	quality: String
});

module.exports = mongoose.model('likes', likesScheme);
