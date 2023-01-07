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
    const crudKey = 'users'
    const [data, setData] = useState(null)
    const fields: Array<IItem> = [
        // {name: 'image', type: 'file', label: 'image'},
        {name: 'name', type: 'input', label: 'name'},
        {name: 'surname', type: 'input', label: 'surName'},
        {name: 'email', type: 'input', label: 'email'},
        {name: 'address', type: 'input', label: 'address'},
        {name: 'birthday', type: 'input', label: 'birthDate'},
        {name: 'driver_license', type: 'file', label: 'Driver License'},
        {name: 'driver_picture', type: 'file', label: 'Driver Picture'},
        {name: 'sex_offender_check ', type: 'file', label: 'Sex Offender Check '},
        {name: 'motor_vehicle_record', type: 'file', label: 'Motor Vehicle Record'},
        {name: 'defensive_driving_certificate', type: 'file', label: 'Defensive Driving Certificate'},
        {name: 'wheelchair_securement_certificate', type: 'file', label: 'Wheelchair Securement Certificate'},
        {name: 'pass_bassic', type: 'file', label: 'Pass Basic'},
        {name: 'emt_1_certificate', type: 'file', label: 'EMT 1 Certificate'},
        {name: 'input1', type: 'file', label: 'First Aid and CPR Certificate'},
        {name: 'input2', type: 'file', label: 'Company Training Letter'},

    ]
    useEffect(() => {
        (
            async () => {
                const data = await vendorAPI.createUserData('vendorClients')

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
        children={t('create')}
    />

}

export default VendorDriverCreate
