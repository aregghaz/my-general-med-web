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
import Film from "./pages/site-pages/film/moves";
import NotFound from './pages/site-pages/not-found/not-found'
import Serial from './pages/site-pages/serial/serial'
import MovesItem from "./pages/site-pages/film/item/moves";
import SerialItem from "./pages/site-pages/serial/item/serial";



const App = (): JSX.Element => (
    <Provider store={store}>
        <Router>
            <Site path="/">
                <Home path="/"/>
                <Film path="/all/films"/>
                <Serial path="/all/serials"/>
                <MovesItem path="/films/:slug"/>
                <SerialItem path="/serials/:slug"/>
                <NotFound default/>
            </Site>

            {/*<LoginWrapper path="/admin-login"/>*/}

            <PrivateRoute path="/admin">

            </PrivateRoute>

        </Router>
    </Provider>
)
ReactDOM.render(<App/>, document.getElementById('kinomino'))
