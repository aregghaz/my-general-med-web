import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import s from "./filter.module.scss";
import Select, {IOption} from '../select/select'
import {Col, Row} from 'react-grid-system';


interface IFilter {
    category: Array<IOption>
    handlerOnChange: (name: string, criteria: Array<IOption>) => void
}

const Filter: React.FC<IFilter> = ({
                                       category,
                                       handlerOnChange
                                   }) => {

    const {t} = useTranslation();

    const years: Array<IOption> = [
        {
            id: 1,
            value: "<2014",
            slug: "2014",
        }, {
            id: 2,
            value: "2015",
            slug: "2015",
        }, {
            id: 3,
            value: "2016",
            slug: "2016",
        }, {
            id: 4,
            value: "2017",
            slug: "2017",
        }, {
            id: 5,
            value: "2018",
            slug: "2018",
        }, {
            id: 6,
            value: "2019",
            slug: "2019",
        }, {
            id: 7,
            value: "2020",
            slug: "2020",
        }, {
            id: 8,
            value: "2021",
            slug: "2021",
        },
        {
            id: 9,
            value: "2022",
            slug: "2022",
        },
    ];
    return category && (
        <Row className={s.filterRow}>
            <Col xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <div className={s.menu}>
                    <Select
                        isCheckbox={true}
                        isMulti={true}
                        getOptionValue={(option: IOption) => option.slug}
                        getOptionLabel={(option: IOption) => option.value}
                        options={category}
                        onChange={(option: Array<IOption>) => handlerOnChange('category', option)}
                        label={t('category')}
                        isSearchable={true}
                        name={'category'}
                    />
                </div>
            </Col>
            <Col xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <div className={s.menu}>
                    <Select
                        isCheckbox={false}
                        isMulti={true}
                        getOptionValue={(option: IOption) => option.slug}
                        getOptionLabel={(option: IOption) => option.value}
                        options={years}
                        onChange={(option: Array<IOption>) => handlerOnChange('years', option)}
                        label={t('date')}
                        isSearchable={true}
                        name={'years'}
                    />
                </div>

            </Col>

        </Row>
    );
}
export default Filter
