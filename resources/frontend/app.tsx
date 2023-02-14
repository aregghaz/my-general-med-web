import React from 'react'
import ReactDOM from 'react-dom'
import './i18n'
import {Provider} from 'react-redux'
import store from './store/store'
import {Router} from '@reach/router'
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import Site from './pages/layouts/site/site'

// Site Pages
import Home from './pages/vendor/home/home'
import NotFound from './pages/vendor/not-found/not-found'
import LoginWrapper from './pages/admin/login/login-wrapper'


// Admin Pages
import Dashboard from './pages/admin/dashbord/dashboard'
import Users from './pages/admin/users/list'
import Clients from './pages/admin/clients/list'
import ClientEdit from './pages/admin/clients/edit'
import ClientCreate from './pages/admin/clients/create'
import Vendors from './pages/admin/vendors/list'
import VendorEdit from './pages/admin/vendors/edit/vendor'
import VendorCreate from './pages/admin/vendors/create/vendor'
import Status from './pages/admin/status/list'
import StatusCreate from './pages/admin/status/create'
import StatusEdit from './pages/admin/status/edit'
import VendorUsers from './pages/vendor/users/list'
import VendorDriverCreate from './pages/vendor/users/create/driver'
import VendorDriverEdit from './pages/vendor/users/edit/driver'
import Cars from './pages/vendor/cars/list'
import CarsCreate from './pages/vendor/cars/create'
import CarsEdit from "./pages/vendor/cars/edit";
import OperatorCreate from "./pages/admin/vendors/create/operator";
import OperatorEdit from "./pages/admin/vendors/edit/operator";
import Show from "./pages/vendor/home/show";

const App = (): JSX.Element => (
    <Provider store={store}>
        <Router>
            <LoginWrapper path="/login"/>
            <Site path="/">
                <Home path="/"/>
                <Show path="/client/:id"/>
                <VendorUsers path="/users"/>
                <VendorDriverEdit path="/users/driver/:id"/>
                <VendorDriverCreate path="/users/driver/create"/>
                <Cars path="/cars"/>
                <CarsCreate path="/cars/create"/>
                <CarsEdit path="/cars/:id"/>
                <NotFound default/>
            </Site>
            <Site path="/operators">
                <Clients path="clients"/>
                <ClientEdit path='clients/:id'/>
                <ClientCreate path='clients/create'/>
            </Site>
            <Site path="/admin">
                <Dashboard path="/"/>
                <Users path="/users/:id"/>
                <Clients path="clients"/>
                <Show path="/client/:id"/>
                <ClientEdit path='clients/:id'/>
                <ClientCreate path='clients/create'/>
                <Vendors path="vendors"/>
                <VendorEdit path='vendors/:id/2'/>
                <OperatorEdit path='vendors/:id/4'/>
                <VendorCreate path='vendors/create/2'/>
                <OperatorCreate path='vendors/create/4'/>
                <Status path='status'/>
                <StatusCreate path='status/create'/>
                <StatusEdit path='changeStatus/:id'/>
                <NotFound default/>
            </Site>

        </Router>
    </Provider>
)
ReactDOM.render(<App/>, document.getElementById('root'))
