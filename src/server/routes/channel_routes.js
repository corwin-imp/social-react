var Channel = require('../models/Channel')
var bodyparser = require('body-parser')
var User = require('../models/User.js')
module.exports = function(router) {
  router.use(bodyparser.json())

  // deprecating this route since it just gets all channels
  router.get('/channels', function(req, res) {
    Channel.find({}, { name: 1, id: 1, _id: 0 }, function(err, data) {
      if (err) {
        console.log(err)
        return res.status(500).json({ msg: 'internal server error' })
      }

      res.json(data)
    })
  })
  router.post('/delete-channel', function(req, res) {
    Channel.findOne({ id: req.body.channel }, function(err, data) {
      console.log('data', data)
      let users = data.between
      console.log('users', users)

      User.find({ _id: { $in: users } }, function(er, dataUser) {
        dataUser.forEach(function(item, i, arr) {
          console.log('arr', dataUser)
          let arrUs = item.local.channels
          arrUs.splice(arrUs.indexOf(req.body.channel), 1)
          dataUser[i].local.channels = arrUs
          dataUser[i].save()
        })
      })
    }).remove(function(err) {
      if (err) {
        console.log(err)
        return res.status(500).json({ msg: 'internal server error' })
      }
      res.json('success')
    })
  })
  router.post('/my-channels', function(req, res) {
    Channel.find(
      { id: { $in: req.body.channels } },
      { name: 1, id: 1,between: 1, _id: 0 },
      function(err, data) {
        if (err) {
          console.log(err)
          return res.status(500).json({ msg: 'internal server error' })
        }

        res.json(data)
      }
    )
  })
  // this route returns all channels including private channels for that user
  router.get('/channels/:name', function(req, res) {
    Channel.find(
      { $or: [{ between: req.params.name }, { private: false }] },
      { name: 1, id: 1, private: 1, between: 1, _id: 0 },
      function(err, data) {
        if (err) {
          console.log(err)
          return res.status(500).json({ msg: 'internal server error' })
        }

        res.json(data)
      }
    )
  })

  // post a new user to channel list db
  router.post('/channels/new_channel', function(req, res) {
    var newChannel = new Channel(req.body)
    console.log('req', req.body)
    newChannel.save(function(err, data) {
      if (err) {
        console.log(err)
        return res.status(500).json({ msg: 'internal server error' })
      }
      let UsersId = req.body.between

      UsersId.forEach(function(item, i, arr) {
        User.findById(item, function(err, us) {
          if (err) {
            console.log(err)
            return res.status(500).json({ msg: 'internal server error' })
          }
          let arr = us.local.channels
          var strId = req.body.id.toString()
          arr.push(strId)
          us.local.channels = arr
          console.log('us', us)
          us.save(function(err) {
            if (err) {
              console.log(err)
              return res.status(500).json({ msg: 'internal server error' })
            }
          })
        })
      })
      res.json(data)
    })
  })
}
