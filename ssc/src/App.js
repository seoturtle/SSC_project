import React, { Component } from 'react';
import { HashRouter, Route } from "react-router-dom";
import home from "./routes/home"
import main from "./routes/main"

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Route path="/" exact={true} component={home} />
        <Route path="/main" component={main} />
      </HashRouter>
    );
  }
}

export default App;
