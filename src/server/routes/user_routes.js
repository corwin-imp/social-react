'user strict'

var bodyparser = require('body-parser')

var User = require('../models/User.js')

module.exports = function loadUserRoutes(router, passport) {
  router.use(bodyparser.json())

  router.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
      session: false,
      successRedirect: '/chat',
      failureRedirect: '/',
    })
  )

  router.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
      session: false,
      successRedirect: '/chat',
      failureRedirect: '/',
    })
  )

  router.post('/items/add', (req, res) => {
    let dbata = req.body

    const newUser = new User({
      username: dbata[0],
      age: dbata[1],
      gender: dbata[2],
      email: dbata[3],
      date: new Date(),
      city: '',
      country: '',
      audio: [],
      video: [],
      photos: [],
    })
    newUser.save(function(err, data) {
      if (err) {
        console.log(err)
        return res.status(500).json({ msg: 'internal server error' })
      }
      console.log(dbata[0])

      res.json(data)
    })
  })

  router.post('/items/delete', (req, res) => {
    let id = req.body.id
    console.log(id)
    User.findById(id).remove(function(err, doc) {
      if (err) {
        console.log(err)
        return res.status(500).json({ msg: 'internal server error' })
      }
      res.json('success')
    })
  })
  router.post('/items/update', (req, res) => {
    console.log('update', req.body)
    let id = req.body.id
    let data = req.body.data
    User.findById(id).update({$set:{
    "local.username":data.name,
        "local.age": data.age,
      "local.gender": data.gender,
          "local.email": data.email,
      "local.city": data.city,
          "local.country": data.country
    }}, function(err) {
      if (err) {
        console.log(err)
        return res.status(500).json({ msg: 'internal server error' })
      }
      res.json('update')
    })
  })
  router.post('/set-picture', (req, res) => {
    console.log('update', req.body)
    let id = req.body.id
    let choose = req.body.choose
    User.findById(id).update(
      {
        $set: {
          'local.picture': choose,
        },
      },
      function(err) {
        if (err) {
          console.log(err)
          return res.status(500).json({ msg: 'internal server error' })
        }
        res.json('update')
      }
    )
  })
  router.post(
    '/sign_up',
    passport.authenticate('local-signup', { session: false }),
    function(req, res) {
      console.log('user add')
      res.json(req.user)
    }
  )

  router.post(
    '/sign_in',
    passport.authenticate('local-login', { session: false }),
    function(req, res) {
      res.json(req.user)
    }
  )

  router.get('/signout', function(req, res) {
    req.logout()
    res.end()
  })

  router.get('/load_auth_into_state', function(req, res) {
    res.json(req.user)
  })

  router.post('/get_user', function(req, res) {
    var userId = req.body.userId
    User.findById(userId, function(err, data) {
      console.log('dataItem', data)
      if (err) {
        console.log(err)
        return res.status(500).json({ msg: 'internal server error' })
      }
      res.json(data)
    })
  })
  // get usernames for validating whether a username is available
  router.get('/all_usernames', function(req, res) {
    User.find(
      { 'local.username': { $exists: true } },
      { 'local.username': 1, _id: 0 },
      function(err, data) {
        console.info('dataItems', data)
        if (err) {
          console.log(err)
          return res.status(500).json({ msg: 'internal server error' })
        }
        res.json(data)
      }
    )
  })

  router.post('/items/', (req, res) => {

    let findObj = {};

    if(Object.keys(req.body).length){
      findObj = req.body;
      if(req.body.name){
        let name = new RegExp(req.body.name, "i");
        findObj['local.username'] =  name;
        delete findObj.name;
      }
      if(req.body['local.country']){
        let country = new RegExp(req.body['local.country'], "i");
        findObj['local.country'] =  country;

      }
      if(req.body['local.city']){
        let city = new RegExp(req.body['local.city'], "i");
        findObj['local.city'] =  city;
      }
      if(req.body['ageTo'] && req.body['ageFr']){
        findObj['local.age'] =  { $lte:req.body['ageTo'],$gte:req.body['ageFr'] };
        delete findObj['ageTo'];
        delete findObj['ageFr'];
      }else{
        if(req.body['ageTo']){

          findObj['local.age'] =  { $lte:req.body['ageTo'] };
          delete findObj['ageTo'];
        }
        if(req.body['ageFr']){

          findObj['local.age'] =  { $gte:req.body['ageFr'] };
          delete findObj['ageFr'];
        }
      }

    }

    console.log('body',findObj);
    User.find(findObj,
      {
        'local.username': 1,
        _id: 1,
        'local.age': 1,
        'local.picture': 1,
        'local.gender': 1,
        'local.city': 1,
        'local.country': 1,
      },
      function(err, data) {
        console.info('data', data)
        if (err) {
          console.log(err)
          return res.status(500).json({ msg: 'internal server error' })
        }
        res.json(data)
      }
    )
  })
}
