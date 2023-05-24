import React, {ChangeEvent, useEffect, useState} from "react";
import Button from "../../../components/button/button";
import { useTranslation } from "react-i18next";
import { Formik, FormikHelpers, FormikValues } from "formik";
import Input from "../../../components/input/input";
import { login } from "../../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../../store/selectors";
import { useNavigate } from "@reach/router";
import Password from "../../../components/password/password";

import s from "./login-wrapper.module.scss";
import validationRules from "../../../utils/validationRule";
import {IItem} from "../../layouts/templates/formik-handler/formik-handler";
// import cls from "../../../components/password/password.module.scss";


interface ILoginWrapper {
    path: string;
}


const LoginWrapper: React.FC<ILoginWrapper> = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(getUserData);
    const [isLoading, setLoading] = useState(false);
    const [userFound, setUserFound] = useState(true);
    const submit = async (values: FormikValues, { setSubmitting }: FormikHelpers<FormikValues>) => {
        setSubmitting(true);
        const formData: FormData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);
        await dispatch(login(formData));
        setLoading(true);
        setUserFound(!!user)
    };

    const fields: Array<IItem> = [
        { name: "email", type: "input", label: "trip_type" },
        { name: "password", type: "password", label: "daysOnWeek" },
    ];

    const requiredFields = [
        "email",
        "password"
    ]

    const validate = (values: FormikValues) => validationRules(values, requiredFields, fields, t);

    useEffect(() => {
        if (user) {
            if (user && user.role == "vendor") {
                navigate("/dashboard");
            } else if (user && user.role == "admin") {
                navigate("/admin/dashboard");
            } else if (user && user.role == "operator") {
                navigate("/operator");
            } else {
                navigate("/login");
            }
        } else {
            navigate("/login");
        }
    }, [user]);
    return (<>

            <div className={s.login}>
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    } as FormikValues}
                    onSubmit={submit}
                    validate={(values: FormikValues) => validate(values)}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({ values, errors, handleSubmit, handleChange }) => (
                        <form id={"form"} onSubmit={handleSubmit} className={s.form}>
                            {/*<h3> {t("login")} </h3>*/}
                            <div className={s.logoDiv}>
                                <img src={`../../images/logo.png`} alt="logo" />
                            </div>
                            <div style={{position: "relative"}}>
                                <Input
                                    label={t("email")}
                                    placeholder={"Email"}
                                    name={"email"}
                                    type={"text"}
                                    inLogin={true}
                                    onChange={handleChange}
                                    value={values.email}
                                    error={errors["email"]}
                                />
                            </div>
                            {/*<Input*/}
                            {/*    label={t("password")}*/}
                            {/*    name={"password"}*/}
                            {/*    type={"password"}*/}
                            {/*    onChange={handleChange}*/}
                            {/*    value={values.password}*/}
                            {/*/>*/}
                            <Password
                                name={"password"}
                                value={values.password}
                                placeholder={"Password"}
                                // className={cls.passwordWrapper}
                                onChange={handleChange}
                                label={t("password")}
                                error={errors["password"]}
                            />
                            {!userFound && <span className={s.userNotFound}>Email or password are incorrect</span>}
                            <div className={s.actions}>
                                <Button isSubmit type={"green"} onClick={handleSubmit}>{t("sign_in")}</Button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </>
    );
};
export default LoginWrapper;
