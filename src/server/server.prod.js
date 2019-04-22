'use strict'

import express from 'express'
import path from 'path'

import mongoose from 'mongoose'

import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import React from 'react'
import store from '../common/store/configureStore/configureStore'
import { RouterContext, match } from 'react-router'
import routes from '../common/routes'
import createHistory from 'history/createMemoryHistory'

import User from './models/User.js'
import passport from 'passport'
require('../../config/passport')(passport)
import SocketIo from 'socket.io'
import config from '../../config/config'
const app = express()
const { nameBase, portBase, hostUser } = config.db
var corsAnywhere = require('cors-anywhere')

const fileUpload = require('express-fileupload');

process.env.MONGOLAB_URI =
  process.env.MONGOLAB_URI || `mongodb://${hostUser}:${portBase}/${nameBase}`
process.env.PORT = process.env.PORT || 3000

// connect our DB
mongoose.connect(process.env.MONGOLAB_URI)

process.on('uncaughtException', function(err) {
  console.log(err)
})

app.use(passport.initialize())

let proxy = corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeaders: [], // Do not require any headers.
  removeHeaders: [], // Do not remove any headers.
})

/* Attach our cors proxy to the existing API on the /proxy endpoint. */
app.get('/proxy/:proxyUrl*', (req, res) => {
  req.url = req.url.replace('/proxy/', '/') // Strip '/proxy' from the front of the URL, else the proxy won't work.
  proxy.emit('request', req, res)
})
app.use(fileUpload());
//load routers
const messageRouter = express.Router()
const usersRouter = express.Router()
const channelRouter = express.Router()
const profilesRouter = express.Router()
const ftpRouter = express.Router()
require('./routes/message_routes')(messageRouter)
require('./routes/channel_routes')(channelRouter)
require('./routes/profiles_routes')(profilesRouter)
require('./routes/ftp_routes')(ftpRouter)
require('./routes/user_routes')(usersRouter, passport)
app.use('/api', messageRouter)
app.use('/api', usersRouter)
app.use('/api', profilesRouter)
app.use('/api', channelRouter)
app.use('/ftp', ftpRouter)
app.use('/', express.static(path.join(__dirname, '../..', 'static')))

app.get('/*', function(req, res) {
  const history = createHistory()
  const location = history.location

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err)
      return res.status(500).end('Internal server error')
    }

    if (!renderProps) {
      return res.status(404).end('Not found')
    }

    const InitialView = (
      <Provider className="root" store={store}>
        <div style={{ height: '100%' }}>
          <RouterContext {...renderProps} />
        </div>
      </Provider>
    )

    const initialState = store.getState()
    const html = renderToString(InitialView)
    res.status(200).end(renderFullPage(html, initialState))
  })
})

const server = app.listen(process.env.PORT, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('server listening on port: %s', process.env.PORT)
})

const io = new SocketIo(server, { path: '/api/chat' })
const socketEvents = require('./socketEvents')(io)

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/dist/bootstrap.min.css" />
        <link href="/dist/fontawesome-all.min.css" type="text/css" rel="stylesheet">
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" type="text/css" href="/dist/bundle.css">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <title>Social-react</title>
      </head>
      <body>
        <container id="react">${html}</container>
        <script>

        </script>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `
}
