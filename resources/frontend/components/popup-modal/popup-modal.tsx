import React, { FC } from "react";
import cls from "./popup-modal.module.scss";

interface IProps {
    isOpen: boolean;
    agreeWith: (b: boolean) => void;
    notAgreeWith: () => void;
}

const PopupModal: FC<IProps> = ({ isOpen, agreeWith, notAgreeWith }) => {

    // const []


    return (
        <>
            {
                isOpen &&
                <div className={cls.popup_container}>
                    <div className={cls.popup_body}>
                        <div className={cls.infoBox}>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium earum nesciunt
                                provident
                                quaerat
                                voluptates! Adipisci commodi iste molestiae, perferendis quidem quo rerum similique suscipit
                                ut
                                vero.
                                Aliquid consequatur eum omnis.
                            </p>

                        </div>
                        <div className={cls.popup_footer}>
                            <button
                                className={`${cls.popup_btn} ${cls.success}`}
                                onClick={() => agreeWith(true)}
                            >
                                Yes
                            </button>
                            <button
                                className={`${cls.popup_btn} ${cls.danger}`}
                                onClick={notAgreeWith}
                            >
                                No
                            </button>

                        </div>
                        <a href="/terms" target={"_blank"}>
                            Terms and conditions
                        </a>
                    </div>
                </div>
            }
        </>
    );
};

export default PopupModal;
