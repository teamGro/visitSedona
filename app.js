module.exports = function(menu){
	let express = require('express');
	let bodyParser = require('body-parser');
	let routes = require('./routes')();
	let mongoose = require('mongoose');
	let config = require('./config');
	let app = express();

	let port = process.env.PORT;
	  if (port === null || port === "" || port === undefined) {
	    port = 8000;
	  }
	  app.set('port', port);
	app.use(express.static(__dirname + '/public'));
	app.use(function (req, res, next) {
		res.set('X-Powered-By', 'Sedona');
		next();
	});
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	mongoose.connect(`mongodb://${config.db.login}:${config.db.password}@ds253284.mlab.com:53284/sedonadb`, function(err){
		//mongodb://${config.db.login}:${config.db.password}@ds253284.mlab.com:53284/sedonadb
		//mongodb://localhost:27017/
		if(err) {
			console.log(err);
			return;
		}

		console.log("Сервер ожидает подключения....");
	});

	app.get('/', routes.getIndexPage);

	app.get('/photo.html', routes.getPhotoPage);

	app.get('/getLikes', routes.getLikesQuality);

	app.get('/form.html', function (req, res) {
		res.send('form.html');
	});

	app.post('/setLikes', routes.postLikesCount);

	app.post('/save-data', routes.postUserData);

	app.use(function (req, res) {
		res.status(404);
		res.send('404 - страница не найдена');
	});

	app.use(function (err, req, res, next) {
		console.error(err.stack);

		res.status(500);
		res.render('500 - server error');
	});

	return app;
};
