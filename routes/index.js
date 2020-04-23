var express = require('express');
var router = express.Router();
var monk = require('monk');
//var db = monk('URI  || localhost:27017/easyprep');
var db = monk(
  'mongodb+srv://charan:bharathi@cluster0-2hbtz.mongodb.net/test?retryWrites=true&w=majority'
);
var perdet = db.get('personalDetails');
var acadet = db.get('AcademicDetails');
var perskill = db.get('personlSkill');
var techdet = db.get('techicalSkills');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
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
    res.send(docs);
  });
  0.628;
});
//____________________________________________________________________________________________________________________
module.exports = router;
