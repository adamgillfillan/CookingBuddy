/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {
  /* At the top, with other redirect methods before other routes */
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('*',function(req,res,next){
    if(req.headers['x-forwarded-proto']!='https'){
      //res.header("Access-Control-Allow-Origin", "*");
      //res.header("Access-Control-Allow-Headers", "X-Requested-With");
      console.log("Https redirect");
      //res.redirect('https://cookingbuddy.herokuapp.com'+req.url);
      res.redirect(['https://', req.get('Host'), req.url].join(''));
    }

      //res.redirect(['https://', req.get('Host'), req.url].join(''));
    else
      next(); /* Continue to other routes if we're not redirecting */
  });
  // Insert routes below
  app.use('/api/recipes', require('./api/recipe'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
