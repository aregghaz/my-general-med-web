import React from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";

interface IBackDropSearch {
    handlerCloseBackDropSearch?: () => void;
    handlerSubmit: (event: { search: string }) => void;
}

const BackDropSearch: React.FC<IBackDropSearch> = ({ handlerSubmit }) => {
    const { t } = useTranslation();

    return (
        <>
            <Formik
                initialValues={{
                    search: ""
                }}
                onSubmit={handlerSubmit}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {
                    ({ values, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit} style={{ height: "100%" }}>
                            <input
                                name={"search"}
                                value={values.search}
                                type={"text"}
                                placeholder={t("search")}
                                onChange={handleChange}

                            />
                        </form>
                    )
                }
            </Formik>
        </>
    );
};

export default BackDropSearch;
