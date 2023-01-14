import React, {useEffect, useState} from 'react'
import {IItem} from '../../../layouts/templates/formik-handler/formik-handler'
import {useTranslation} from 'react-i18next'
import Create from '../../../layouts/templates/create/create'
import {AdminApi} from '../../../../api/admin-api/admin-api'
import { vendorAPI } from '../../../../api/site-api/vendor-api'

interface IUserCreate {
    path: string
}


const VendorDriverCreate: React.FC<IUserCreate> = () => {
    const {t} = useTranslation()
    const crudKey = 'vendorClients'
    const [data, setData] = useState(null)
    const fields: Array<IItem> = [
        // {name: 'image', type: 'file', label: 'image'},
        {name: 'name', type: 'input', label: 'name'},
        {name: 'surname', type: 'input', label: 'surName'},
        {name: 'email', type: 'input', label: 'email'},
        {name: 'address', type: 'input', label: 'address'},
        {name: 'birthday', type: 'input', label: 'birthDate'},
        {name: 'phone_number', type: 'input', label: 'phone_number'},
        {name: 'password', type: 'input', label: 'password'},
      ///  {name: 'roles', type: 'select', label: 'role'},
        {name: 'license', type: 'file', label: 'Driver License'},
        {name: 'picture', type: 'file', label: 'Driver Picture'},
        {name: 'sex_offender_check', type: 'file', label: 'Sex Offender Check '},
        {name: 'motor_vehicle_record', type: 'file', label: 'Motor Vehicle Record'},
        {name: 'defensive_driving', type: 'file', label: 'Defensive Driving Certificate'},
        {name: 'wheelchair_securement', type: 'file', label: 'Wheelchair Securement Certificate'},
        {name: 'pass_basic', type: 'file', label: 'Pass Basic'},
        {name: 'emt_1', type: 'file', label: 'EMT 1 Certificate'},
        {name: 'first_aid', type: 'file', label: 'First Aid and CPR Certificate'},
        {name: 'company_training', type: 'file', label: 'Company Training Letter'},
        {name: 'drug_test', type: 'file', label: 'Drug Test'},
        {name: 'id', type: 'hidden', inputType: 'hidden'},

    ]
    useEffect(() => {
        (
            async () => {
                const data = await vendorAPI.createUserData('vendorClients')

                setData(data)
            }
        )()

    }, [])
    const requiredFields = [
        'name',
        'license',
        'picture',
        'sex_offender_check',
        'motor_vehicle_record',
        'defensive_driving',
        'wheelchair_securement',
        'pass_bassic',
        'emt_1',
        'first_aid',
        'company_training'       
    ]

    return data && <Create
        crudKey={crudKey}
        ////TODO FIX THIS MISSING DATA FOR CREATE USER
        data={data}
        fields={fields}
        isAdmin={false}
        requiredFields={requiredFields}
        title={''}
        children={t('create')}
    />

}

export default VendorDriverCreate
