import React, { useEffect, useState } from "react";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AdminApi } from "../../../api/admin-api/admin-api";
import s from "./priceList.module.scss";
import Select, { IOption } from "../../../components/select/select";
import Button from "../../../components/button/button";
import InputCurrency from "../../../components/inputCurrency/inputcurrency";
import PriceCall from "-!svg-react-loader!../../../images/priceCall.svg";
import MailIcon from "-!svg-react-loader!../../../images/mailIcon.svg";

interface IVendors {
    path: string;
    id?: number;
}

interface ILos {
    id: number;
    name: string;
    services: [];
}

interface IService {
    name: string;
    slug: string;
    price: any;
    type: IOption;
    id: number;

}

const PriceList: React.FC<IVendors> = ({ id }) => {
    const dispatch = useDispatch();
    const crudKey = "vendors";
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [priceData, setPriceData] = useState([]);
    const [values, setFieldValue] = useState<{
        [id: number]: {
            [serviceId: number]: {
                input: number,
                value: IOption
            }
        }
    }>([]);
    const [data, setData] = useState({
        companyName: "",
        phoneNumber: "",
        los: []
    });

    const { t } = useTranslation();

    const selectOptions = [
        {
            id: 0,
            value: "Select Type",
            label: "Select Type"
        },
        {
            id: 1,
            value: "base",
            label: "base"
        },
        {
            id: 2,
            value: "Per Mile",
            label: "Per Mile"
        }
    ];
    useEffect(() => {
        (async () => {

            const vendorData = await AdminApi.getPriceList(id);
            setPriceData(priceData);
            setData(vendorData.data);
        })();
        return () => {
            ///homeAPI.cancelRequest();
        };

    }, []);



    const handlerSubmit = async (losId: number) => {
        console.log(values[losId], "valuesvaluesvaluesvalues");
        await AdminApi.updatePrice(losId, id, values[losId]);
    };

    return Object.keys(data).length > 0 && (

        <>
            <div className={s.allContainer}>
                <div className={s.companyInfo}>
                    <div className={s.companyName}>{data.companyName}</div>
                    <div className={s.companyPhone}>
                        <PriceCall className={s.iconCall} />
                        {data.phoneNumber}
                    </div>
                    <div className={s.companyPhone}>
                        <MailIcon className={s.iconCall} />
                        {"@mail.com"}
                    </div>
                </div>
                <div className={s.losContainer}>
                    {
                        data.los.map((item: ILos) => {
                            return (<div className={s.service}>
                                <span className={s.losLabel}>  {item.name}</span>
                                {item.services.map((service: IService) => {
                                    if (typeof values[item.id] == "undefined") {
                                        setFieldValue((state: any) => {
                                            return {
                                                ...state,
                                                [item.id]: {
                                                    ...state[item.id],
                                                    [service.id]: {
                                                        ...state[item.id]?.[service.id],
                                                        input: service.price,
                                                        value: service.type
                                                    }
                                                }
                                            };
                                        });
                                    }
                                    return (
                                        <>
                                            <div className={s.inputContainer}>
                                                <div className={`${s.inputDiv} ${s.selectDiv}`}>
                                                    <InputCurrency name={service.slug}
                                                                   label={service.slug}
                                                                   type={"number"}
                                                                   className={s.currencyInput}
                                                                   value={(values[item.id] && typeof values[item.id][service.id] !== "undefined") ? values[item.id][service.id].input : service.price}
                                                                   onChange={event => {
                                                                       let valueInput = event.target.value;
                                                                       return setFieldValue((state: any) => {
                                                                           return {
                                                                               ...state,
                                                                               [item.id]: {
                                                                                   ...state[item.id],
                                                                                   [service.id]: {
                                                                                       ...state[item.id]?.[service.id],
                                                                                       input: valueInput

                                                                                   }
                                                                               }
                                                                           };
                                                                       });
                                                                   }
                                                                   } />
                                                </div>

                                                {service.id > 2 && <>
                                                    <div className={`${s.inputDiv}`}>
                                                        <Select
                                                            getOptionValue={(option: IOption) => option.value}
                                                            getOptionLabel={(option: IOption) => t(option.label)}
                                                            onChange={(options: IOption) => setFieldValue((state: any) => {
                                                                return {
                                                                    ...state,
                                                                    [item.id]: {
                                                                        ...state[item.id],
                                                                        [service.id]: {
                                                                            ...state[item.id]?.[service.id],
                                                                            value: options
                                                                        }
                                                                    }
                                                                };
                                                            })}
                                                            isDisabled={false}
                                                            options={selectOptions}
                                                            value={(values[item.id] && typeof values[item.id][service.id] !== "undefined") ? values[item.id][service.id].value : service.type}

                                                            name={`${service.slug}_type`}
                                                            isMulti={false}
                                                            label={"serviceType"}
                                                        />
                                                    </div>
                                                </>}
                                            </div>
                                        </>
                                    );
                                })}
                                <div className={s.buttonDiv}>
                                    <Button type={"adminUpdate"} onClick={() => handlerSubmit(item.id)}>Save</Button>
                                </div>
                            </div>);
                        })
                    }
                </div>
            </div>
        </>
    );
};


export default PriceList;
