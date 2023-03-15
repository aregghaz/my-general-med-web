import { IItem } from "../pages/layouts/templates/formik-handler/formik-handler";

const populateCreateFormFields = (fields: Array<IItem>, data: { [key: string]: Object }) => {

    const values: any = {};

    fields
        .forEach((field) => {
            switch (field.type) {
                case "input":
                    //   values[''] = data['']
                    break;
                case "file":
                    //    values[''] = data['']
                    break;
                case "hidden":
                    //  values[''] = data['']
                    break;
                case "select":
                    /// values.selectOptions[field.name] = data[field.name]
                    break;
                case "multiSelect":
                    // values[field.name]= data[field.name]
                    break;
                case "datepicker":
                    // values.selectOptions[''] = data['']
                    break;
                // case 'province':
                //     values[`${field.name}_province`] = data[`${field.name}_province`]
                //     break
                default:
                    //       values[field.name] = []
                    break;
            }
        });
    return values;
};

export default populateCreateFormFields;
