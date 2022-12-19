import React, {useEffect, useState} from 'react'
import Edit from '../../layouts/templates/edit/edit'
import {IItem} from '../../layouts/templates/formik-handler/formik-handler'
import {useTranslation} from 'react-i18next'
import { AdminApi } from '../../../api/admin-api/admin-api'
interface IVendorEditItem {
    path: string
    id?: number
}

const VendorEdit: React.FC<IVendorEditItem> = ({id}) => {
    const {t} = useTranslation()
    const crudKey = 'vendors';
    const [data, setData] = useState(null)
    const fields: Array<IItem> = [
        {name: 'name', type: 'input', label: 'name'},
        {name: 'email', type: 'input', label: 'email'},
        {name: 'address', type: 'input', label: 'address'},
        {name: 'phone_number', type: 'input', label: 'phoneNumber'},
        {name: 'status', type: 'select', label: 'status'},
        {name: 'id', type: 'hidden', inputType: 'hidden'},
        {name: 'users', type: 'multiSelect', label: 'users'}
        
    ]


    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.getUserData(crudKey, id)
                console.log(data)
                setData(data)
           
            }
        )()

    }, [])
    return (
        data &&
        <Edit
            crudKey={crudKey}
            data={data}
            fields={fields}
            title={''}
            children={t('update')}
        />
    )
}

export default VendorEdit
