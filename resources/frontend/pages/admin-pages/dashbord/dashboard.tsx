import React from 'react'
import {useTranslation} from 'react-i18next'

import s from './dashboard.module.scss'

interface IDashboard {
    path: string
}

const Dashboard: React.FC<IDashboard> = () => {
    const {t} = useTranslation()


    return (
        <div className={s.root}>
            <div className={s.block}>
                <p
                    key={'first'}
                    className={s.text}
                >
                    {t('admin:welcome_message_part_one')}
                </p>
            </div>
        </div>
    )
}


export default Dashboard