import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Button from "../button/button";
import ArrowDown from "-!svg-react-loader!../../svgs/arrow-down.svg";

import styles from "./dropdown.module.scss";

interface IDropdown {
    title: string;
    children?: any;

}

const Dropdown: React.FC<IDropdown> = ({ title, children }) => {
    const { t } = useTranslation();
    const [isOpen, setOpen] = useState(false);
    const handleToggle = () => setOpen(!isOpen);

    return (
        <div className={styles.root}>
            <Button
                type="blank"
                onClick={handleToggle}
                className={styles.button}
            >
                <span className={styles.label}>{t(`admin:${title}`)}</span>
                <span className={`${styles.arrow} ${isOpen ? styles.rotatedArrow : ""}`}>
                    <ArrowDown />
                </span>
            </Button>
            {isOpen && <ul>{children}</ul>}
        </div>
    );
};
export default Dropdown;
Dropdown.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};
