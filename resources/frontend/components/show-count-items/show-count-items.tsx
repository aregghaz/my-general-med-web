import React from 'react'
import {useTranslation} from 'react-i18next'
import Button from '../button/button'

import s from './show-count-items.module.scss'

interface IShowCountItems {
    showingCount: number
    countItems: number
}

const ShowCountItems: React.FC<IShowCountItems> = ({countItems, showingCount}) => {
    const {t} = useTranslation()
    const percent = (100 * showingCount) / countItems
    return (
        <div className={s.root}>
            <div className={s.showCountItems}>
                <span className={s.text}>
                    {`${t('showing')} ${showingCount}
                    ${t('of')}
                    ${countItems} ${t('item')}`}
                </span>
                <div className={s.percent}>
                    <div className={s.range} style={{width: `${percent}%`}}/>
                </div>
            </div>
            <Button type="green">
                <p className={s.loadMore}> {t('loadMoreProducts')} </p>
            </Button>
        </div>
    )
}


export default ShowCountItems
