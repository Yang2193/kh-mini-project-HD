import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";
import { useState } from "react";

//리뷰 상세정보
const ResvModal = styled.div`
    font-family:"Nanum Gadic";
    background-color: #FBF4EF;
    margin: 0 auto;
    max-width : 600px;
    min-width : 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    position: relative; 
    .stat{
        //모달창 상단에 상태 두기 위해서 사용
        position: absolute;
        right: 10px;
        top : 10px;
        font-size : 18px;
        font-weight: bolder;
        color : ${props=>props.data.resvStat==="예약확정"?"blue":"black"};
       }
    .restName{
        font-size: 50px;
        font-weight: bold;
    }
    .section1{
        width: 60%;
        font-size: 1.5rem;
    }
    .section2Title{
        font-size : 20px;
        font-weight: bold;
        color :#FF7F50;
    }
    .section2{
        width: 60%;
        background-color: #EEE4DC;
        font-size: 1rem;
        margin: 20px;
        padding: 20px;

        div{
            margin-bottom: 10px;
        }
        .box{
            background-color: #fff;
            width: 100%;
            margin: 0 auto;
            height: 100px;
        
        }

    }
    .btn{
        width: 150px;
        height: 50px;
        font-size: 20px;
        border : 1px solid #fff;
        border-radius: 5px;
        margin: 10px;
    }
    .updateBtn{
        background-color:#FF7F50;

    }
    .cancelBtn{
        background-color:#EEE4DC;
    }
   
`;

const BizResvView = ({data}) => {
    const [memberValue, setMemberValue] = useState('');
//예약 내역
const resvMemberValue = async() => {
    const rsp = await AxiosApi.memberGet(data.memId);
    if (rsp.status === 200) setMemberValue(rsp.data[0]);
    console.log(rsp.data);
   };

    useEffect(()=>{
        resvMemberValue();

    },[]);
    return(
    <ResvModal data={data}>
    <div className="stat">{data.resvStat}</div>
    <div className="restName">{data.restName}</div>
    <br />
    <div className="section1">
    <label htmlFor ="date">날짜 : </label>
    <span className="result">{data.resvDate}</span>
    <br />
    <label htmlFor ="date">시간 : </label>
    <span className="result">{data.resvTime}</span>
    <br />
    <label htmlFor ="date">인원수 : </label>
    <span className="result">{data.resvPeople}명</span>
    <br />
    </div>
    <br />
    <div className="section2Title">예약자 정보 및 요청사항</div>
    <div className="section2">
    <div>이름 : {memberValue.name}</div>
    <div>전화번호 : {memberValue.phoneNum}</div>
    <label htmlFor ="date">요청사항 : </label>
    <div className="box">{data.resvRequest}</div> 
    
    </div>
   

    </ResvModal>
    );


}

export default BizResvView;