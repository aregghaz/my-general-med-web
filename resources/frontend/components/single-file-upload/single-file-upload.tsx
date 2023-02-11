import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import Button from '../button/button'
import ButtonSVg from '-!svg-react-loader!../../images/button.svg'
import s from './single-file-upload.module.scss'
import PDFViewer from "../pdf-viewer/pdf-viewer";
// import PDFViewer from "../pdf-viewer/pdf-viewer";
// import ExamplePDFViewer from "../pdf-viewer/pdf-viewer";

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
    console.log(error)
    const [viewPDF, setViewPDF] = useState<null | object>(null)
    const fileType = ["application/pdf"]
    // if (oldImage) {
    //     if (oldImage && fileType.includes(oldImage.type)) {
    //         let reader = new FileReader()
    //         reader.readAsDataURL(oldImage)
    //
    //         reader.onload = (e: ProgressEvent<FileReader>) => setViewPDF(e.target.result)
    //     } else {
    //         setViewPDF(null)
    //     }
    // }
    return (
        <>
            {/* <Viewer fileUrl={url} /> */}
            {/*{oldImage && (*/}
            {/*    <div className={s.existingImageBlock}>*/}
            {/*        <img className={s.existingImage} src={URL.createObjectURL(oldImage)} alt={oldName}/>*/}
            {/*    </div>*/}
            {/*)}*/}
            {/*FIXME this PDF viewer has some errors and doesn't run properly ???*/}
            {/*<PDFViewer viewPDF={viewPDF}/>*/}
            {/*<ExamplePDFViewer/>*/}
            {/*{*/}
            {/*    oldVideo &&*/}
            {/*    <div className={s.existingImageBlock}>*/}
            {/*        <video controls className={s.existingImage} src={oldVideo}/>*/}
            {/*    </div>*/}
            {/*}*/}
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                {/*{*/}
                {/*    oldImage &&*/}
                {/*    <div style={{*/}
                {/*        width: "200px",*/}
                {/*        height: "260px",*/}
                {/*        // border: "1px solid #ddd",*/}
                {/*        boxShadow: "0 0 4px #ddd",*/}
                {/*        borderRadius: "10px",*/}
                {/*        display: "flex",*/}
                {/*        alignItems: "center",*/}
                {/*        justifyContent: "center",*/}
                {/*        marginBottom: "10px",*/}
                {/*        padding: "5px",*/}
                {/*    }}>*/}

                {/*        <img className={s.existingImage} src={URL.createObjectURL(oldImage)} alt={oldName}/>*/}

                {/*    </div>*/}
                {/*}*/}
                <div className={s.uploadButtonWrapper}>
                    <span style={{display: "block", fontWeight: "normal"}}>{label}</span>
                    {
                        error &&
                        <div className={s.error}>{error}</div>
                    }
                    <label className={s.upload_label}>
                    <span className={s.uploadFileText}>
                        <ButtonSVg/>
                    </span>
                        {
                            value &&
                            <span className={s.uploadedImage}>{value.name}</span>
                        }
                        <input name={name} type="file" className={s.fileInput} onChange={onChange}/>
                    </label>
                </div>
            </div>
        </>
    )
}

export default SingleFileUpload
