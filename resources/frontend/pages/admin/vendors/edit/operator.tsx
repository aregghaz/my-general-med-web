import React, {useEffect, useState} from 'react'
import Edit from '../../../layouts/templates/edit/edit'
import {IItem} from '../../../layouts/templates/formik-handler/formik-handler'
import {useTranslation} from 'react-i18next'
import { AdminApi } from '../../../../api/admin-api/admin-api'
interface IVendorEditItem {
    path: string
    id?: number
}

const OperatorEdit: React.FC<IVendorEditItem> = ({id}) => {
    const {t} = useTranslation()
    const crudKey = 'operators';
    const redirectKey = 'vendors';
    const [data, setData] = useState(null)
    const fields: Array<IItem> = [
        { name: "name", type: "input", label: "name" },
        { name: "surname", type: "input", label: "surname" },
        { name: "email", type: "input", label: "email" },
        { name: "address", type: "input", label: "address" },
        { name: "phone_number", type: "input", label: "phone_number",inputType:'tel'  },
        { name: "fields", type: "multiSelect", label: "fields" },
        { name: "id", type: "hidden", inputType: "hidden" },
        { name: "password", type: "input", inputType: "password" }
    ];
    const requiredFields = [
        "name",
   ///     "password",
        "fields"
    ];
    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.editUserData(crudKey, id)
                setData(data)

            }
        )()

    }, [])
    return (
        data &&
        <Edit
            crudKey={`admin/${crudKey}`}
            data={data}
            redirectKey={`admin/${redirectKey}`}
            requiredFields={requiredFields}
            fields={fields}
            title={''}
            children={t('update')}
        />
    )
}

export default OperatorEdit
