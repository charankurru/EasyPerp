var express = require('express');

var router = express.Router();
var monk = require('monk');
// var db = monk('localhost:27017/easyprep');
var db = monk(
  process.env.MONGODB_URL ||
    'mongodb+srv://charan:bharathi@cluster0-2hbtz.mongodb.net/easyPrep?retryWrites=true&w=majority'
);
var perdet = db.get('personalDetails');
var acadet = db.get('AcademicDetails');
var perskill = db.get('personlSkill');
var techdet = db.get('techicalSkills');
var session = db.get('login&sign');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/forms', function (req, res, next) {
  res.render('index');
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
// finding the data

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

// sign up
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

//login
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
      res.redirect('/forms');
    } else {
      console.log(err);
    }
  });
});

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
        res.render('output', { project: docs });
      }
    });
  }
});
module.exports = router;
