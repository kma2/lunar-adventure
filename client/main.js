'use strict'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Router, browserHistory } from 'react-router';
import store from './store';

import App from './components/App';

render (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}></Route>
        </Router>
    </Provider>,
    document.getElementById('main')
)
