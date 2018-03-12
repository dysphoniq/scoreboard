var express = require('express');
var router = express.Router();

var test = require('../data/testData.json');

router.get('/testData', function (req, res, next) {
  res.send(test);
});

router.get('/user/:userid', function (req, res, next) {
  //TODO: add error handling for db calls
  res.sendStatus(200);
  req.db.collection('users').find({ userId: req.params.userid }).toArray(function (err, result) {
    if (err) throw err;
    //If user does not have entry, initialize one
    if (!result.length) {
      console.log('none found?');
    } else {
      console.log('got something');
      console.log(result);
    }
    res.json({"test": "ack"});
  });
});

// simple API call, no authentication or user info
// router.get('/unprotected', function(req, res, next) {
//
//   req.db.collection('max_todo').find().toArray(function(err, results) {
//     if (err) {
//       next(err);
//     }
//
//     res.json({
//       todos: results
//     });
//   });
//
// });
//
// // checkJwt middleware will enforce valid authorization token
// router.get('/protected', checkJwt, function(req, res, next) {
//
//   req.db.collection('max_todo').find().toArray(function(err, results) {
//     if (err) {
//       next(err);
//     }
//
//     res.json({
//       todos: results
//     });
//   });
//
//   // the auth0 user identifier for connecting users with data
//   console.log('auth0 user id:', req.user.sub);
//
//   // fetch info about the user (this isn't useful here, just for demo)
//   const userInfoUrl = req.user.aud[1];
//   const bearer = req.headers.authorization;
//   fetch(userInfoUrl, {
//   	headers: { 'authorization': bearer },
//   })
//     .then(res => res.json())
//     .then(userInfoRes => console.log('user info res', userInfoRes))
//     .catch(e => console.error('error fetching userinfo from auth0'));
//
// });

module.exports = router;
