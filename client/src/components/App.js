import React, { Component } from 'react';
import axios from 'axios';
import RelatedLists from './carousel/RelatedLists';

class App extends Component {
  constructor() {
    super();
    this.state = {
      room: {}
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/room/15').then(({ data }) => {
      this.setState({
        room: data[0]
      });
    });
  }

  render() {
    return this.state.room.related? <RelatedLists related={this.state.room.related} /> : <p>Waiting for data</p>;
  }
}

export default App;
