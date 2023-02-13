// import React from "react";
// ///import DatePicker from "react-datepicker";
// import s from "./data-picker.module.scss";
//
//
// interface IDataPicker {
//     setFieldValue: (name: string, date: string) => void;
//     ///value: (name: string, option: IOption) => void
//     label: string;
//     name: string;
//     value: any;
// }
//
// const DataPicker: React.FC<IDataPicker> = (
//     {
//         name,
//         setFieldValue,
//         label,
//         value
//     }) => {
//
//
//     return (
//         <>
//             <label className={s.label}>{label}</label>
//             <div className={`${s.dataPicker}`}>
//                 <DatePicker
//                             dateFormat="MM/dd/yyyy"
//                             selected={new Date(value)}
//                             aria-label={false}
//                             onKeyDown={(e: any) => {
//                                 e.preventDefault();
//                             }}
//                             onChange={(date: any) => setFieldValue(name, date)}
//                 />
//             </div>
//         </>
//     );
// };
//
//
// export default DataPicker;
