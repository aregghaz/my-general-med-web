import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from "../../button/button";
import styles from './table-foot.module.scss'

import {IPaginationTypes} from '../../../types/admin';

//// </tfoot>
const TableFoot: React.FC<IPaginationTypes> =
    ({
         count,
         activeItem,
         handlerChangeItem
     }) => {
        console.log(count,'countcount');
        const Number = count.from
        return (

            <div className={styles.trPagination}>
                {Array.from(Array(10), (e, i) => {
                    if (activeItem == i) {
                        return <span
                            key={Number + i}
                            className={`${styles.number} ${styles.active}`}
                         >

                            <Button
                                key={i}
                                onClick={() => handlerChangeItem(Number  +i)}
                                type={'blank'}
                            >
                                {Number  +i}
                            </Button>

                        </span>
                    } else {
                        return <span
                        key={Number + i}
                            className={styles.number}
                          >

                            <Button
                                key={i + 1}
                                onClick={() => handlerChangeItem(Number  +i)}
                                type={'blank'}
                            >
                                {Number +i }
                            </Button>

                        </span>
                    }
                })
                }

            </div>

        );
    };

export default TableFoot;
