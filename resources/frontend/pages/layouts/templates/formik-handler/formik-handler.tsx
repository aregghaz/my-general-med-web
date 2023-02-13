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
import GooglePlacesAutocomplete, { geocodeByPlaceId } from "react-google-places-autocomplete";
import Button from "../../../../components/button/button";
import { GOOGLE_API_KEY } from "../../../../environments";
import TimePickers from "../../../../components/time-picker/timepicker";

export interface IItem {
    type?: "input" | "autocomplete" | "timePicker" |"checkbox" | "richText" | "textarea" | "select" | "file" | "textField" | "radio" | "datepicker" | "multiSelect" | "hidden";
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
}

const FormikHandler: React.FC<IFormikHandler> = (
    {
        item,
        errors,
        values,
        handleChange,
        setFieldValue,
        selectOptions,
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
                        onChange={handleChange}
                        placeholder={t(item.placeholder)}
                        label={getFieldLabel(t, item.label, item.name, requiredFields)}
                        error={errors[item.name]}
                    />
                </>
            );
        case "checkbox":
            return (
                <Checkbox
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
                    label={item.label}
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
                    label={t(item.label)}
                    isSearchable={false}
                    name={item.name}
                    placeholder={t(item.placeholder)}
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
                        label={t(item.label)}
                        media={"image"}
                        value={values[item.name]}
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
        // case "datepicker":
        //     return (
        //         <DataPicker
        //             name={item.name}
        //             setFieldValue={setFieldValue}
        //             handleChange={handleChange}
        //             label={t(item.label)}
        //             value={values[item.name]}
        //         />
        //     );
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
                <div>
                    <GooglePlacesAutocomplete
                        apiKey={GOOGLE_API_KEY}
                        selectProps={{
                            name: "origin",
                            values: values["origin"],
                            onChange: (async (originValue: any) => {
                                const originData = await geocodeByPlaceId(originValue.value.place_id);
                                setFieldValue("origin", {
                                    address: originData[0].formatted_address,
                                    id: originValue.value.place_id
                                });
                            }),
                            placeholder: item.placeholder
                        }}
                    />
                    <GooglePlacesAutocomplete
                        apiKey={GOOGLE_API_KEY}
                        selectProps={{
                            name: "destination",
                            values: values["destination"],
                            onChange: (async (destination: any) => {
                                const destinationData = await geocodeByPlaceId(destination.value.place_id);
                                setFieldValue("destination", {
                                    address: destinationData[0].formatted_address,
                                    id: destination.value.place_id
                                });
                            }),
                            placeholder: item.placeholder
                        }}
                    />
                    <Button
                        type={"primary"}
                        onClick={() => handleDrawMap(values["origin"], values["destination"])}
                    >
                        Show on map
                    </Button>
                </div>
            );
        default:
            return (
                <Input
                    name={item.name}
                    value={values[item.name]}
                    type={item.inputType}
                    onChange={handleChange}
                    placeholder={item.placeholder}
                    label={item.label}
                />
            );
    }
};

export default FormikHandler;
