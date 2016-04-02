var express = require('express');
var router = express.Router();
var request  = require('request');
var oauth2  = require('simple-oauth2')({
  clientID: '082ece14-4bba-48bc-8020-bcd00611d3f1',
  clientSecret: 'cCkG0Op1UPEs5iPhCxbLxOwbf',
  site: 'https://home.nest.com/login',
  authorizationPath: '/oauth2',
  tokenPath: 'oauth2/access_token'
});

var authorization_uri = oauth2.authCode.authorizeURL({ state: 'emacs-is-awesome' });

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Skynode' });
});

router.get('/nest_oauth', function(req, res, next) {
  res.redirect(authorization_uri);
});

router.get('/oauth_callback', function(req, res, next){
  var code = req.query.code;

  request.post(
    'https://api.home.nest.com/oauth2/access_token',
    {
      form: {
        client_id: '082ece14-4bba-48bc-8020-bcd00611d3f1',
        code: req.query.code,
        client_secret: 'cCkG0Op1UPEs5iPhCxbLxOwbf',
        grant_type: 'authorization_code'
      }
    }, handleAccessTokenResponse
  );

  function handleAccessTokenResponse(error, response, body) {
    if (error) {
      res.render('index', { error: error })
      return;
    }

    var token = JSON.parse(body).access_token;
    res.render('index', { access_token: token });
  }
});

module.exports = router;
