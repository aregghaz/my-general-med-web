import { IItem } from "../pages/layouts/templates/formik-handler/formik-handler";


const populateEditFormFields = (fields: Array<IItem>, data: { [key: string]: { [key: string]: any } }) => {
    const values: { [key: string]: Object } = {};
    fields
        .forEach((field) => {
            switch (field.type) {
                case "input":
                    values[field.name] = data.data[field.name];
                    break;
                case "file":
                    values[field.name] = data.data[field.name];
                    values[`${field.name}_exp`] = data.data[`${field.name}_exp`];
                    break;
                case "hidden":
                    values[field.name] = data.data[field.name];
                    break;
                case "select":
                    values[field.name] = data.data[field.name];
                    break;
                case "datepicker":
                    values[field.name] = data.data[field.name];
                    break;
                case "autocomplete":
                    values["origin"] = data.data["origin"];
                    values["destination"] = data.data["destination"];
                    break;
                case "address":
                    let addressData = data.data["address"];
                    addressData.map((item: any) => {
                        values[`step_${item.step}`] = item.address;
                        values[`phone_${item.step}`] = item.address_phone;
                        values[`comment_${item.step}`] = item.address_comments;
                        values[`time_${item.step}`] = item.pick_up;
                        values[`drop_${item.step}`] = item.drop_down;
                    });
                    break;
                // case 'province':
                //     values[`${field.name}_province`] = data[`${field.name}_province`]
                //     break
                default:
                    values[field.name] = data.data[field.name];
                    break;
            }
        });

    return values;
};

export default populateEditFormFields;
