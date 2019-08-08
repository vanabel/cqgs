// ./server/app.js
'use strict'
const express = require('express')
const DB = require('./db')
const config = require('./config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const db = new DB('sqlitedb')
const app = express()
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

// CORS middleware
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie, Authorization');
  next()
}
app.use(allowCrossDomain)

router.post('/register', function (req, res) {
  db.insert([
    req.body.name,
    req.body.email,
    bcrypt.hashSync(req.body.password, 8)
  ],
    function (err) {
      if (err) return res.status(500).send('There was a poblem registering the user.\n'+err)
      db.selectByEmail(req.body.email, (err, user) => {
        if (err) return res.status(500).send('There was a poblem getting user.')
        let token = jwt.sign({ id: user.id }, config.secret, { 
          expiresIn: 86400 // expires in 1day
        })
        res.status(200).send({ auth: true, token: token, user: user })
      })
    })
})

router.post('/register-admin', function (req, res) {
  db.insertAdmin([
    req.body.name,
    req.body.email,
    bcrypt.hashSync(req.body.password, 8),
    1
  ],
    function (err) {
      if (err) return res.status(500).send('There was a poblem registering the user.')
      db.selectByEmail(req.body.email, (err, user) => {
        if (err) return res.status(500).send('There was a poblem getting user.')
        let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 // expires in 1day
        })
        res.status(200).send({ auth: true, token: token, user: user })
      })
    })
})

router.post('/login', (req, res) => {
  db.selectByEmail(req.body.email, (err, user) => {
    if (err) return res.status(500).send('Error on the server.')
    if (!user) return res.status(404).send('No user found.')
    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null })
    let token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // expires in 1day
    })
    res.status(200).send({ auth: true, token: token, user: user })
  })
})

router.post('/add', (req, res) => {
  db.insertData([
    req.body.userid,
    req.body.title,
    req.body.date,
    req.body.time,
    req.body.venue,
    req.body.speaker,
    req.body.affiliation,
    req.body.host,
    req.body.abst,
    req.body.supp
  ],
    function (err) {
      if (err) return res.status(500).send('There was a poblem when insert the data.')
      res.status(200).send('Data has been add to database successfully.')
    })
})

router.post('/get', (req, res) => {
  db.selectAllData(req.body.dateb, req.body.datee, (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).send('Error on the server.')
    }
    // console.log(data)
    res.status(200).json(data)
  })
})

router.post('/getall', (req, res) => {
  db.selectDataByUserId(req.body.userid, (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).send('Error on the server.')
    }
    // console.log(data)
    res.status(200).json(data)
  })
})

router.post('/del', (req, res, next) => {
  db.delete(req.body.id, (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).send('Error on the server.')
    }
    // console.log(data)
    res.status(200).send('The item has been deleted!')
  })
})

router.post('/edit', (req, res, next) => {
  db.selectById(req.body.id, (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).send('Error on the server.')
    }
    // console.log(data)
    res.status(200).json(data)
  })
})

router.post('/update', (req, res, next) => {
  db.updateById(req.body.data, (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).send('Error on the server.')
    }
    // console.log(data)
    res.status(200).send('Data has been successfully updated!')
  })
})

router.get('/search', (req, res) => {
  db.selectAllSearchData(req.query.q, (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).send('Error on the server.')
    }
    // console.log(data)
    res.status(200).json(data)
  })
})
app.use(router)
let port = process.env.VUE_APP_SPORT || 3000
app.listen(port, function () {
  console.log('Express server listening on port ' + port)
})
