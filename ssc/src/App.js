import React from 'react';
import { HashRouter, Route } from "react-router-dom";
import home from "./routes/home"
import main from "./routes/main"
import register from "./routes/register"
import stock_main from "./routes/stock_main"

function App() {
    return (
      <HashRouter>
        <Route path="/" exact={true} component={home} />
        <Route path="/main" component={main} />
        <Route path="/stock_main" component={stock_main} />
        <Route path="/register" component={register} />
      </HashRouter>
    );
  }

export default App;
