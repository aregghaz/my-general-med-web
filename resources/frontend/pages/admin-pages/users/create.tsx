import React, {useEffect, useState} from 'react'
import {IItem} from '../../layouts/templates/formik-handler/formik-handler'
import {useTranslation} from 'react-i18next'
import Create from '../../layouts/templates/create/create'

interface IUserCreate {
    path: string
}


const UserCreate: React.FC<IUserCreate> = () => {
    const {t} = useTranslation()
    const crudKey = 'users'
    const [data, setData] = useState(null)
    const fields: Array<IItem> = [
        {name: 'image', type: 'file', label: 'image'},
        {name: 'name', type: 'input', label: 'title'},
        {name: 'surname', type: 'input', label: 'surName'},
        {name: 'email', type: 'input', label: 'email'},
        {name: 'business_address', type: 'input', label: 'businessAddress'},
        {name: 'birthday', type: 'input', label: 'birthDate'},
        {name: 'phone_number', type: 'input', label: 'phoneNumber'},
        {name: 'selectedTypes', type: 'multiSelect', label: 'services'},
        {name: 'selectOptions', type: 'hidden', inputType: 'hidden'},
        {name: 'province', type: 'hidden', inputType: 'hidden'},
        {name: 'languages', type: 'multiSelect', label: 'languages'},
        {name: 'rating', type: 'select', label: 'rating'},
        {name: 'id', type: 'hidden', inputType: 'hidden'},
        {name: 'province', type: 'select', label: 'province'},
        {name: 'region', type: 'select', label: 'region'},
        {name: 'role', type: 'select', label: 'role'},
        {name: 'active', type: 'select', label: 'active'},
        {name: 'description', type: 'textarea', label: 'description'},
        {name: 'text', type: 'textarea', label: 'text'}
    ]
    useEffect(() => {
        (
            async () => {
                // const data = await BeneficiaryItemAPI.createItem(crudKey)
                //
                ///setData(data)
            }
        )()

    }, [])


    return  <Create
        crudKey={crudKey}
        ////TODO FIX THIS MISSING DATA FOR CREATE USER
        data={{}}
        fields={fields}
        title={''}
        children={t('create')}
    />

}

export default UserCreate
