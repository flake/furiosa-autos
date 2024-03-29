var express = require('express');
var router = express.Router();
var api = require('../lib/api');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

/*
* Task 1:
* Make models alphabetically sortable (ascending, descending, default)
*/
router.get('/models', function(req, res, next) {
	// use api to get models and render output
	promise = api.fetchModels();
	promise.then(function(models){
		res.render('models', {models: models});
	});
});

/*
* Task 2:
* Make services filterable by type (repair, maintenance, cosmetic)
*/
router.get('/services', function(req, res, next) {
	// use api to get services and render output
	promise = api.fetchServices();
	promise.then(function(services){
		res.render('services', {services: services});
	});
});

/*
* Task 3:
* Bugfix: Something prevents reviews from being rendered
* Make reviews searchable (content and source)
*/
router.get('/reviews', function(req, res, next) {
	Promise.all([api.fetchCustomerReviews(), api.fetchCorporateReviews()])
		.then(function(reviews) {
			res.render('reviews', {reviews: reviews[0].concat(reviews[1])});
		}, function(reason){
			console.log("promise " + reason);
		});
});

module.exports = router;
