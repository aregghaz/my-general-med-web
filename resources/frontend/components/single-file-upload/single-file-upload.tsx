import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonSVg from "-!svg-react-loader!../../images/button.svg";
import s from "./single-file-upload.module.scss";
import DataPicker from "../data-picker/data-picker";
// import PDFViewer from "../pdf-viewer/pdf-viewer";
// import ExamplePDFViewer from "../pdf-viewer/pdf-viewer";

interface ISingleFileUpload {
    oldImage?: string | any;
    oldVideo?: string;
    oldName?: string;
    onChange: (e: React.ChangeEvent<any>) => void;
    error?: string;
    type?: string;
    label: string;
    value: any;
    setFieldValue: any;
    media: string;
    name: string;

    dataPickerLabel?: any

    dataPickerError?: any
}

const SingleFileUpload: React.FC<ISingleFileUpload> = (
    {
        error,
        name,
        value,
        type = 'show',
        media,
        label,
        setFieldValue,
        oldImage,
        oldName,
        oldVideo,
        onChange,
        dataPickerLabel = "",
        dataPickerError,
    }) => {
    const { t } = useTranslation();
    const [viewPDF, setViewPDF] = useState<null | object>(null);
    const fileType = ["application/pdf"];
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
    const [fileName, setFileName] = useState("")
    return (
        // <>
        //     {/* <Viewer fileUrl={url} /> */}
        //     {/*{oldImage && (*/}
        //     {/*    <div className={s.existingImageBlock}>*/}
        //     {/*        <img className={s.existingImage} src={URL.createObjectURL(oldImage)} alt={oldName}/>*/}
        //     {/*    </div>*/}
        //     {/*)}*/}
        //     {/*FIXME this PDF viewer has some errors and doesn't run properly ???*/}
        //     {/*<PDFViewer viewPDF={viewPDF}/>*/}
        //     {/*<ExamplePDFViewer/>*/}
        //     {/*{*/}
        //     {/*    oldVideo &&*/}
        //     {/*    <div className={s.existingImageBlock}>*/}
        //     {/*        <video controls className={s.existingImage} src={oldVideo}/>*/}
        //     {/*    </div>*/}
        //     {/*}*/}
        //     <div className={s.wrapper}>
        //         <div className={s.uploadButtonWrapper}>
        //             <span style={{ display: "flex", fontWeight: "normal", justifyContent: "space-between",}}>{label}</span>
        //             {
        //                 error &&
        //                 <div className={s.error}>{error}</div>
        //             }
        //             <label className={s.upload_label}>
        //             <span className={s.uploadFileText}>
        //                 <ButtonSVg />
        //             </span>
        //                 {/*{*/}
        //                 {/*    value['name'] &&*/}
        //                 {/*    <span className={s.uploadedImage}>{value[name].name}</span>*/}
        //                 {/*}*/}
        //                 <input name={name} type="file" className={s.fileInput} onChange={onChange} />
        //             </label>
        //
        //         </div>
        //         <span>
        //             {type !== "hidden" ? "Experation date" : null}
        //         </span>
        //         {type !== 'hidden' && <DataPicker
        //             name={`${name}_exp`}
        //             setFieldValue={setFieldValue}
        //             selectRange={false}
        //             ///  handleChange={handleChange}
        //             label={``}
        //             value={value[`${name}_exp`]}
        //         />}
        //     </div>
        // </>

        <>
            {error && !fileName && <span className={s.error}>{error}</span>}
            <div className={s.wrapper}>
                <div className={s.uploadButtonWrapper}>
                    <div className={s.uploadButtonLabel}>
                        <span style={{
                            color: error && !fileName ? "crimson" : fileName ? "#19347a" : ""
                        }}>{label}</span>
                    </div>
                    <div className={s.uploadButton}>
                        <label>
                            <span className={s.uploadFileText}><ButtonSVg/></span>
                            <input name={name} type="file" className={`${s.fileInput} `} onChange={(e) => {
                                onChange(e)
                                setFileName(e.target.files[0].name)
                            }} />
                            <span className={`${s.filename} ${error && !fileName && s.errorInput}`} style={{
                                color: fileName && !error && "#19347a"
                            }}>{fileName ? fileName : "Choose a file"}</span>
                        </label>
                    </div>
                </div>
                {/*{type !== "hidden" && <div className={s.splitter}></div>}*/}
                {
                    type !== "hidden" && <>
                        <div className={s.datePickerWrapper}>
                            {/*<div className={s.datePickerLabel}>*/}
                            {/*    <span>Experation Date</span>*/}
                            {/*</div>*/}
                            <div className={s.datepicker}>
                                <DataPicker
                                    name={`${name}_exp`}
                                    type={true}
                                    setFieldValue={setFieldValue}
                                    selectRange={false}
                                    ///  handleChange={handleChange}
                                    label={dataPickerLabel}
                                    value={value[`${name}_exp`]}
                                    style={{border: "none"}}
                                    error={dataPickerError}
                                    singleFileUpload={true}
                                /><div style={{
                                height: 50,
                            }}></div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    );
};

export default SingleFileUpload;
