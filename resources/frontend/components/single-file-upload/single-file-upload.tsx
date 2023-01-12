import React from 'react'
import {useTranslation} from 'react-i18next'
import Button from '../button/button'
import ButtonSVg from '-!svg-react-loader!../../images/button.svg'
import s from './single-file-upload.module.scss'

interface ISingleFileUpload {
    oldImage?: string
    oldVideo?: string
    oldName?: string
    onChange: (e: React.ChangeEvent<any>) => void
    error?: string
    label: string
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
    console.log(oldImage, "oldImage")
    // @ts-ignore
    if (oldImage && oldImage.type === "application/pdf") {
        const file = new Blob([oldImage], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL)
    }
    return (
        <>
            {/* <Viewer fileUrl={url} /> */}
            {
                oldImage &&
                <div className={s.existingImageBlock}>
                    <img className={s.existingImage} src={URL.createObjectURL(oldImage)} alt={oldName}/>
                </div>
            }
            {
                oldVideo &&
                <div className={s.existingImageBlock}>
                    <video controls className={s.existingImage} src={oldVideo}/>
                </div>
            }

            <div className={s.uploadButtonWrapper}>
                {error && <div className={s.error}>{error}</div>}
                {value && <span className={s.uploadedImage}>{value.name}</span>}
                <label style={{display: "block"}}>
                    <span className={s.uploadFileText}>
                        {label}
                        <ButtonSVg style={{marginLeft: "10px"}}/>
                    </span>
                    <input name={name} type="file" className={s.fileInput} onChange={onChange}/>
                </label>

            </div>
        </>
    )
}

export default SingleFileUpload
