import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import styled from "styled-components";
import MessageModal from "../MessageModal";
import moment from "moment";
const ModalStyle = styled.div`
     .modal {
        display: none;  // 숨겨진 상태로 시작
        position: fixed;
        top: 0;  // 화면 전체를 덮도록 위치
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 99; // 다른 모달 보다 위에 위치하도록 함
        background-color: rgba(0, 0, 0, 0.6); // 배경색을 검정으로 하고 투명도 조절
    }
    .openModal {
        display: flex; // 모달이 보이도록 함
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        /* 팝업이 열릴때 스르륵 열리는 효과 */
        animation: modal-bg-show 0.8s;
    }
    .section {
        width: 40%;
        height: 65%;
        margin: 0 auto;
        border-radius: 0.3rem;
        background-color: #fff;
        /* 팝업이 열릴때 스르륵 열리는 효과 */
        animation: modal-show 0.3s;
        overflow: hidden;
    }
    .section > header{
        background-color: lightsalmon;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        padding: 16px 64px 16px 16px;
        font-weight: 700;
        height: 20px;
    }
    .section > header button {
        position: absolute;
        top: 4.5px;
        right: 15px;
        width: 30px;
        font-size: 21px;
        font-weight: 700;
        text-align: center;
        color: #999;
        background-color: transparent;
    }
    .section > main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 78%;
        padding: 16px;
        border-bottom: 1px solid #dee2e6;
        border-top: 1px solid #dee2e6;
    }
    .section1Title{
        font-size : 20px;
        font-weight: bold;
        color :#FF7F50;
        position: relative;
        top:40px;
    }
    .section2Title{
        font-size : 20px;
        font-weight: bold;
        position: relative;
        bottom:10px;
        color :#FF7F50;
    }
    .section2{
        width: 90%;
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
    .box{
            background-color: #EEE4DC;
            width: 92%;
            padding:10px;
            border-radius: 15px;
            p{
                position: relative;
                left: 20px;
            }
    }
    .section>footer{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .section > footer button {
        width: 200px;
        height: 30px;
        margin-top: 13px;
        margin-left:100px;
        margin-right: 100px;
        font-size: 20px;
        background-color: lightsalmon;
        border-radius: 10px;
        font-size:20px;
    }
    .section > footer button:hover {
        box-shadow: 1px 1px 5px;
    }

    @keyframes modal-show {
        from {
            opacity: 0;
            margin-top: -50px;
        }
        to {
            opacity: 1;
            margin-top: 0;
        }
    }
    @keyframes modal-bg-show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

`;



const ReservationCheck = (e) =>{
    const {open,close,data} = e;
    const memberInfo = JSON.parse(localStorage.getItem("forRes"));
 //팝업 처리
 const[okModal,setOkModal] = useState(false);

const moveOk =()=>{
    setOkModal(false);
    close();
    nav("/Info");
}
    const nav = useNavigate();
    const[resReq,setResReq] = useState();
    const onChange=(e)=>{
        setResReq(e.target.value)
    }
// 화면에 오전 오후 형태로 출력
    function formatTime(date) {
        const formattedTime = moment(date).format("YYYY-MM-DD a h시 mm분");
        const korTime = formattedTime.replace("am", "오전").replace("pm", "오후");
        return korTime;
      }
      const showTime = formatTime(data.resDate)
// 예약 추가
    const addRes = async() =>{

        const rsp = await AxiosApi.addRes(
            data.restId,
            data.memberId,
            data.resDate,
            resReq,
            data.resSeat,
            data.resPeo
            );
        if(rsp.data === true) {
            console.log("성공");
            setOkModal(true);
        } else {
            console.log("전송 실패");
        }

        const reservationRsp = await AxiosApi.sendReservationEmail(
            data.restId,
            data.memberId,
            showTime
        );

        if(reservationRsp.status === 200){
            console.log(reservationRsp.data);
            console.log("회원에게 예약등록 이메일 전송");
        } else console.log("회원에게 예약등록 이메일 전송 실패");

        const reservationBizRsp = await AxiosApi.sendReservationEmailBiz(
            data.restId,
            data.memberId,
            data.resDate
        );

        if(reservationBizRsp.status === 200){
            console.log(reservationBizRsp.data);
            console.log("사업자 회원에게 예약등록 이메일 전송");
        } else console.log("사업자 회원에게 예약등록 이메일 전송 실패");

    }


    return(
        <ModalStyle>
            <div className={open ? "openModal modal" : "modal"}>
            {open && 
                <div className="section">
                    <header>
                        <p>예약 확인</p>
                        <button onClick={close}>&times;</button>
                    </header>
                    <main>
                    <div className="section1Title">예약 정보</div>
                        <div className="box">
                            <h3> 예약 날짜 </h3>
                            <p> {showTime}</p>
                            <h3> 인원수 </h3>
                            <p> {data.resPeo}명</p>
                        </div>
                        <div className="section2Title">예약자 정보 및 요청사항</div>
                        <div className="section2">
                            <div>이름 :{memberInfo[0].name}</div>
                            <div>전화번호 : {memberInfo[0].phoneNum}</div>
                            <textarea placeholder='요청사항을 적으세요' value={resReq} onChange={onChange} cols="79" rows="8" style={{ fontSize: '15px'}}  className="request"/>
                        </div>
                    </main>
                    <footer>
                        <button className="back" onClick={close}>취소</button>
                        <button className="next" onClick={addRes}>예약 신청</button>
                    </footer>
                </div>
            }
            </div>
            <MessageModal open={okModal} close={moveOk} confirm={moveOk} header="완료">예약 신청이 완료되었습니다.</MessageModal>

        </ModalStyle>
    )

}

export default ReservationCheck;