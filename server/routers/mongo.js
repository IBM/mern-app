/*
  Licensed to the Apache Software Foundation (ASF) under one
  or more contributor license agreements.  See the NOTICE file
  distributed with this work for additional information
  regarding copyright ownership.  The ASF licenses this file
  to you under the Apache License, Version 2.0 (the
  "License"); you may not use this file except in compliance
  with the License.  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing,
  software distributed under the License is distributed on an
  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, either express or implied.  See the License for the
  specific language governing permissions and limitations
  under the License.
 */

'use strict';

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var express = require('express');
var MongoStore = require('connect-mongo')(session);

var Comment = require('../model/comments');

// user set variables
const mongoURL = process.env.MONGO_URL || 'localhost';
const mongoUser = process.env.MONGO_USER || '';
const mongoPass = process.env.MONGO_PASS || '';
const mongoDBName = process.env.MONGO_DB_NAME || 'comments';

module.exports = function(app){

	var router = express.Router();

	// set up other middleware
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	const options = {
		useMongoClient: true,
		ssl: false,
		sslValidate: false,
		poolSize: 1,
		reconnectTries: 1
	};

	// connect to the MongoDB
	let mongoConnect = 'mongodb://localhost:27017';
	if (mongoURL !== '' && mongoUser !== '' && mongoPass != '') {
  		mongoConnect = `mongodb://${mongoUser}:${mongoPass}@${mongoURL}/${mongoDBName}`;
	} else if (mongoURL !== '') {
  		mongoConnect = `mongodb://${mongoURL}/${mongoDBName}`;
	}

	mongoose.Promise = global.Promise;
	mongoose.connect(mongoConnect, options)
  		.catch((err) => {
    		if (err) console.error(err);
  	});

	var db = mongoose.connection;
	db.on('error', (error) => {
  		console.error(error);
	});

	var sess = {
	  store: new MongoStore({ mongooseConnection: mongoose.connection }),
	  name: 'mern example',
	  secret: 'ninpocho',
	  resave: false,
	  saveUnitialized: true,
	  cookie: {}
	};

	app.use(session(sess));

	console.info('Connection established with mongodb');
	console.info(`Connection details: ${mongoConnect}`);

	router.get('/comments', (req, res) => {
    	Comment.find(function (err, comments) {
      		if (err) {
				res.status(500).send(err);
			}
      		res.json(comments);
    	});
  	});

	router.post('/comments', (req, res) => {
		const text = req.body.text;
    	const author = req.session.author;
    	const twitter = req.session.twitter;
    	const imageURL = req.session.imageURL;

    	if (!text || !author || !twitter || !imageURL) {
      		res.json({ message: 'Not signed in' });
      		return
    	}

    	const comment = new Comment({
        	author: author,
        	text: text,
        	twitter: twitter,
        	imageURL: imageURL
      	});

    	comment.save( (err) => {
      		if (err){
				res.status(500).send(err);
			}
      		res.json({ message: 'Comment successfully added!' })
    	});
	});

	router.put('/comments/:comment_id', function(req, res){

	});

	router.delete('/comments/:comment_id', (req, res) =>{
		Comment.remove({ _id: req.params.comment_id }, function (err, comment) {
			if (err){
				res.send(err);
			}

      		res.json({ message: 'Comment has been deleted' })
    	});
	});

	router.post('/comments/login', (req, res) => {
		const author = req.body.author;
  		const twitter = req.body.twitter;
  		const imageURL = req.body.imageURL;

  		console.info(`Received sign in request from ${author}, ${twitter}, ${imageURL}`);

  		req.session.author = author;
  		req.session.twitter = twitter;
  		req.session.imageURL = imageURL;

  		res.json({ message: 'Successfully logged in' });
	});

	router.post('/comments/logout', (req, res) => {
  		req.session.destroy();
  		console.info('Logged out');
  		res.json({ message: 'Successfully logged out' });
	});

	router.get('/comments/session', (req, res) => {
		  res.json({
    			author: req.session.author,
    			twitter: req.session.twitter,
    			imageURL: req.session.imageURL
  		  });
	});

	app.use('/api', router);
};
