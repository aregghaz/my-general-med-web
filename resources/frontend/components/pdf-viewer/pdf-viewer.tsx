import React, { FC } from "react";
import cls from "./pdf-viewer.module.scss";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface IProps {
    viewPDF: any;
}

const PDFViewer: FC<IProps> = ({ viewPDF }) => {
    const newPlugin = defaultLayoutPlugin();
    return (
        <div className={cls.pdv_container}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
                {
                    viewPDF &&
                    // @ts-ignore
                    <Viewer fileUrl={viewPDF} plugins={[newPlugin]}>
                        {viewPDF}
                    </Viewer>
                }
            </Worker>
        </div>
    );
};


export default PDFViewer;
//
// import React from 'react'
//
// import PDFViewer from 'pdf-viewer-reactjs'
//
// const ExamplePDFViewer = () => {
//     return (
//         <PDFViewer
//             document={{
//                 url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf',
//             }}
//         />
//     )
// }
//
// export default ExamplePDFViewer
