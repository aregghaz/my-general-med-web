import React from "react";
import ReactDOM from "react-dom";
import "./i18n";
import { Provider } from "react-redux";
import store from "./store/store";
import { Router } from "@reach/router";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import Site from "./pages/layouts/site/site";

// Site Pages
import Home from "./pages/vendor/home/home";
import NotFound from "./pages/vendor/not-found/not-found";
import LoginWrapper from "./pages/admin/login/login-wrapper";

// Admin Pages
import Dashboard from "./pages/admin/dashbord/dashboard";
import Users from "./pages/admin/users/list";
import Clients from "./pages/admin/clients/list";
import ClientEdit from "./pages/admin/clients/edit";
import ClientCreate from "./pages/admin/clients/create";
import Vendors from "./pages/admin/vendors/list";
import VendorEdit from "./pages/admin/vendors/edit/vendor";
import VendorCreate from "./pages/admin/vendors/create/vendor";
import Status from "./pages/admin/status/list";
import StatusCreate from "./pages/admin/status/create";
import StatusEdit from "./pages/admin/status/edit";
import VendorUsers from "./pages/vendor/users/list";
import VendorDriverCreate from "./pages/vendor/users/create/driver";
import VendorDriverEdit from "./pages/vendor/users/edit/driver";
import Cars from "./pages/vendor/cars/list";
import CarsCreate from "./pages/vendor/cars/create";
import CarsEdit from "./pages/vendor/cars/edit";
import OperatorCreate from "./pages/admin/vendors/create/operator";
import OperatorEdit from "./pages/admin/vendors/edit/operator";
import Show from "./pages/vendor/home/show";
import ShowAdmin from "./pages/admin/clients/show";
import Activity from "./pages/admin/users/activity";
import ActivityClient from "./pages/admin/clients/activity";
import VendorDashboard from "./pages/vendor/dashbord/dashboard";
import NotificationList from "./pages/admin/notification/notification";
import Notification from "./pages/vendor/notification/notification";
import PriceList from "./pages/admin/vendors/priseList";
// import Profile from "./pages/admin/profile/profile";
import VendorProfile from "./pages/vendor/profile/profile";
import TermsPage from "./pages/vendor/terms/terms"

const App = (): JSX.Element => (
    <Provider store={store}>
        <Router>
            <LoginWrapper path="/login" />
            <Site path="/">
                <VendorProfile path="/profile"/>
                <Home path="/trips" />
                <VendorDashboard path="/dashboard" />
                <Show path="/trip/:id" />
                <VendorUsers path="/users" />
                <VendorDriverEdit path="/users/driver/:id" />
                <VendorDriverCreate path="/users/driver/create" />
                <OperatorCreate path="users/operator/create" />
                <Cars path="/cars" />
                <CarsCreate path="/cars/create" />
                <CarsEdit path="/cars/:id" />
                <NotFound default />
                <Notification path="/notification" />
                <TermsPage path={"/terms"}/>
            </Site>
            <Site path="/operators">
                <Vendors path="vendors" />
                <VendorEdit path="vendors/:id/2" />
                <OperatorEdit path="vendors/:id/4" />
                <VendorCreate path="vendors/create/2" />
                <Clients path="trips" />
                <ClientEdit path="trips/:id" />
                <ClientCreate path="trips/create" />
                <NotificationList path="notification" />
            </Site>
            <Site path="/admin">
                {/*<Profile path="/profile"/>*/}
                <Dashboard path="/dashboard" />
                <Users path="/users/:id" />
                <Clients path="/trips" />
                <ShowAdmin path="/trip/:id" />
                <ClientEdit path="trips/:id" />
                <ClientCreate path="clients/create" />
                <Activity path="activity/:id" />
                <ActivityClient path="activity-client/:clientId" />
                <Vendors path="vendors" />
                <VendorEdit path="vendors/:id/2" />
                <OperatorEdit path="vendors/:id/4" />
                <VendorCreate path="vendors/create/2" />
                <PriceList path="priceList/:id" />
                <OperatorCreate path="vendors/create/4" />
                <Status path="status" />
                <StatusCreate path="addStatus/:statusId/create" />
                <StatusEdit path="changeStatus/:id/:statusId" />
                <NotificationList path="/notification" />
                <NotFound default />
            </Site>
        </Router>
    </Provider>
);
ReactDOM.render(<App />, document.getElementById("root"));
