import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import styled from "styled-components";
import Modal from "../../utils/Modal";
import { useContext } from "react";
import { MemberContext } from "../../context/MemberContext";
const Res = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    .section2Title{
        font-size : 20px;
        font-weight: bold;
        color :#FF7F50;
    }
    .section2{
        width: 690px;
        background-color: #EEE4DC;
        font-size: 1rem;
        padding: 20px;
        border-radius: 15px;
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
    .cont{
        h1{
            position: relative;
            bottom: 50px;
            color :#FF7F50;

        }
        .box{
            background-color: #EEE4DC;
            position: relative;
            bottom: 50px;
            width: 690px;
            padding:10px;
            border-radius: 15px;
            p{
                position: relative;
                left: 20px;
            }
        }
        .btn2{
            display: flex;
            justify-content: center;
            align-items: center;
            button{
                position: relative;
                background-color:#FF7F50;
                top:15px;
                width: 100px;
                height: 30px;
                border: none;
                border-radius: 15px;
                font-size: 15px;
            }
            button:hover{
                    color:white;
            }
            .back {
                right:150px;
            }
            .next {
                left: 150px;
            }
    }
}

`;

const ResCheck = (props) =>{
const {memberValue} = useContext(MemberContext);
 //팝업 처리
 const [modalOpen, setModalOpen] = useState(false);
 const closeModal = () => {
        setModalOpen(false);
        nav("/info");

    };

    const nav = useNavigate();
    const[resReq,setResReq] = useState();
    const onChange=(e)=>{
        setResReq(e.target.value)
    }

    const addRes = async() =>{
        console.log(           
            props.data.restId,
            props.data.memberId,
            props.data.resDate,
            resReq,
            props.data.resSeat,
            props.data.resPeo);
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
            setModalOpen(true);
        } else {
            console.log("전송 실패");
        }

        const reservationRsp = await AxiosApi.sendReservationEmail(
            props.data.restId,
            props.data.memberId,
            props.data.resDate
        );

        if(reservationRsp.status === 200){
            console.log(reservationRsp.data);
            console.log("회원에게 예약등록 이메일 전송");
        } else console.log("회원에게 예약등록 이메일 전송 실패");
    }


    return(
        <Res>  
            <div className="cont">
                <h1>예약 정보</h1>
                <div className="box">
                    <h3> 예약 날짜 </h3>
                    <p> {props.data.resDate}</p>
                    <h3> 인원수 </h3>
                    <p> {props.data.resPeo}명</p>
                </div>
                <div className="section2Title">예약자 정보 및 요청사항</div>
                <div className="section2">
                    <div>이름 :{memberValue[0].name}</div>
                    <div>전화번호 : {memberValue[0].phoneNum}</div>
                    <textarea placeholder='요청사항을 적으세요' value={resReq} onChange={onChange} cols="66" rows="8" style={{ fontSize: '20px'}}/>
                </div>
                <div className="btn2">
                    <button className="next" onClick={addRes}>예약 신청</button>
                    <Modal open={modalOpen} close={closeModal} type ="ok" header="수정 완료"> 예약 신청이 완료 되었습니다. </Modal>
                    <button className="back" onClick={()=>nav("/info")}>취소</button>
                </div>
            </div>
        </Res>
    )

}

export default ResCheck;