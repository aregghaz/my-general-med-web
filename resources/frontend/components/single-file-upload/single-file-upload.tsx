import React from 'react'
import {useTranslation} from 'react-i18next'
import Button from '../button/button'

import s from './single-file-upload.module.scss'

interface ISingleFileUpload {
    oldImage?: string
    oldVideo?: string
    oldName?: string
    onChange: (e: React.ChangeEvent<any>) => void
    error?: string
    label:string
    value: any
    media: string
    name: string
}

const SingleFileUpload: React.FC<ISingleFileUpload> = (
    {
        error,
        name,
        value,
        media,
        label,
        oldImage,
        oldName,
        oldVideo,
        onChange
    }) => {
    const {t} = useTranslation()

    return (
        <>
            {/* <Viewer fileUrl={url} /> */}
            {oldImage && (
                <div className={s.existingImageBlock}>
                    <img className={s.existingImage} src={oldImage} alt={oldName}/>
                </div>
            )}
            {oldVideo && (
                <div className={s.existingImageBlock}>
                    <video controls className={s.existingImage} src={oldVideo}/>
                </div>
            )}
            <div className={s.uploadButtonWrapper}>
                {error && <div className={s.error}>{error}</div>}
                <Button type={'blank'}>
                    <span className={s.uploadFileText}>
                        {label}
                        <img src="/images/button.svg" alt=""/>
                    </span>
                    {value && <span className={s.uploadedImage}>{value.name}</span>}
                </Button>
                <input name={name} type="file" className={s.fileInput} onChange={onChange}/>
            </div>
        </>
    )
}

export default SingleFileUpload
