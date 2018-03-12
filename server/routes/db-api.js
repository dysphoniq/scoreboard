var express = require('express');
var router = express.Router();

var test = require('../data/testData.json');
var goals = require('../data/initialGoals.json');
var points = require('../data/initialPointValues.json');

router.get('/testData', function (req, res, next) {
  res.send(test);
});

router.get('/user/:userid', function (req, res, next) {
  //TODO: add error handling for db calls
  var collection = req.db.collection('users');
  collection.find({ userId: req.params.userid }).toArray(function (err, result) {
    if (err) throw err;
    //If user does not have entry, initialize one
    if (result && !result.length) {
      var userInfo = {
        "userId": req.params.userid,
        "goals": goals,
        "points": points
      }
      collection.insert(userInfo , function (err, result) {
        if (err) throw err;
        res.json(userInfo);
      })
    } else {
      res.json(result)
    }
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
