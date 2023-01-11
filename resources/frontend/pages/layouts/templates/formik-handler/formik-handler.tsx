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

export interface IItem {
    type?: 'input' | 'checkbox' | 'richText' | 'textarea' | 'select' | 'file' | 'textField' | 'radio' | 'datepicker' | 'multiSelect' | "hidden"
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
}

const FormikHandler: React.FC<IFormikHandler> = (
    {
        item,
        errors,
        values,
        handleChange,
        setFieldValue,
        selectOptions,
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
                        placeholder={item.placeholder}
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
            console.log(selectOptions, item, '111')
            return (
                <Select
                    value={values[item.name]}
                    getOptionValue={(option: IOption) => option.value}
                    getOptionLabel={(option: IOption) => option.label}
                    ///
                    ///   options={selectOptions ? selectOptions[item.name] : selectOptions}
                    options={selectOptions}
                    onChange={(option: IOption) => setFieldValue(item.name, option)}
                    label={item.label}
                    isSearchable={false}
                    name={item.name}
                    placeholder={item.placeholder}
                />
            )
        case 'file':
            return (
                <SingleFileUpload
                    name={item.name}
                    oldImage={values[item.name]}
                    onChange={(event) => {
                        setFieldValue(item.name, event.currentTarget.files[0])
                    }}
                    label={item.label}
                    media={'image'}
                    value={values[item.name]}
                    error={errors[item.name]}
                />
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
                    getOptionValue={(option: IOption) => option.label}
                    getOptionLabel={(option: IOption) => option.label}
                    options={values.selectOptions ? values.selectOptions[item.name] : selectOptions[item.name]}
                    onChange={(option: IOption) => setFieldValue(item.name, option)}
                    label={item.label}
                    isSearchable={true}
                    name={item.name}
                    isMulti={true}
                    placeholder={item.placeholder}
                />
            )
        case 'datepicker':
            return (
                <DataPicker
                    name={item.name}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    label={item.placeholder}
                    value={values[item.name]}
                />
            )
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
