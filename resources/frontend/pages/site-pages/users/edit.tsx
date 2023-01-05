import React, {useEffect, useState} from 'react'
import Edit from '../../layouts/templates/edit/edit'
import {IItem} from '../../layouts/templates/formik-handler/formik-handler'
import {useTranslation} from 'react-i18next'
import {AdminApi} from '../../../api/admin-api/admin-api'
import { homeAPI } from '../../../api/site-api/home-api'

interface IUsersEditItem {
    path: string
    id?: number
}

const VendorUsersEdit: React.FC<IUsersEditItem> = ({id}) => {
    const {t} = useTranslation()
    const crudKey = 'vendorClients';
    const [data, setData] = useState(null)
    const fields: Array<IItem> = [
        {name: 'logo', type: 'file', label: 'image'},
        {name: 'company', type: 'input', label: 'title'},
        {name: 'surname', type: 'input', label: 'surName'},
        {name: 'email', type: 'input', label: 'email'},
        // {name: 'business_address', type: 'input', label: 'businessAddress'},
        {name: 'birthday', type: 'input', label: 'birthDate'},
        {name: 'phone_number', type: 'input', label: 'phoneNumber'},
        // {name: 'selectedTypes', type: 'multiSelect', label: 'services'},
        // {name: 'selectOptions', type: 'hidden', inputType: 'hidden',},
        // {name: 'province', type: 'hidden',  inputType : 'hidden', },
        // {name: 'languages', type: 'multiSelect', label: 'languages'},
        // {name: 'rating', type: 'select', label: 'rating'},
        {name: 'id', type: 'hidden', inputType: 'hidden'},
        // {name: 'province', type: 'select', label: 'province'},
        // {name: 'region', type: 'select', label: 'region'},
        {name: 'fields', type: 'multiSelect', label: 'fields'},
        // {name: 'active', type: 'select', label: 'active'},
        {name: 'description', type: 'textarea', label: 'description'},
        {name: 'text', type: 'textarea', label: 'text'}
    ]


    useEffect(() => {
        (
            async () => {
                const data = await homeAPI.editUserData(crudKey, id)
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

export default VendorUsersEdit
