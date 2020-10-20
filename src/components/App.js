import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import ResourceMap from './ResourceMap'
import Content from './Content'
import Container from 'react-bootstrap/Container';

class App extends Component {

  state = {
  }

  render() {
    return [
        <Content key="theContent" />
    ]
  };
}

export default App;

//const domContainer = document.querySelector('#app');
//ReactDOM.render(React.createElement(App), domContainer);
