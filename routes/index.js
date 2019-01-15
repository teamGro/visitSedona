let Likes = require('../models/likes');
let Review = require('../models/userReview');
module.exports = function(){
	let functions = {};

	functions.getIndexPage = function(req, res){
		console.log('hello');

		res.send('index.html');
	};

	functions.getPhotoPage = function (req, res) {
		res.send('photo.html');
	};

	functions.getFormPage = function(req, res){
		res.send('form.html');
	};

	functions.getLikesQuality = function (req, res) {
		Likes.find({}).
			then( result => {
				res.json(result);
			}).
			catch(err => {
				console.log(err);
				res.send('error')
			}
		);
	};

	functions.postLikesCount = function (req, res) {
		if(!req.body) console.error(new Error('req.body is emprty'));
		let arr = req.body;
		let i = 1;

		for(let i = 0; i < arr.length; i++){
			Likes.findOneAndUpdate({id: arr[i].id}, {quality: arr[i].quality}, {new: true}, (err, done) => {
				if(err) return console.log(err);
				console.log("Обновленный объект", done);
			})
		}
	};

	functions.postUserData = function (req, res) {
		console.log(req.body);
		let userName = req.body['user-info']['user-name'];
		let userSurname = req.body['user-info']['user-surname'];
		let userPatronym = req.body['user-info']['user-patronym'];

		let userTel = req.body['contact-info']['user-tel'];
		let userEmail = req.body['contact-info']['user-email'];

		let userImpressions = req.body['impression-info'].title;

		let attractions = ['bridge', 'mountain', 'park', 'rocks'];
		let userAttractions = {};
		for(let i = 0; i < attractions.length; i++){
			userAttractions[attractions[i]] = req.body['attractions-info'][attractions[i]];
		}
		console.log(userAttractions);

		let userEmotions = req.body['emotion-info'].text;

		let review = new Review({
			name: userName,
			surname: userSurname,
			patronym: userPatronym,
			tel: userTel,
			email: userEmail,
			impressions: userImpressions,
			attractions: userAttractions,
			emotions: userEmotions
		});
		// review.save().
		// 	then( res => {
		// 		console.log('ok');
		// }).
		// 	catch(err => {
		// 	console.log(err);
		// });
		review.save( err => {
			if(err) console.log(err);
			else {
				//res.writeHead(200, {'content-type': 'text/plain'});
				console.log(`данные успешно сохранены`);
				res.send('');
			}
		})

		//res.send('ok');
	};

	return functions;
};
