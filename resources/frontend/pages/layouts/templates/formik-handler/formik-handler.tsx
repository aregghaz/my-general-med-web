import React from 'react'
import Select, {IOption, IOptionMultiselect} from '../../../../components/select/select'
import AsyncSelect from '../../../../components/select/async-select'
import {FormikValues} from 'formik'
import TextField from '../../../../components/text-field/text-field'
import Textarea from '../../../../components/textarea/textarea'
import Input from '../../../../components/input/input'
import Checkbox from '../../../../components/checkbox/checkbox'
import RichText from '../../../../components/rich-text/rich-text'
import {useTranslation} from 'react-i18next'
import DataPicker from '../../../../components/data-picker/data-picker'
import SingleFileUpload from '../../../../components/single-file-upload/single-file-upload'
import getFieldLabel from '../../../../utils/getFieldLabel'
import { Autocomplete } from "@react-google-maps/api";

export interface IItem {
    type?: 'input' |'autocomplete'| 'checkbox' | 'richText' | 'textarea' | 'select' | 'file' | 'textField' | 'radio' | 'datepicker' | 'multiSelect' | "hidden"
    inputType?: string
    name: string
    value?: string | boolean | File | IOption
    placeholder?: string
    label?: string
    selectOptions?: Array<IOption> | Array<IOptionMultiselect>
}

interface IFormikHandler {
    item: IItem
    handleChange: (e: React.ChangeEvent<any>) => void
    values: FormikValues
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
    selectOptions?: any
    requiredFields?: Array<string>
    errors?: any
    autoCompleteRef?: any
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
        requiredFields
    }) => {
    const {t} = useTranslation()

    switch (item.type) {
        case 'input':
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
            )
        case 'checkbox':
            return (
                <Checkbox
                    name={item.name}
                    label={item.label}
                    checked={values[item.name]}
                    handlerCheckbox={() => setFieldValue(item.name, !values[item.name])}
                />
            )
        case 'richText':
            return (
                // TODO:  type in function handlerEditorChange
                <RichText
                    handleEditorChange={(content, editor) => {
                        console.log(content, editor)
                    }}
                    initialValue={item.name}
                />
            )
        case 'textarea':
            return (
                <Textarea
                    name={item.name}
                    onChange={handleChange}
                    value={values[item.name]}
                    label={item.label}
                    placeholder={item.placeholder}
                />
            )
        case 'select':
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
            )
        case 'file':
            return (
                <div style={{width: "100%"}}>
                    <SingleFileUpload
                        name={item.name}
                        oldImage={values[item.name]}
                        onChange={(event) => {
                            setFieldValue(item.name, event.currentTarget.files[0])
                        }}
                        label={t(item.label)}
                        media={'image'}
                        value={values[item.name]}
                        error={errors[item.name]}
                    />
                </div>
            )
        case 'textField':
            return (
                <TextField
                    name={item.name}
                    value={values[item.name]}
                    type={item.inputType}
                    placeholder={item.placeholder}
                    onChange={handleChange}
                    label={item.label}
                />
            )
        case 'multiSelect':

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
            )
        case 'datepicker':
            return (
                <DataPicker
                    name={item.name}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    label={t(item.label)}
                    value={values[item.name]}
                />
            )
        // case 'autocomplete':
        //     return (
        //         <Autocomplete >
        //             <input
        //                 type='text'
        //                 placeholder={t(item.placeholder)}
        //                 ref={values[item.name]}
        //             />
        //         </Autocomplete>
        //     )
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
            )
    }
}

export default FormikHandler
