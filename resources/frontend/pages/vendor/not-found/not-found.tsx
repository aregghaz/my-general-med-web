import React from "react";
///import Header from '../../layouts/header/header'

import s from "./not-found.module.scss";

interface INotFound {
    default: boolean;
}

const NotFound: React.FC<INotFound> = () => {

    return (
        <>
            {/*<Header*/}
            {/*    img={ServicesBg}*/}
            {/*    pageTitle={''}*/}
            {/*/>*/}
            <div className={s.notFound}>
                <h2>404 NOT FOUND</h2>
            </div>
        </>
    );

};


export default NotFound;
