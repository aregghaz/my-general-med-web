import React, { useEffect, useState } from 'react'
import { IItem } from '../../layouts/templates/formik-handler/formik-handler'
import { useTranslation } from 'react-i18next'
import Create from '../../layouts/templates/create/create'
import { AdminApi } from '../../../api/admin-api/admin-api'

interface IClientCreate {
    path: string
}


const ClientCreate: React.FC<IClientCreate> = () => {
    const { t } = useTranslation()
    const crudKey = 'users'
    const [data, setData] = useState(null)
    const fields: Array<IItem> = [
        { name: 'trip_id', type: 'input', label: 'trip_id' },
        { name: 'member_uniqie_identifer', type: 'input', label: 'member_uniqie_identifer' },
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

        // {name: 'selectedTypes', type: 'multiSelect', label: 'services'},
        // {name: 'selectOptions', type: 'hidden', inputType: 'hidden'},
        // {name: 'province', type: 'hidden', inputType: 'hidden'},
        // {name: 'languages', type: 'multiSelect', label: 'languages'},
        // {name: 'rating', type: 'select', label: 'rating'},
        { name: 'id', type: 'hidden', inputType: 'hidden' },
        // {name: 'province', type: 'select', label: 'province'},
        // {name: 'region', type: 'select', label: 'region'},
        { name: 'escortType', type: 'select', label: 'escortType' },
        { name: 'type_of_trip', type: 'select', label: 'type_of_trip' },
        { name: 'status', type: 'select', label: 'status' },
        { name: 'birthday', type: 'datepicker', label: 'birthday' },
        { name: 'miles', type: 'input', label: 'miles' },
        { name: 'origin_comment', type: 'textarea', label: 'origin_comment' },
        { name: 'destination_comments', type: 'textarea', label: 'destination_comments' }
        // "origin_name",
        // "origin_street",
        // "origin_suite",
        // "origin_city",
        // "origin_state",
        // "origin_postal",
        // "origin_country",
        // "origin_phone",
        // "origin_comment",
        // "destination_name",
        // "destination_street",
        // "destination_suite",
        // "destination_city",
        // "destination_state",
        // "destination_postal",
        // "destination_country",
        // "destination_phone",
        // "destination_comments",



    ]





    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.createItem(crudKey)

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

export default ClientCreate
