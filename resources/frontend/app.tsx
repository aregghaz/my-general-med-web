import React from 'react'
import ReactDOM from 'react-dom'
import './i18n'
import {Provider} from 'react-redux'
import store from './store/store'
import {Router} from '@reach/router'
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import PrivateRoute from './pages/layouts/private-route/private-route'

import Site from './pages/layouts/site/site'


// Site Pages
import Home from './pages/site-pages/home/home'
import NotFound from './pages/site-pages/not-found/not-found'
import LoginWrapper from './pages/admin-pages/login/login-wrapper'


// Admin Pages
import Dashboard from './pages/admin-pages/dashbord/dashboard'
import Users from './pages/admin-pages/users/list'

const App = (): JSX.Element => (
    <Provider store={store}>
        <Router>
            <Site path="/">
                <Home path="/"/>
                {/* <Film path="/all/films"/> */}
                {/* <Serial path="/all/serials"/>
                <MovesItem path="/films/:slug"/>
                <SerialItem path="/serials/:slug"/> */}
                <NotFound default/>
            </Site>

            <LoginWrapper path="/admin-login"/>

            <PrivateRoute path="/admin">
                <Dashboard path="/"/>
                <Users path="/users"/>
                <NotFound default/>
            </PrivateRoute>

        </Router>
    </Provider>
)
ReactDOM.render(<App/>, document.getElementById('root'))
