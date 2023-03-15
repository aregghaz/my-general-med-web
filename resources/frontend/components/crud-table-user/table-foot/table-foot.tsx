import React from "react";
import Button from "../../button/button";
import styles from "./table-foot.module.scss";

import { IPaginationTypes } from "../../../types/admin";

//// </tfoot>
const TableFoot: React.FC<IPaginationTypes> =
    ({
         count,
         activeItem,
         last_page,
         handlerChangeItem
     }) => {
        const curentPage = count.from;
        const Number = count.from;
        const paginationArray: Array<number> = [];
        if (curentPage <= 2) {
            Array.from(Array(10), (e, i) => {
                paginationArray.push(curentPage + i);
            });
        } else if (curentPage > 2) {
            Array.from(Array(10), (e, i) => {
                paginationArray.push(curentPage - 2 + i);
            });
        } else {

        }


        //////FIXME LAST PAGE PROBLEM
        return (

            <div className={styles.trPagination}>
                {Array.from(Array(10), (e, i: number) => {
                    if (activeItem == Number + i) {
                        return <span
                            key={paginationArray[i] - 1}
                            className={`${styles.number} ${styles.active}`}
                        >

                            <Button
                                key={i}
                                onClick={() => handlerChangeItem(paginationArray[i] - 1)}
                                type={"blank"}
                            >
                                {paginationArray[i]}
                            </Button>

                        </span>;
                    } else if (last_page >= Number + i) {
                        return <span
                            key={paginationArray[i] - 1}
                            className={styles.number}
                        >

                            <Button
                                key={i + 1}
                                onClick={() => handlerChangeItem(paginationArray[i] - 1)}
                                type={"blank"}
                            >
                               {paginationArray[i]}
                            </Button>

                        </span>;
                    }
                })
                }

            </div>

        );
    };

export default TableFoot;
