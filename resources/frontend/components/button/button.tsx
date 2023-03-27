import React from "react";
import s from "./button.module.scss";

interface IButton {
    type: "primary" | "secondary" | "blank" | "green" | "transparent" | "adminUpdate"
    isSubmit?: boolean
    onClick?: () => void
    className?: string,
    children: any
}

const Button: React.FC<IButton> = (
    {
        isSubmit = false,
        onClick,
        children,
        type,
        className = ""
    }) => {
    let styleName: string;
    switch (type) {
        case  "primary"  :
            styleName = s.primary;
            break;
        case "secondary":
            styleName = s.secondary;
            break;
        case "blank":
            styleName = s.blank;
            break;
        case "transparent":
            styleName = s.transparent;
            break;
        case "green":
            styleName = s.green;
            break;
        case "adminUpdate":
            styleName = s.green + " " + s.update;
            break;
        default:
            styleName = s.primary;
            break;
    }
    return (
        <button
            type={isSubmit ? "submit" : "button"}
            onClick={onClick}
            className={`${styleName} ${className}`}
        >
            {children}
        </button>
    );
};
export default Button;
