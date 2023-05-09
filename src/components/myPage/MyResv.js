import React from "react";
import ResvBoard from "./table/ResvBoard";

//나의 예약현황
const MyResv = () => {
  
    return(
        <>
        <div className="titleName">예약 현황</div>
        <ResvBoard stat ="예약대기"/>
        <ResvBoard stat ="예약확정"/>
        </>
    );
}

export default MyResv;