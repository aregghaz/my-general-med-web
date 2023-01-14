import React, {useEffect, useState} from 'react'
import {IItem} from '../../layouts/templates/formik-handler/formik-handler'
import {useTranslation} from 'react-i18next'
import Create from '../../layouts/templates/create/create'
import { AdminApi } from '../../../api/admin-api/admin-api'

interface IVendorCreate {
    path: string
}


const VendorCreate: React.FC<IVendorCreate> = () => {
    const {t} = useTranslation()
    const crudKey = 'vendors'
    const [data, setData] = useState(null)
    const fields: Array<IItem> = [
        {name: 'companyName', type: 'input', label: 'companyName'},
        {name: 'email', type: 'input', label: 'email'},
        {name: 'address', type: 'input', label: 'address'},
        {name: 'phone_number', type: 'input', label: 'phone_number'},
        {name: 'fields', type: 'multiSelect', label: 'fields'},
        {name: 'id', type: 'hidden', inputType: 'hidden'},
        {name: 'password', type: 'input', inputType: 'password'},
    ]
    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.createItem(crudKey)

                setData(data)
            }
        )()

    }, [])


    return  data && <Create
        crudKey={crudKey}
        ////TODO FIX THIS MISSING DATA FOR CREATE USER
         data={data}
        fields={fields}
        title={''}
        children={t('create')}
    />

}

export default VendorCreate
