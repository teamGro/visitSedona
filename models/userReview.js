let mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const reviewSchema = new Schema({
	name: String,
	surname: String,
	patronym: String,
	tel: String,
	email: String,
	impressions: String,
	attractions: {
		bridge: String,
		mountain: String,
		park: String,
		rocks: String
	},
	emotions: String
});

module.exports = mongoose.model('review', reviewSchema);
