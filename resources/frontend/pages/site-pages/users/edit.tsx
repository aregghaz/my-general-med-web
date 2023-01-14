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
        {name: 'name', type: 'input', label: 'name'},
        {name: 'surname', type: 'input', label: 'surName'},
        {name: 'email', type: 'input', label: 'email'},
        {name: 'address', type: 'input', label: 'address'},
        {name: 'birthday', type: 'input', label: 'birthDate'},
        {name: 'phone_number', type: 'input', label: 'phone_number'},
        {name: 'password', type: 'input', label: 'password'},
        {name: 'roles', type: 'select', label: 'role'},
        {name: 'license', type: 'file', label: 'Driver License'},
        {name: 'picture', type: 'file', label: 'Driver Picture'},
        {name: 'sex_offender_check', type: 'file', label: 'Sex Offender Check '},
        {name: 'motor_vehicle_record', type: 'file', label: 'Motor Vehicle Record'},
        {name: 'defensive_driving', type: 'file', label: 'Defensive Driving Certificate'},
        {name: 'wheelchair_securement', type: 'file', label: 'Wheelchair Securement Certificate'},
        {name: 'pass_bassic', type: 'file', label: 'Pass Basic'},
        {name: 'emt_1', type: 'file', label: 'EMT 1 Certificate'},
        {name: 'first_aid', type: 'file', label: 'First Aid and CPR Certificate'},
        {name: 'company_training', type: 'file', label: 'Company Training Letter'},
        {name: 'id', type: 'hidden', inputType: 'hidden'},

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
