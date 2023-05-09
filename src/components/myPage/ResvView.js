import React, {useContext}from "react";
import styled from "styled-components";
import { MemberContext } from "../../context/MemberContext";

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

const ResvView = ({data}) => {
const {memberValue} = useContext(MemberContext);
    return(
    <ResvModal data={data}>
    <div className="stat">{data.resvStat}</div>
    <div className="restName">{data.restName}</div>
    <br />
    <div className="section1">
    <div>날짜 : {data.applicationDate}</div>
    <div>인원수 : {data.resvPeople}명</div>
    <div>좌석 : {data.resvSeat}번</div>
    </div>
    <br />
    <div className="section2Title">예약자 정보 및 요청사항</div>

    <div className="section2">
    <div>이름 : {memberValue.name}</div>
    <div>전화번호 : {memberValue.phoneNum}</div>
    <div>요청사항 </div>
    <div className="box">{data.resvRequest}</div>
    </div>
    <div>
        <button className="updateBtn btn">예약변경</button>
        <button className="cancelBtn btn">예약취소</button>
    </div>
    
    </ResvModal>
    );


}

export default ResvView;