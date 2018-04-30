var express = require('express');
var router = express.Router();

const checkJwt = require('../auth').checkJwt;
var test = require('../data/testData.json');
var initDay = require('../data/initDay.json');
var goals = require('../data/initialGoals.json');
var points = require('../data/initialPointValues.json');

router.get('/testData', function (req, res, next) {
  res.send(test);
});

//TODO: actually get the protected call to work
// //TODO: add error handling for db calls
// router.get('/today', checkJwt, function (req, res, next) {
//   console.log("testing~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
//   if(req.user){
//     console.log("user sub", req.user.sub);
//     var today = new Date();
//     var collection = req.db.collection('entries');
//     collection.find({userId: req.user.sub, date: today}).toArray(function (err, result) {
//       if (err) throw err;
//       //If no entry yet today
//       if (result && !result.length) {
//         var todaysInfo = initDay;
//         todaysInfo.userId = req.user.sub;
//         todaysInfo.date = today;
//         collection.insert(todaysInfo, function (err, result) {
//           if (err) throw err;
//           res.json(todaysInfo);
//         });
//       } else {
//         res.json(result);
//       }
//     })
//   }
// });

//TODO: add error handling for DB calls
router.get('/today/:userid', function (req, res, next) {
  var today = new Date();
  today.setHours(0,0,0,0);
  var collection = req.db.collection('entries');
  collection.find({userId: req.params.userid, date: today}).toArray(function (err, result) {
      if (err) throw err;
      //If no entry yet today
      if (result && !result.length) {
        var todaysInfo = initDay;
        todaysInfo.userId = req.params.userid;
        todaysInfo.date = today;
        collection.insert(todaysInfo, function (err, result) {
          if (err) throw err;
          res.json(todaysInfo);
        });
      } else {
        console.log("res", result);
        res.json(result);
      }
  })

})


//Get info about the logged in user
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
