import React, {FC} from "react";
import cls from './columns-hide-show.module.scss'


interface IProps {
    titles?: string[]
    show: boolean;
}

const ColumnsHideShow: FC<IProps> = ({show, titles}) => {
    return (
        <div className={`${show ? cls.show_column : cls.hide_column}`}>
            {show ? "poxos" : "petros"}
            {/*{*/}
            {/*    titles.map((title, ind) => {*/}
            {/*        return (*/}
            {/*            <label key={title + ind}>*/}
            {/*                <span>{}</span>*/}
            {/*                <input type="checkbox"/>*/}
            {/*            </label>*/}
            {/*        )*/}
            {/*    })*/}

            {/*}*/}
        </div>
    )
}

export default ColumnsHideShow;
