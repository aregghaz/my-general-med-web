import React from "react";
import Select, { IOption, IOptionMultiselect } from "../../../../components/select/select";
import { FormikValues } from "formik";
import TextField from "../../../../components/text-field/text-field";
import Textarea from "../../../../components/textarea/textarea";
import Input from "../../../../components/input/input";
import Checkbox from "../../../../components/checkbox/checkbox";
import RichText from "../../../../components/rich-text/rich-text";
import { useTranslation } from "react-i18next";
///import DataPicker from "../../../../components/data-picker/data-picker";
import SingleFileUpload from "../../../../components/single-file-upload/single-file-upload";
import getFieldLabel from "../../../../utils/getFieldLabel";
import TimePickers from "../../../../components/time-picker/timepicker";
import DataPicker from "../../../../components/data-picker/data-picker";
import Autocomplete from "../../../../components/autocomplate/autocomplete";
import Password from "../../../../components/password/password";

export interface IItem {
    type?: "input" | "password" | "autocomplete" | "timePicker" | "checkbox" | "richText" | "textarea" | "select" | "file" | "textField" | "radio" | "datepicker" | "multiSelect" | "hidden";
    inputType?: string;
    name: string;
    value?: string | boolean | File | IOption;
    placeholder?: string;
    label?: string;
    selectOptions?: Array<IOption> | Array<IOptionMultiselect>;
}

interface IFormikHandler {
    item: IItem;
    handleChange: (e: React.ChangeEvent<any>) => void;
    values: FormikValues;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    selectOptions?: any;
    requiredFields?: Array<string>;
    errors?: any;
    handleDrawMap?: any;
    autoCompleteRef?: any;
    selectRange?: boolean;
    className?: string;
}

const FormikHandler: React.FC<IFormikHandler> = (
    {
        item,
        errors,
        values,
        handleChange,
        setFieldValue,
        selectOptions,
        className,
        selectRange,
        autoCompleteRef,
        handleDrawMap,
        requiredFields
    }) => {
    const { t } = useTranslation();

    switch (item.type) {
        case "input":
            return (
                <>
                    {/* {errors[item.name] && <div >{errors[item.name] }</div>} */}

                    <Input
                        name={item.name}
                        value={values[item.name]}
                        type={item.inputType}
                        className={className}
                        onChange={handleChange}
                        placeholder={t(item.placeholder)}
                        label={getFieldLabel(t, item.label, item.name, requiredFields)}
                        error={errors[item.name]}
                    />
                </>
            );
        case "password":
            return (
                <Password
                    name={item.name}
                    value={values[item.name]}
                    type={item.inputType}
                    className={className}
                    onChange={handleChange}
                    placeholder={t(item.placeholder)}
                    label={getFieldLabel(t, item.label, item.name, requiredFields)}
                    error={errors[item.name]}
                />
            );
        case "checkbox":
            return (
                <Checkbox
                    className={className}
                    name={item.name}
                    label={item.label}
                    checked={values[item.name]}
                    handlerCheckbox={() => setFieldValue(item.name, !values[item.name])}
                />
            );
        case "richText":
            return (
                // TODO:  type in function handlerEditorChange
                <RichText
                    handleEditorChange={(content, editor) => {
                        console.log(content, editor);
                    }}
                    initialValue={item.name}
                />
            );
        case "textarea":
            return (
                <Textarea
                    name={item.name}
                    onChange={handleChange}
                    value={values[item.name]}
                    label={t(item.label)}
                    placeholder={item.placeholder}
                />
            );
        case "select":
            return (
                <Select
                    value={values[item.name]}
                    getOptionValue={(option: IOption) => option.value}
                    getOptionLabel={(option: IOption) => t(option.label)}
                    options={selectOptions ? selectOptions[item.name] : selectOptions}
                    /// options={selectOptions}
                    onChange={(option: IOption) => setFieldValue(item.name, option)}
                    //  label={t(item.label)}
                    isSearchable={false}
                    name={item.name}
                    placeholder={t(item.label)}
                />
            );
        case "file":
            return (
                <div style={{ width: "100%" }}>
                    <SingleFileUpload
                        name={item.name}
                        oldImage={values[item.name]}
                        onChange={(event) => {
                            setFieldValue(item.name, event.currentTarget.files[0]);
                        }}
                        type={item.inputType}
                        setFieldValue={setFieldValue}
                        label={t(item.label)}
                        media={"image"}
                        value={values}
                        error={errors[item.name]}
                    />
                </div>
            );
        case "textField":
            return (
                <TextField
                    name={item.name}
                    value={values[item.name]}
                    type={item.inputType}
                    placeholder={item.placeholder}
                    onChange={handleChange}
                    label={item.label}
                />
            );
        case "multiSelect":

            return (
                <Select
                    value={values[item.name]}
                    getOptionValue={(option: IOption) => option.value}
                    getOptionLabel={(option: IOption) => t(option.label)}
                    options={values.selectOptions ? values.selectOptions[item.name] : selectOptions[item.name]}
                    onChange={(option: IOption) => setFieldValue(item.name, option)}
                    label={t(item.label)}
                    isSearchable={true}
                    name={item.name}
                    isMulti={true}
                    placeholder={t(item.placeholder)}
                />
            );
        case "datepicker":
            return (
                <DataPicker
                    name={item.name}
                    setFieldValue={setFieldValue}
                    selectRange={selectRange}
                    ///  handleChange={handleChange}
                    label={t(item.label)}
                    value={values[item.name]}
                />
            );
        case "timePicker":
            return (
                <TimePickers
                    label={getFieldLabel(t, item.label, item.name, requiredFields)}
                    error={errors[item.name]}
                    name={item.name}
                    setFieldValue={setFieldValue}
                    value={values[item.name]}
                />
            );
        case "autocomplete":
            return (
                <Autocomplete
                    name={item.name}
                    setFieldValue={setFieldValue}
                    values={values}
                    handleDrawMap={handleDrawMap}
                    handleChange={handleChange} />
            );
        default:
            return (
                <Input
                    name={item.name}
                    value={values[item.name]}
                    type={item.inputType}
                    onChange={handleChange}
                    // placeholder={item.placeholder}
                    label={item.label}
                />
            );
    }
};

export default FormikHandler;
