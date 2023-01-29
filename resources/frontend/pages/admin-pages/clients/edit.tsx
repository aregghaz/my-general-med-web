import React, { useEffect, useRef, useState } from "react";
import Edit from '../../layouts/templates/edit/edit'
import FormikHandler, {IItem} from '../../layouts/templates/formik-handler/formik-handler'
import {useTranslation} from 'react-i18next'
import {AdminApi} from '../../../api/admin-api/admin-api'
import { Formik, FormikHelpers, FormikValues } from "formik";
import validationRules from "../../../utils/validationRule";
import populateEditFormFields from "../../../constants/populateEditFormFields";
import s from "../../layouts/templates/edit/edit.module.scss";
import Button from "../../../components/button/button";
import { navigate } from "@reach/router";
import { Autocomplete, DirectionsRenderer, GoogleMap } from "@react-google-maps/api";
import Input from "../../../components/input/input";

interface IClientEditItem {
    path: string
    id?: number
}

const ClientEdit: React.FC<IClientEditItem> = ({id}) => {
    const {t} = useTranslation()

    const crudKey = 'clients';
    const [data, setData] = useState(null)
    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef()

    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [origin, setOrigin] = useState(null)
    const [destination, setDestination] = useState(null)
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

    async function calculateRoute() {
        // if (originRef.current.value === '' || destiantionRef.current.value === '') {
        //     return
        // }

        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin:origin,
            destination: destination,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }

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

        { name: 'origin', type: 'autocomplete', label: 'origin' },
        { name: 'origin_phone', type: 'input', label: 'origin_phone' },
        { name: 'origin_comment', type: 'input', label: 'origin_comment' },

        { name: 'destination', type: 'autocomplete', label: 'destination' },
        { name: 'destination_phone', type: 'input', label: 'destination_phone' },
        { name: 'destination_comments', type: 'input', label: 'destination_comments' },

        { name: 'escortType', type: 'select', label: 'escortType' },
        { name: 'type_of_trip', type: 'select', label: 'type_of_trip' },
        { name: 'status', type: 'select', label: 'status' },
        { name: 'member_uniqie_identifer', type: 'input', label: 'member_uniqie_identifer' },
        { name: 'birthday', type: 'datepicker', label: 'birthday' },
        { name: 'miles', type: 'input', label: 'miles' },


    ]

    const requiredFields: string[] = [];


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
    const validate = (values: FormikValues) => validationRules(values, requiredFields, fields, t)

    const submit = async (values: FormikValues, {setSubmitting}: FormikHelpers<FormikValues>) => {
        setSubmitting(true)
        const formData: FormData = new FormData()

        formData.append('_method', 'put');
        formData.append('value', JSON.stringify(values))
        const res: any = await AdminApi.update(formData, crudKey, values.id)
        if (Number(res.status === 200)) await navigate(`/${crudKey}`)
    }


    return data && (
        <div>
            <Formik
                initialValues={populateEditFormFields(fields, data)}
                onSubmit={submit}
                validate={validate}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({
                      handleSubmit,
                      handleChange,
                      values,
                      setFieldValue,
                      errors
                  }) => {


                    return (
                        <>
                            {isLoaded && directionsResponse && <div className={s.googleMap}>
                                <GoogleMap
                                    ///  center={center}
                                    zoom={15}
                                    mapContainerStyle={{width: "100%", height: "100%"}}
                                    options={{
                                        zoomControl: true,
                                        streetViewControl: false,
                                        mapTypeControl: false,
                                        fullscreenControl: false
                                    }}
                                    onLoad={map => setMap(map)}
                                >
                                    {/* <Marker position={center} /> */}
                                    {directionsResponse && (
                                        <DirectionsRenderer directions={directionsResponse}/>
                                    )}

                                </GoogleMap>
                                <div style={{border: "1px solid #ddd", padding: "5px", marginTop: "10px"}}>
                                    {steps && steps.map((el: any) => {
                                        return (
                                            <div
                                                className={s.directions}
                                                dangerouslySetInnerHTML={{__html: el.instructions}}
                                            />
                                        );
                                    })}
                                </div>
                            </div>}
                            <form className={s.form}>
                                <div>
                                    <Autocomplete>
                                        <Input type='text'
                                               placeholder='Origin'
                                               ref={values['origin']}
                                               onChange={(event) => {
                                                   handleChange(event)
                                                   setOrigin(event.target.value);

                                               }
                                               }
                                               name={'origin'}
                                        />
                                    </Autocomplete>
                                </div>
                                <div >
                                    <Autocomplete>
                                        <Input
                                            type='text'
                                            placeholder='Destination'
                                            value={values['destination']}
                                            onChange={(event) => {
                                                handleChange(event)
                                                setDestination(event.target.value);

                                            }
                                            }
                                            ref={values['destination']}
                                            name={'destination'}/>
                                    </Autocomplete>
                                </div>
                                {
                                    fields
                                        .map((field, index) =>
                                            <div key={index} className={s.item}
                                                 style={field.type == 'hidden' ? {display: "none"} : {}}>
                                                <FormikHandler
                                                    item={field}
                                                    handleChange={handleChange}
                                                    values={values}
                                                    requiredFields={requiredFields}
                                                    setFieldValue={setFieldValue}
                                                    selectOptions={data}
                                                    errors={errors}
                                                />
                                            </div>
                                        )
                                }

                                <div className={s.buttonDiv}>
                                    <Button
                                        type={'adminUpdate'}
                                        onClick={handleSubmit}
                                        className={'admin'}
                                        isSubmit={true}

                                    >
                                        update
                                    </Button>
                                </div>

                            </form>

                        </>

                    )
                }
                }
            </Formik>
        </div>
    )
}

export default ClientEdit
