/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var path = require('path');
var fs = require('fs');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

//var env = process.env.NODE_ENV;
//if(config.seedDB){
//  if ('production' === env) { require('./config/seed-prod'); }
//  if ('development' === env || 'test' === env) { require('./config/seed'); }
//}
var options = {
  pfx: fs.readFileSync(__dirname + '/server.pfx'),
  passphrase: 'password'
};
// Setup server
var app = express();
var server = require('https').createServer(options, app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});
console.log("Config root: " + config.root);

// Expose app
var exports;
exports = module.exports = app;
