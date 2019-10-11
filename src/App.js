import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      endpoint: 'wss://www.bitmex.com/realtime?subscribe=trade:XBTUSD',
      tableData: [],
      price: '',
      size: '',
      side: '',
      timestamp: ''
    }
  }

  handleDataChange(){
    var jsonData = JSON.parse(this.state.tableData)
      if(jsonData.data !== undefined ){
        this.setState({
            price: jsonData.data[0].price,
            size: jsonData.data[0].size,
            side: jsonData.data[0].side,
            timestamp: jsonData.data[0].timestamp      
        })
      }
  }

  componentDidMount() {
    this.mexSocket = new WebSocket(this.state.endpoint);
    this.mexSocket.onmessage = event => {
      this.setState({
        tableData: event.data
      });
      this.handleDataChange();
    }
  }


  render() {
    return (
      <div>
        <h1>Bitmex Websocket Feed</h1>
        <h1>Price: {this.state.price}</h1>
        <h1>Size: {this.state.size}</h1>
        <h1>Direction: {this.state.side}</h1>
        <h1>Timestamp: {this.state.timestamp}</h1>
      </div>
    );
  }
}

export default App;
