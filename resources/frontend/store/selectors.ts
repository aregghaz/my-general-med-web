import { AppStateType } from "./store";

export const getHomePageData = (state: AppStateType) => ({
    titles: state.homeReducer.titles,
    selectedTitle: state.homeReducer.selectedTitle,
    clients: state.homeReducer.clients,
    availableCount: state.homeReducer.availableCount,
    tripCount: state.homeReducer.tripCount,
    cancelCount: state.homeReducer.cancelCount,
    doneCount: state.homeReducer.doneCount,
    progressCount: state.homeReducer.progressCount
});
export const getAdminUsersData = (state: AppStateType) => ({
    userdata: state.adminUsersReducer.userdata,
    vendorCount: state.adminUsersReducer.vendorCount,
    operatorCount: state.adminUsersReducer.operatorCount

});
export const getClientData = (state: AppStateType) => ({
    clientById: state.clientReducer.clientById
});
export const getTabId = (state: AppStateType) => ({
    typeId: state.tabsReducer.tabId
});
export const getNotificationCount = (state: AppStateType) => ({
    count: state.NotificationReducer.count
});
export const getNotify = (state: AppStateType) => ({
    data: state.NotifyReducer.data,
    driverCount: state.NotifyReducer.driverCount,
    carCount: state.NotifyReducer.carCount,
    patientCount: state.NotifyReducer.patientCount,
    tripsCount: state.NotifyReducer.tripsCount,
});
export const getUserData = (state: AppStateType) => ({
    user: state.authReducer.user,
    loggedIn: state.authReducer.loggedIn
});

export const adminVendorUsers = (state: AppStateType) => ({
    userdata: state.adminVendorUsersReducer.userdata,
    operatorsCount: state.adminVendorUsersReducer.operatorsCount,
    driversCount: state.adminVendorUsersReducer.driversCount,
    carsCount: state.adminVendorUsersReducer.carsCount
});

export const getLoginError = (state: AppStateType) => ({ error: state.authReducer.error });






