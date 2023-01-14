import React, {useEffect, useState} from 'react'
import Edit from '../../layouts/templates/edit/edit'
import {IItem} from '../../layouts/templates/formik-handler/formik-handler'
import {useTranslation} from 'react-i18next'
import {AdminApi} from '../../../api/admin-api/admin-api'

interface IClientEditItem {
    path: string
    id?: number
}

const ClientEdit: React.FC<IClientEditItem> = ({id}) => {
    const {t} = useTranslation()
    const crudKey = 'clients';
    const [data, setData] = useState(null)
    const fields: Array<IItem> = [
        
        { name: 'trip_id', type: 'input', label: 'trip_id' },
        { name: 'name', type: 'input', label: 'name' },
        { name: 'surname', type: 'input', label: 'surName' },
        { name: 'gender', type: 'select', label: 'gender' },
        { name: 'los', type: 'input', label: 'los' },
        { name: 'phone_number', type: 'datepicker', label: 'phone_number' },
        { name: 'date_of_service', type: 'datepicker', label: 'date_of_service' },
        { name: 'appointment_time', type: 'datepicker', label: 'appointment_time' },
        { name: 'pick_up', type: 'datepicker', label: 'pick_up' },
        { name: 'drop_down', type: 'datepicker', label: 'drop_down' },
        { name: 'request_type', type: 'select', label: 'request_type' },
        { name: 'id', type: 'hidden', inputType: 'hidden' },
        { name: 'origin_name', type: 'input', label: 'origin_name' },
        { name: 'origin_street', type: 'input', label: 'origin_street' },
        { name: 'origin_suite', type: 'input', label: 'origin_suite' },
        { name: 'origin_city', type: 'input', label: 'origin_city' },
        { name: 'origin_state', type: 'input', label: 'origin_state' },
        { name: 'origin_postal', type: 'input', label: 'origin_postal' },
        { name: 'origin_country', type: 'input', label: 'origin_country' },
        { name: 'origin_phone', type: 'input', label: 'origin_phone' },
        { name: 'origin_comment', type: 'input', label: 'origin_comment' },
        { name: 'destination_name', type: 'input', label: 'destination_name' },
        { name: 'destination_street', type: 'input', label: 'destination_street' },
        { name: 'destination_suite', type: 'input', label: 'destination_suite' },
        { name: 'destination_city', type: 'input', label: 'destination_city' },
        { name: 'destination_state', type: 'input', label: 'destination_state' },
        { name: 'destination_postal', type: 'input', label: 'destination_postal' },
        { name: 'destination_country', type: 'input', label: 'destination_country' },
        { name: 'destination_phone', type: 'input', label: 'destination_phone' },
        { name: 'destination_comments', type: 'input', label: 'destination_comments' },
        
        { name: 'escortType', type: 'select', label: 'escortType' },
        { name: 'type_of_trip', type: 'select', label: 'type_of_trip' },
        { name: 'status', type: 'select', label: 'status' },
        { name: 'member_uniqie_identifer', type: 'input', label: 'member_uniqie_identifer' },
        { name: 'birthday', type: 'datepicker', label: 'birthday' },
        { name: 'miles', type: 'input', label: 'miles' },

     
    ]


    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.getUserData(crudKey, id)
                // console.log(data)

                ///TODO FIX THIS PART FOR ALL PAGESS
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

export default ClientEdit
