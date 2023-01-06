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
        {name: 'birthday', type: 'input', label: 'birthDate'},
        {name: 'phone_number', type: 'input', label: 'phoneNumber'},
        {name: 'id', type: 'hidden', inputType: 'hidden'},
        {name: 'fields', type: 'multiSelect', label: 'fields'},
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
