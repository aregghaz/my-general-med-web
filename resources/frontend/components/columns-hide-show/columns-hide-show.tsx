import React, {FC, useState} from "react";
import cls from './columns-hide-show.module.scss'
import Button from "../button/button";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../store/home";


interface IProps {
    show: boolean;
}


const ColumnsHideShow: FC<IProps> = ({show}) => {
    //@ts-ignore
    const titles = useSelector(state => state.homeReducer.titles)

    const dispatch = useDispatch();

    const [filteredData, setFilteredData] = useState({})
    const handleCheckBox = (e: any) => {
        const {value, name, checked} = e.target;
        setFilteredData(state => {

            return {
                ...state,
                [name]: checked ? value : "",
            }


        })

    }

    const handleSubmit = () => {
        if (Object.keys(filteredData).length > 0) {
            for (let x in filteredData) {
                // @ts-ignore
                if (filteredData[x] === "") {
                    // @ts-ignore
                    delete filteredData[x]
                }
            }
        }

        dispatch(actions.filterColumns(filteredData))
    }


    return (
        <div className={`${show ? cls.show_column : cls.hide_column}`}>
            {
                //@ts-ignore
                titles.map((title, ind) => {
                    return (
                        <label key={title + ind} className={cls.label}>
                            <input type="checkbox" name={title} value={title} onChange={handleCheckBox}/>
                            <span>{title}</span>
                        </label>
                    )
                })
            }
            <div className={cls.btn_wrapper}>
                <Button type={"green"} onClick={handleSubmit}>confirm</Button>
            </div>
        </div>
    )
}

export default ColumnsHideShow;
