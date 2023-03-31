import React, {useEffect, useState} from "react";
import {useNavigate} from "@reach/router";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {AdminApi} from "../../../api/admin-api/admin-api";
import s from "./priceList.module.scss";
import Input from "../../../components/input/input";
import Select, {IOption} from "../../../components/select/select";
import Button from "../../../components/button/button";

interface IVendors {
    path: string;
    id?: number;
}

interface ILos {
    name: string;
    services: [];
}

interface IService {
    name: string;
    slug: string;
    type: IOption;
    id? : number;

}

const PriceList: React.FC<IVendors> = ({id}) => {
    const dispatch = useDispatch();
    const crudKey = "vendors";
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [values, setFieldValue] = useState<any>(false);
    const [data, setData] = useState({
        companyName: "",
        phoneNumber: "",
        los: []
    });

    const {t} = useTranslation();

    const selectOptions = [
        {
            id: 0,
            value: "Select Type",
            label: "Select Type",
        }, {
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
            setData(vendorData.data);
            // if (loading) {
            //
            //  ///   setLoading(false);
            // }
        })();
        return () => {
            ///homeAPI.cancelRequest();
        };

    }, []);

    return Object.keys(data).length > 0 && (

        <>
            <div className={s.allContainer}>
                <div className={s.companyName}>Company name: {data.companyName} </div>
                <div className={s.companyPhone}>{t("phoneNumber")}: {data.phoneNumber} </div>
                <div className={s.losContainer}>
                    {
                        data.los.map((item: ILos) => {
                            return (<div className={s.service}>
                                <span className={s.losLabel}>  {item.name}</span>
                                {item.services.map((service: IService) => {
                                    return (
                                        <>
                                            <div className={s.inputContainer}>
                                                <div className={`${s.inputDiv} ${s.selectDiv}`}>

                                                    <Input name={service.slug}
                                                           label={service.slug} type={"number"}/>
                                                </div>

                                                {service.id > 2 && <>
                                                    <div className={`${s.inputDiv}`}>
                                                        <Select
                                                            getOptionValue={(option: IOption) => option.value}
                                                            getOptionLabel={(option: IOption) => t(option.label)}
                                                            onChange={(options: IOption) => setFieldValue((state: any) => {
                                                                return {
                                                                    ...state,
                                                                    car: options
                                                                };
                                                            })}
                                                            isDisabled={false}
                                                            options={selectOptions}
                                                            value={service.type}
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
                                    <Button type={'adminUpdate'}>Save</Button>
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
