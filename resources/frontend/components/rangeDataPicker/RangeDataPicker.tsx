// import React, {FC} from "react"
// import Input from "../input/input";
// import timestampToDate from "../../utils/timestampToDate";
// import Calendar from "react-calendar";
//
// const RangeDataPicker = ({
//
// }) => {
//     return (
//         <>
//             <Input name={"showDate"} type={"string"}
//                    value={values["range"] ? `${timestampToDate(values["range"][0])} - ${timestampToDate(values["range"][1])}` : "mm/dd/yyyy - mm/dd/yyyy"}
//                    label={"range"} onClick={handlerShowCalendar} />
//
//             {showCalendar && <Calendar
//                 formats="MM-dd-yyyy"
//                 selected={new Date().toLocaleDateString()}
//                 /// className={s.dataPicker}
//                 selectRange={true}
//                 onKeyDown={(e: any) => {
//                     e.preventDefault();
//                 }}
//                 onChange={(date: any) => {
//                     console.log(date);
//                     setFieldValue("range", date);
//                     ////  setShow(!show);
//                 }}
//             />}
//         </>
//     )
// }
//
// export default RangeDataPicker
