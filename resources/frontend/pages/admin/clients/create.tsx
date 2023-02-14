import React, {useEffect, useState} from 'react'
import {IItem} from '../../layouts/templates/formik-handler/formik-handler'
import {useTranslation} from 'react-i18next'
import Create from '../../layouts/templates/create/create'
import {AdminApi} from '../../../api/admin-api/admin-api'

interface IClientCreate {
    path: string
}


const ClientCreate: React.FC<IClientCreate> = () => {
    const {t} = useTranslation()
    const crudKey = 'clients'
    const [data, setData] = useState(null)
    const fields: Array<IItem> = [
        { name: "trip_id", type: "input", label: "trip_id" },
        { name: "fullName", type: "input", label: "fullName" },
        { name: "gender", type: "select", label: "gender" },
        { name: "los", type: "input", label: "los" },
        { name: "member_uniqie_identifer", type: "input", label: "member_uniqie_identifer" },
        { name: "request_type", type: "select", label: "request_type" },
        { name: "status", type: "select", label: "status" },
        { name: "origin_phone", type: "input", label: "origin_phone" },
        { name: "origin_comment", type: "input", label: "origin_comment" },
        { name: "destination_phone", type: "input", label: "destination_phone" },
        { name: "destination_comments", type: "input", label: "destination_comments" },
        { name: "birthday", type: "datepicker", label: "birthday" },
        { name: "date_of_service", type: "datepicker", label: "date_of_service" },
        { name: "miles", type: "input", label: "miles" },
        { name: "pick_up", type: "timePicker", label: "pick_up" },
        { name: "drop_down", type: "timePicker", label: "drop_down" },
        { name: "id", type: "hidden", inputType: "hidden" },
        { name: "location", type: "autocomplete", label: "location" }
    ]


    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.createItem(crudKey)

                setData(data)
            }
        )()

    }, [])

    const requiredFields = [
        "fullName"
    ];
    return data && <Create
        crudKey={crudKey}
        data={data}
        requiredFields={requiredFields}
        fields={fields}
        title={''}
        children={t('create')}
    />

}

export default ClientCreate
