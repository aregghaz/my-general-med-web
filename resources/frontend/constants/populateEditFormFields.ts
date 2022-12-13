import {IItem} from '../pages/layouts/templates/formik-handler/formik-handler'


const populateEditFormFields = (fields: Array<IItem>, data: { [key: string]: Object }) => {
    const values: { [key: string]: Object } = {}

    fields
        .forEach((field) => {
            switch (field.type) {
                case 'input':
                    values[field.name] = data[field.name]
                    break
                case 'file':
                    values[field.name] = data[field.name]
                    break
                case 'hidden':
                    values[field.name] = data[field.name]
                    break
                case 'select':
                    values[field.name] = data[field.name]
                    break
                case 'datepicker':
                    values[field.name] = data[field.name]
                    break
                // case 'province':
                //     values[`${field.name}_province`] = data[`${field.name}_province`]
                //     break
                default:
                    values[field.name] = data[field.name]
                    break
            }
        })

    return values
}

export default populateEditFormFields
