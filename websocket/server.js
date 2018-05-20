// server.js
const express = require('express')
const SocketServer = require('ws').Server

// Set the port to 3001
const PORT = 3001

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () =>
   console.log(`Listening on ${ PORT }`))

// Create the WebSockets server
const wss = new SocketServer({ server })

wss.on('connection', (ws) => { //Connecting to the server
  let clientUpdate = {type: "userUpdate", userCount: wss.clients.size}
  let outgoing = JSON.stringify(clientUpdate)
  wss.clients.forEach(function each(client){
    client.send(outgoing)
  });
  ws.on('message', (message) => { // receiving data FROM the app.jsx
    let data = JSON.parse(message)
    if(data.type == "newMessage"){
       let howManyUsers = wss.clients.size
        let dataUser = {
          numberOfUsers: howManyUsers,
          type: "newMessage"
        }
      wss.broadcast(JSON.stringify(dataUser))
    }
    else {
      console.lot(data.type)
    }
  })
  ws.on('close', () => {
    console.log('Client disconnected')
  })
})

wss.broadcast = (data)=> {
  console.log(data, " this is the data")
  wss.clients.forEach((client)=> {
    console.log( " this is the data")
    client.send(data)
    }
  )
}














