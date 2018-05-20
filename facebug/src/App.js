import React, {Component} from 'react'

class App extends Component {
  constructor(props){
    super(props)
    this.state = 
      {
        onlineUsers: 1,
      }
  }

componentDidMount() {
  this.socket = new WebSocket('ws://localhost:3001/')
    this.socket.onopen = (event) => {
      this.socket.onmessage = (event) => {
      let messagesA = JSON.parse(event.data)
      console.log(messagesA)
        switch (messagesA.type){
          case "userUpdate":
              this.setState({
                onlineUsers: messagesA.userCount
              })
          break;
          default:
        }
      };
    };
  }
  render() {
    return (
    <div>
      <h1>{this.state.onlineUsers} USERS ONLINE</h1>
    </div>)
  }
}


export default App;
