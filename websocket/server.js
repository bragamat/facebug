/*jshint esversion:6*/
import Express from 'express'

const server = Express()
const SocketServer = require('ws').Server

const PORT = 3001

server.listen(PORT, ()=>{
  console.log(`listening to the port ${PORT}`)
})


