import React from "react";

import { IOption } from "../components/select/select";

export enum Links {
    traditionalCrafts = "traditional-handicrafts",
    culturalCustoms = "cultural-traditions",
    services = "services",
    beneficiary = "beneficiaries",
    handmadeProducts = "handmade-products",
    aboutUs = "about-us",
}

export enum OrderMode {
    pending = "pending",
    cancel = "cancel",
    accepted = "accepted",
    done = "done",
    delayed = "delayed"
}

export enum MyAccountMode {
    personal_details = 1,
    my_services,
    my_orders,
    security,
    log_out
}

export enum AuthMode {
    modalClose,
    login,
    register,
    forgetPassword,
    successMessage
}

export enum UserType {
    beneficiary,
    tourOperator,
    operator
}

export enum RadioType {
    Recommended = "",
    Newest = "",
    Lowest_price = "",
    Highest_price = ""
}


export const weekDay: Array<string> =
    ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const months: Array<IOption> = [
    { id: 1, value: "January", label: "January" },
    { id: 2, value: "February", label: "January" },
    { id: 3, value: "March", label: "January" },
    { id: 4, value: "April", label: "January" },
    { id: 5, value: "May", label: "January" },
    { id: 6, value: "June", label: "January" },
    { id: 7, value: "July", label: "January" },
    { id: 8, value: "August", label: "January" },
    { id: 9, value: "September", label: "January" },
    { id: 10, value: "October", label: "January" },
    { id: 11, value: "November", label: "January" },
    { id: 12, value: "December", label: "January" }
];
