import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import Button from '../button/button'
import ButtonSVg from '-!svg-react-loader!../../images/button.svg'
import s from './single-file-upload.module.scss'
import PDFViewer from "../pdf-viewer/pdf-viewer";

interface ISingleFileUpload {
    oldImage?: string | any
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

    const [viewPDF, setViewPDF] = useState<null | object>(null)
    const fileType = ["application/pdf"]
    if (oldImage) {
        if (oldImage && fileType.includes(oldImage.type)) {
            let reader = new FileReader()
            reader.readAsDataURL(oldImage)
            // @ts-ignore
            reader.onload = (e: ProgressEvent<FileReader>) => setViewPDF(e.target.result)
        } else {
            setViewPDF(null)
        }
    }
    console.log(oldImage, "old image")
    return (
        <>
            {/* <Viewer fileUrl={url} /> */}
            {oldImage && (
                <div className={s.existingImageBlock}>
                    <img className={s.existingImage} src={URL.createObjectURL(oldImage)} alt={oldName}/>
                </div>
            )}
            {/*FIXME this PDF viewer has some errors and doesn't run properly ???*/}
            {/*<PDFViewer viewPDF={viewPDF}/>*/}
            {
                oldVideo &&
                <div className={s.existingImageBlock}>
                    <video controls className={s.existingImage} src={oldVideo}/>
                </div>
            }

            <div className={s.uploadButtonWrapper}>
                {error && <div className={s.error}>{error}</div>}
                <Button type={'blank'}>
                    <span className={s.uploadFileText}>
                        {label}
                        <ButtonSVg/>
                    </span>
                    {value && <span className={s.uploadedImage}>{value.name}</span>}
                </Button>
                <input name={name} type="file" className={s.fileInput} onChange={onChange}/>
            </div>
        </>
    )
}

export default SingleFileUpload
