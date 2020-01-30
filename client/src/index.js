import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { Switch, Route, Router } from 'react-router-dom';
import store from 'redux/store/index';
import { createBrowserHistory } from 'history';

if (process.env.NODE_ENV !== 'development') {
  console.log = () => { };
}
const hist = createBrowserHistory();
  

// ReactDOM.render(
// 	<Provider store={store}>
// 		<Router history={hist}>
// 			<Switch>
// 				<Route path='/' exact component={App} />
// 			</Switch>
// 		</Router>
// 	</Provider>, document.getElementById('root'));

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
