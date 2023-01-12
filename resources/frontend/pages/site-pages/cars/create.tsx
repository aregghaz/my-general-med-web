import React, {useEffect, useState} from 'react'
import {IItem} from '../../layouts/templates/formik-handler/formik-handler'
import {useTranslation} from 'react-i18next'
import Create from '../../layouts/templates/create/create'
import {AdminApi} from '../../../api/admin-api/admin-api'
import { vendorAPI } from '../../../api/site-api/vendor-api'

interface IUserCreate {
    path: string
}


const CarsCreate: React.FC<IUserCreate> = () => {
    const {t} = useTranslation()
    const crudKey = 'cars'
    const [data, setData] = useState(null)
    const fields: Array<IItem> = [
        // {name: 'image', type: 'file', label: 'image'},
        {name: 'make', type: 'select', label: 'make'},
      ///  {name: 'model', type: 'select', label: 'model'},
        {name: 'year', type: 'select', label: 'year'},
        {name: 'registration', type: 'input', label: 'registration'},
        {name: 'inspection', type: 'file', label: 'inspection'},
        {name: 'insurance', type: 'file', label: 'insurance'},
        {name: 'front', type: 'file', label: 'Front image'},
        {name: 'rear', type: 'file', label: 'Rear'},
        {name: 'right', type: 'file', label: 'Right Side'},
        {name: 'left', type: 'file', label: 'Left Side'},
        {name: 'interior_1', type: 'file', label: 'interior_1'},
        {name: 'interior_2', type: 'file', label: 'interior_2'},
    
    ];
    const requiredFields = [
        'registration',
         
    ]
    useEffect(() => {
        (
            async () => {
                const data = await vendorAPI.createUserData(crudKey)

                setData(data)
            }
        )()

    }, [])


    return data && <Create
        crudKey={crudKey}
        ////TODO FIX THIS MISSING DATA FOR CREATE USER
        data={data}
        fields={fields}
        title={''}
        isAdmin={false}
        requiredFields={requiredFields}
        children={t('create')}
    />

}

export default CarsCreate
