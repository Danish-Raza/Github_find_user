import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Repo from './components/Repo';
import History from './components/History';
import { Provider } from "react-redux";
import store from './store';
import Form from './components/Form';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/history" component={History} />
            <Route exact path="/history/form" component={Form} />
            <Route exact path="/history/form/:id" component={Form} />
            <Route exact path="/user/:login" component={User} />
            <Route exact path="/user/:login/:id" component={Repo} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
