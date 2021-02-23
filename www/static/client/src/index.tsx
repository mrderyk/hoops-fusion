import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import store from './app/store';
import { App } from './app/App';
import Player from './features/personnel/components/Player';


let el = document.getElementById('app-container');
let app = (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/player/:key" component={Player} />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(app, el);