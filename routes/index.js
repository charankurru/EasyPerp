var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/easyPrep');
// var db = monk(
//   process.env.MONGODB_URL ||
//     'mongodb+srv://charan:bharathi@cluster0-2hbtz.mongodb.net/easyPrep?retryWrites=true&w=majority'
// );
var perdet = db.get('personalDetails');
var acadet = db.get('AcademicDetails');
var perskill = db.get('personlSkill');
var techdet = db.get('techicalSkills');
var session = db.get('login&sign');

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/auth/google/redirect', passport.authenticate('google'), function (
  req,
  res
) {
  console.log(req.user);
  //res.send(req.user);
  //res.red('/');
});

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  session.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID:
        '634939131360-3gt9tmteblbkdbpes15pb6ba3s6he9ai.apps.googleusercontent.com',
      clientSecret: 'zmjBfvEiqvU8SlCxjfl56pVM',
      callbackURL: '/auth/google/redirect',
    },
    function (accessToken, refreshToken, profile, done) {
      // check if user already exists in our own db
      // session.findOne({ _id: profile.id },function(err,docs) {
      //   if (docs) {
      //     // already have this user
      //     console.log('user is: ', docs);
      //     done(null, docs);
      //   } else {
      // if not, create user in our db
      // new User({
      //   googleId: profile.id,
      //   username: profile.displayName,
      // })
      session.insert(profile.displayName, profile.id, function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log('created new user: ', newUser);
          done(null, newUser);
        }
      });
    }
    //     });
    //   }
  )
);

//_______________________________________________________________________________________________________________________________
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home', { title: 'Express' });
});
//________________________________________________________________________________________________________________________
/*posting the data form all forms into respective collections*/

router.post('/postdata', function (req, res, next) {
  cons = req.body.lastname;
  //console.log(cons);
  perdet.insert(req.body, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
    }
  });
});

router.post('/posdata', function (req, res, next) {
  console.log(req.body);
  acadet.insert(req.body, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
    }
  });
});

router.post('/podata', function (req, res, next) {
  console.log(req.body);
  techdet.insert(req.body, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
    }
  });
});

router.post('/pdata', function (req, res, next) {
  console.log(req.body);
  perskill.insert(req.body, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
    }
  });
});
//______________________________________________________________________________________________________________________________
// rendering the second page

router.get('/second', function (req, res, next) {
  res.render('second');
});
//_______________________________________________________________________________________________________________________
// finding the data previosly used for rendering the data into temp arrays

router.post('/getAdata', function (req, res, next) {
  //console.log(req.body);
  bhar = req.body.a;
  perdet.find({ lastname: bhar }, function (err, docs) {
    if (docs) {
      console.log(docs);
      res.send(docs);
    }
  });
});

router.post('/getBdata', function (req, res, next) {
  //console.log(req.body);
  bhar = req.body.b;
  acadet.find({ lastname: bhar }, function (err, docs) {
    if (docs) {
      console.log(docs);
      res.send(docs);
    }
  });
});
//____________________________________________________________________________________________________________________

// editing the data
router.post('/edit', function (req, res) {
  console.log(req.body);
  perdet.update({ _id: req.body._id }, { $set: req.body }, function (
    err,
    docs
  ) {
    if (err) {
      console.log(err);
    } else {
      res.send(docs);
    }
  });
});
//____________________________________________________________________________________________________________________

// sign up__________________________________________________________________________________________________________
router.post('/signup', function (req, res, nxt) {
  session.insert(req.body, function (err, docs) {
    if (err) {
      console.log('err');
    } else {
      console.log(docs);
      res.redirect('/');
    }
  });
});

//login____________________________________________________________________________________________________________________
router.post('/login', function (req, res) {
  var uname = req.body.Username;
  var pws = req.body.password;
  session.findOne({ Username: uname, password: pws }, function (err, docs) {
    if (!docs) {
      res.render('home', { error: 'invalid credentials' });
    } else if (docs) {
      delete docs.password;
      req.session.usable = docs; // we have assigned docs to an object called usable
      console.log(req.session.usable);
      res.render('index', { profile: req.session.usable });
    } else {
      console.log(err);
    }
  });
});

// proceeding the data into frontend___________________________________________________________________________________________________
router.get('/proceed', function (req, res) {
  if (req.session && req.session.usable) {
    res.locals.usable = req.session.usable;
    perdet.find({ lastname: req.session.usable.Username }, function (
      err,
      docs
    ) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
        personal_details = docs;
        //res.render('output', { project: docs });
      }
    });

    acadet.find({ lastname: req.session.usable.Username }, function (
      err,
      docs
    ) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
        academic_details = docs;
        res.render('output', {
          data1: personal_details,
          data2: academic_details,
        });
      }
    });

    perskill.find({ lastname: req.session.usable.Username }, function (
      err,
      docs
    ) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
        perskill_details = docs;
      }
    });

    techdet.find({ lastname: req.session.usable.Username }, function (
      err,
      docs
    ) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
        techical_details = docs;
        res.render('output', {
          data1: personal_details,
          data2: academic_details,
          data3: perskill_details,
          data4: techical_details,
        });
      }
    });
  }
});

// logout___________________________________________________________________________________________________________________________

router.get('/logout', function (req, res) {
  req.session.reset();
  res.redirect('/');
});

// getting the users only data________________________________________________________________________________________________________
router.get('/getdata', function (req, res, nxt) {
  if (req.session && req.session.usable) {
    res.locals.usable = req.session.usable;
    perdet.find({ lastname: req.session.usable.Username }, function (
      err,
      docs
    ) {
      if (err) {
        console.log(err);
      } else {
        res.send(docs);
      }
    });
  }
});

router.get('/getdat', function (req, res, nxt) {
  if (req.session && req.session.usable) {
    res.locals.usable = req.session.usable;
    acadet.find({ lastname: req.session.usable.Username }, function (
      err,
      docs
    ) {
      if (err) {
        console.log(err);
      } else {
        res.send(docs);
      }
    });
  }
});

router.get('/getda', function (req, res, nxt) {
  if (req.session && req.session.usable) {
    res.locals.usable = req.session.usable;
    techdet.find({ lastname: req.session.usable.Username }, function (
      err,
      docs
    ) {
      if (err) {
        console.log(err);
      } else {
        res.send(docs);
      }
    });
  }
});

router.get('/getd', function (req, res, nxt) {
  if (req.session && req.session.usable) {
    res.locals.usable = req.session.usable;
    perskill.find({ lastname: req.session.usable.Username }, function (
      err,
      docs
    ) {
      if (err) {
        console.log(err);
      } else {
        res.send(docs);
      }
    });
  }
});

module.exports = router;
