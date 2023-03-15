import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import Button from "../button/button";
import useOnClickOutside from "../../hooks/use-on-click-outside";

import s from "./language-picker.module.scss";


interface LanguagePicker {
    handlerCloseLanguagePicker: () => void;
}

const LanguagePicker: React.FC<LanguagePicker> = ({ handlerCloseLanguagePicker }) => {

    const { i18n } = useTranslation();
    const languagePickerRef = useRef<HTMLDivElement | null>(null);

    const changeLg = (ln: string) => {
        //TODO: Backend Zapros
        i18n.changeLanguage(ln)
            .catch(error => {
                throw new Error(error);
            });
    };

    useOnClickOutside(languagePickerRef, handlerCloseLanguagePicker);

    return (
        <div className={s.languagePicker} ref={languagePickerRef}>
            <Button className={s.languagePickerItem} type={"blank"} onClick={() => changeLg("am")}>ARM</Button>
            <Button className={s.languagePickerItem} type={"blank"} onClick={() => changeLg("ru")}>RU</Button>
            <Button className={s.languagePickerItem} type={"blank"} onClick={() => changeLg("en")}>EN</Button>
        </div>
    );
};

export default LanguagePicker;
