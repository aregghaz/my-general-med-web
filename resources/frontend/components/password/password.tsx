import React, {useState} from "react"
import Input from "../input/input";
import getFieldLabel from "../../utils/getFieldLabel";
import {useTranslation} from "react-i18next";
import {IItem} from "../../pages/layouts/templates/formik-handler/formik-handler";
import {FormikValues} from "formik";
import Checkbox from "../checkbox/checkbox";
import cls from "./password.module.scss"
import s from "../input/input.module.scss";

interface Password {
    name: any;
    value: any;
    type?: any;
    className?: any;
    onChange: any;
    placeholder?: any;
    label: any;
    error?: any;
    isAsterisk?: boolean,
    ref?: any,
    autoComplete?: any
}

const Password:React.FC<Password> = ({
    name,
    value,
    type = "password",
    className,
    onChange,
    placeholder,
    label,
    error,
                                         isAsterisk,
    ref,
                                         autoComplete,
    }) => {
    const { t } = useTranslation();
    const [hidden, setHidden] = useState(true)

    const toggleHidden = () => {
        setHidden(!hidden)
    }
    return (
        <div className={cls.passwordWrapper}>
            <div className={cls.top}>
                {label &&
                    <label
                        className={`${s.label}`}
                        htmlFor={name}
                        style={{
                            color: error ? "red" : value ? "#19347a" :  "#C4C4C4"
                        }}
                    >
                        {`${label}`} {isAsterisk && <span>*</span>}
                    </label>}
            </div>
            <div className={cls.bottom} style={{border: error ? "1px solid red" : ""}}>
                <div className={cls.passwordInputWrapper}>
                    <>
                        {error && <div className={s.error}>{error}</div>}
                        <input
                            id={name}
                            name={name}
                            className={`${s.input} ${!String(value ?? "") ? s.blankInput : ""}  ${className} ${error && type !== "password" && s.errorBorder}`}
                            type={hidden ? "password" : "text"}
                            placeholder={placeholder}
                            value={value}
                            ref={ref}
                            onBlur={onChange}
                            onChange={onChange}
                            // onFocus={(event) => {
                            //     if (!event.target.value) {
                            //         event.target.parentElement.children[0].classList.add("aaa")
                            //     }
                            // }}
                            disabled={type === "disabled"}
                            autoComplete={"off"}
                        />
                    </>
                </div>
                <div className={cls.showPasswordWrapper}>
                    {/*Show Password:*/}
                    <input
                        className={cls.checkbox}
                        type={"checkbox"}
                        onChange={toggleHidden}
                    />
                </div>
            </div>
        </div>
    )
}

export default Password
