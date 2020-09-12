import React, {Component} from 'react';
import './App.css';
import {connect, sendMsg} from "./api";
import Header from "./components/header/Header";
import ChatHistory from "./components/ChatHistory";
import ChatInput from "./components/ChatInput";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      chatHistory : []
    }
  }

  send(event) {
    if (event.keyCode === 13) {
      sendMsg(event.target.value);
      event.target.value= "";
    }
  }

  render(){
    return (
      <div className="App">
        <Header />
        <ChatHistory chatHistory={this.state.chatHistory} />
        <ChatInput send = {this.send} />
      </div>
    );
  }

  componentDidMount() {
    connect((msg)=> {
      console.log("New message")
      // before it was prevState
      this.setState(prevState => ({
        chatHistory: [...this.state.chatHistory, msg]
      }))
      console.log(this.state.chatHistory);
    });
  }
}
export default App;
