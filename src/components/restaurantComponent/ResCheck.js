import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import styled from "styled-components";
const Res = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1020px;
    .cont{
        padding: 10px;
        width: 50%;
        height: 70%;
        border: 1px solid;
    }
`;

const ResCheck = (props) =>{
    const nav = useNavigate();
    const[resReq,setResReq] = useState();
    const onChange=(e)=>{
        setResReq(e.target.value)
    }

    const addRes = async() =>{
        const rsp = await AxiosApi.addRes(
            props.data.restId,
            props.data.memberId,
            props.data.resDate,
            resReq,
            props.data.resSeat,
            props.data.resPeo
            );
        if(rsp.data === true) {
            console.log("성공");
            alert("예약 신청이 완료 되었습니다.");
            nav("/info");

        } else {
            console.log("전송 실패");
        }
    }


    return(
        <Res>  
            <div className="cont">
                <h1>예약 정보</h1>
                <h3>예약 날짜 </h3>
                <p>{props.data.resDate}</p>
                <h3>좌석 번호 </h3>
                <p>{props.data.resSeat}번</p>
                <h3>인원수 </h3>
                <p>{props.data.resPeo}명</p>
                <textarea placeholder='요청사항을 적으세요' value={resReq} onChange={onChange} cols="90" rows="10"/>
                <button onClick={addRes}>예약 신청</button>
                <button onClick={()=>nav("/info")}>취소</button>
            </div>
        </Res>
    )

}

export default ResCheck;