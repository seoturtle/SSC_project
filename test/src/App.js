import React from 'react';
import { HashRouter, Route } from "react-router-dom";
import home from "./routes/home"
import main from "./routes/main"
import register from "./routes/register"
import stock_main from "./routes/stock_main"
import search from "./routes/search"
import chat from "./routes/chat"

function App() {
    return (
      <HashRouter>
        <Route path="/" exact={true} component={home} />
        <Route path="/main" component={main} />
        <Route path="/stock_main" component={stock_main} />
        <Route path="/register" component={register} />
        <Route path="/search" component={search} />
        <Route path="/chat" component={chat} />
      </HashRouter>
    );
  }

export default App;
