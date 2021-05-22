import React from 'react';
import { HashRouter, Route } from "react-router-dom";
import home from "./routes/home"
import main from "./routes/main"
import register from "./routes/register"
import stock_main from "./routes/stock_main"
import chatUserList from "./routes/chatUserList"
import chatRoom from "./routes/chatRoom"
import chatUserAdd from "./routes/chatUserAdd"
import test from "./routes/test"

function App() {
    return (
      <HashRouter>
        <Route path="/" exact={true} component={home} />
        <Route path="/main" component={main} />
        <Route path="/stock_main" component={stock_main} />
        <Route path="/register" component={register} />
        <Route path="/chatUserList" component={chatUserList} />
        <Route path="/chatRoom" component={chatRoom} />
        <Route path="/chatUserAdd" component={chatUserAdd} />
        <Route path="/test" component={test} />
      </HashRouter>
    );
  }

export default App;
