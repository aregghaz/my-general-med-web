import React, {useState} from "react"
import Input from "../input/input";
import getFieldLabel from "../../utils/getFieldLabel";
import {useTranslation} from "react-i18next";
import {IItem} from "../../pages/layouts/templates/formik-handler/formik-handler";
import {FormikValues} from "formik";
import Checkbox from "../checkbox/checkbox";
import cls from "./password.module.scss"

interface Password {
    name: any;
    value: any;
    type?: any;
    className?: any;
    onChange: any;
    placeholder?: any;
    label: any;
    error?: any;
}

const Password:React.FC<Password> = ({
    name,
    value,
    type,
    className,
    onChange,
    placeholder,
    label,
    error,
    }) => {
    const { t } = useTranslation();
    const [hidden, setHidden] = useState(true)

    const toggleHidden = () => {
        return setHidden(!hidden)
    }
    return (
        <div className={cls.passwordWrapper}>
           <div className={cls.passwordInputWrapper}>
               <Input
                   name={name}
                   value={value}
                   type={hidden ? "password" : "text"}
                   className={className}
                   onChange={onChange}
                   placeholder={placeholder}
                   label={label}
                   error={error}
               />
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
    )
}

export default Password
