import React, {useEffect, useState} from 'react'
import {IItem} from '../../layouts/templates/formik-handler/formik-handler'
import {useTranslation} from 'react-i18next'
import Create from '../../layouts/templates/create/create'
import {AdminApi} from '../../../api/admin-api/admin-api'

interface IUserCreate {
    path: string
    id: number
}


const UserCreate: React.FC<IUserCreate> = ({id}) => {
    const {t} = useTranslation()
    const crudKey = 'users'
    const [data, setData] = useState(null)
    const fields: Array<IItem> = [
        {name: 'logo', type: 'file', label: 'image'},
        {name: 'name', type: 'input', label: 'name'},
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
                const data = await AdminApi.createItem(crudKey)
                setData(data)
            }
        )()

    }, [])


    return <>sss</>
    //  data && <Create
    //     crudKey={crudKey}
    //     ////TODO FIX THIS MISSING DATA FOR CREATE USER
    //     data={data}
    //     fields={fields}
    //     title={''}
    //     children={t('create')}
    // />

}

export default UserCreate
