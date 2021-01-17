// Requiring our models and passport as we've configured it
const db = require('../models');
const passport = require('../config/passport');

//rendom String
const randomstring = require('randomstring');
const User = require('../models/user');
const WriteStory = require('../models/writeStory');
const mailer = require('../misc/mailer');
const isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = function(app) {
	// Using the passport.authenticate middleware with our local strategy.
	// If the user has valid login credentials, send them to the members page.
	// Otherwise the user will be sent an error
	app.post('/api/login', passport.authenticate('local'), (req, res) => {
		// Sending back a password, even a hashed password, isn't a good idea
		res.json({
			email: req.user.email,
			id: req.user.id,
		});
	});
	// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
	// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
	// otherwise send back an error
	app.post('/api/signup', (req, res) => {
		db.User.create({
			anonymousName: req.body.anonymousName,
			email: req.body.email,
			password: req.body.password,
			age: req.body.age,
			policy: req.body.policy,
			secretToken: randomstring.generate(),
			active: true,
		})
			.then(result => {
				res.redirect('/login');

				const html = `Hi There,
        <br/>
        Thank you for registring!
        <br><br>
        Please verify your email by typing the follwoing token:
        <br>
        Token: <strong>${result.secretToken}</strong>
        <br>
        On teh following page:
        <a href="https://lit-depths-25209.herokuapp.com/verify">https://lit-depths-25209.herokuapp.com/verify</a>
        `;

				//Send an email

				mailer.sendEmail(
					'm.laknahour1990@gmail.com',
					result.email,
					'Verification code',
					html
				);
			})
			.catch(err => {
				return res.status(401).send(err.message);
			});
	});

	app.post('/api/verify', (req, res) => {
		db.User.update(
			{
				active: true,
				secretToken: '',
			},
			{
				where: { secretToken: req.body.secretToken },
			}
		)
			.then(value => {
				// console.log(value[0]);
				if (value[0] === 0) {
					console.log(res.status(401).send('Incorrect access token'));
				} else {
					res.redirect('/');
				}
			})
			.catch(err => {
				return res.status(401).send(err.message);
			});
	});

	// Route for logging user out
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/index');
	});

	// get individual user
	app.get('/api/user_data', (req, res) => {
		if (!req.user) {
			// The user is not logged in, send back an empty object
			res.json({});
		} else {
			// Otherwise send back the user's email and id
			// Sending back a password, even a hashed password, isn't a good idea
			res.json({
				anonymousName: req.user.anonymousName,
				age: req.user.age,
				UserUuid: req.user.uuid,
			});
		}
	});

	//get all user
	app.get('/api/admin/all_user', (req, res) => {
		db.User.findAll({}).then(function(results) {
			// console.log("/.............",User.active,".............//");
			res.json(results);
		});
	});

	//create a Post
	app.post('/api/writeStory', isAuthenticated, (req, res) => {
		//  console.log(req.body.anonymousName, "--------------------------///////////////")
		db.WriteStory.create({
			story: req.body.story,
			title: req.body.title,
			UserUuid: req.body.userUuid,
		})
			.then(function(results) {
				console.log(results);
				return res.status(200).json(results);
			})
			.catch(err => {
				return res.status(500).send(err.message);
			});
	});

	//Get a Story by user_id
	app.get('/api/writeStory/:user_id', isAuthenticated, (req, res) => {
		db.WriteStory.findAll({
			where: { UserUuid: req.params.user_id },
		}).then(function(results) {
			res.json(results);
		});
	});

	//Get all Story
	app.get('/api/writeStory', isAuthenticated, (req, res) => {
		db.WriteStory.findAll({}).then(function(results) {
			res.json(results);
		});
	});

	//Get the story by ID
	app.get('/api/writeStory/show/:story_id', isAuthenticated, (req, res) => {
		console.log('------story ID:-----------------');
		console.log(req.params.story_id);
		db.WriteStory.findAll({
			where: { id: req.params.story_id },
		}).then(function(results) {
			res.json(results);
		});
	});

	//Delete story
	app.delete('/api/writeStory/delete/:story_id', function(req, res) {
		console.log(req.params.story_id);
		db.WriteStory.destroy({
			where: {
				id: req.params.story_id,
			},
		}).then(function() {
			res.end();
		});
	});

	//Edit Story

	app.post('/api/writeStory/show/:story_id', (req, res) => {
		db.WriteStory.update(
			{
				story: req.body.story,
				title: req.body.title,
			},
			{
				where: { id: req.params.story_id },
			}
		)
			.then(function(results) {
				return res.status(200).json(results);
			})
			.catch(err => {
				return res.status(500).send(err.message);
			});
	});
};
