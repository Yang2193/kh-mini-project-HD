import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";
import Modal from '../../utils/Modal';
import MessageModal from "../../utils/MessageModal";
import { async } from "q";
const ResvBlock  = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
    .board-title {
            font-size: 1.8rem;
            font-weight: bold;
            text-align: center;
            margin: 0 auto;
           
        }
        table {
        width: 80%;
        margin: 0 auto;
        text-align: center;
        border-spacing: 0;
        }

        th {
        background-color:#f8f8fa;
        padding: 0;
        font-size: 16px;
        padding: 10px 5px;
        font-weight: bold;
        }

        tr:hover {
        background-color:#F0B7A2;
        cursor: pointer;
        }
       td {
        padding: 10px 5px;
        }
        .btn{
               
               width: 150px;
               height: 50px;
               margin: 10px;
               display: inline-block;
               border: none;
               border-radius: 4px;
               padding: 8px 16px;
               background-color: #FF7F50;
               color: #fff;
               text-align: center;
               font-size: 18px;
               font-weight: bold;
               cursor: pointer;  
               &:hover{
                   background-color: #FFA07A;
                }
               &:active{
                   background-color: #FFA07A;
               }
           
        }

        .del{
          font-size: 20px;
          font-weight: bold;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
         
        }
        .delInput{
        width: 300px; 
        height: 70px;
        line-height : normal;
        padding: .8em .5em; 
        font-family: inherit; 
        border: 1px solid #999;
        border-radius: 18px; 
        margin:10px;
        }
    
`;
const WatingList = ({restResv,resvList,formatTime}) => {
    const [checkedRows, setCheckedRows] = useState([]);

    const handleCheckboxChange = (rowId) => {
      if (checkedRows.includes(rowId)) {
        setCheckedRows(checkedRows.filter((checkedRow) => checkedRow !== rowId));
      } else {
        setCheckedRows([...checkedRows, rowId]);
      }
    };
    
    const [cancelReason,setCancelReason] = useState('');
    
    
  
    //예약에 대한 Axios 요청을 보내는 함수 
    const sendRequest = async(restId, memId, resvDate, resvTime, resvId) => {
      try{
        const rsp = await AxiosApi.sendReservationConfirmEmail(restId, memId, resvDate, resvTime);
        if(rsp.status === 200) {
          console.log(rsp.data);
          console.log("회원에게 예약확정 메일 발송");
        } else console.log("회원에게 예약확정 메일 발송 실패");

        const bizRsp = await AxiosApi.sendReservationConfirmEmailBiz(restId, memId, resvDate, resvTime, resvId);

        if(bizRsp.status === 200){
          console.log(bizRsp.data);
          console.log("사업자 회원에게 예약확정 메일 발송");
        } else console.log("사업자 회원에게 예약확정 메일 발송 실패");

      }catch(error){
        console.log("예약 확정 메일 발송 실패");
        console.log(error);
      }
    }

    //checkedRows의 요소를 순회하며 Axios 요청을 보내는 함수
    const sendMapRequests = async() => {
      for(let i = 0; i < checkedRows.length; i++){
        const e = checkedRows[i];
        await new Promise(resolve => setTimeout(resolve, i * 1000));
        sendRequest(e.restId, e.memId, e.resvDate, e.resvTime, e.resvId);
      }
    }

    const sendCancelRequest = async(restId, memId, resvDate, resvTime, resvId, reason) => {

      try{
        const rsp = await AxiosApi.sendReservationRejectEmail(restId, memId, resvDate, resvTime, reason);
        if(rsp.status === 200) {
          console.log(rsp.data);
          console.log("회원에게 예약요청 거절 메일 발송");
        } else console.log("회원에게 예약요청 거절 메일 발송 실패");

        const bizRsp = await AxiosApi.sendReservationRejectEmailBiz(restId, memId, resvDate, resvTime, resvId, reason);

        if(bizRsp.status === 200){
          console.log(bizRsp.data);
          console.log("사업자 회원에게 예약요청 거절 메일 발송");
        } else console.log("사업자 회원에게 예약요청 거절 메일 발송 실패");

      }catch(error){
        console.log("예약 요청 거절 메일 발송 실패");
        console.log(error);
      }
    }

    const sendCancelMapRequest = async(reason) => {
        const e = checkedRows[0];
        sendCancelRequest(e.restId, e.memId, e.resvDate, e.resvTime, e.resvId, reason);
    }

    
  

    useEffect (()=> {
        restResv("예약대기");
        console.log(checkedRows);
        
    },[])


    //예약 확정 하기
    const resvStatUpdate =async()=> {
        const rsp = await AxiosApi.resvStatUpdate(checkedRows);
        if (rsp.status === 200) setModalOpen("resvUpdate");
        console.log(rsp.data);

        await sendMapRequests();

    }
    //예약 거절 하기
    const resvDeleteModal =()=> {
      if(checkedRows.length === 1) {
        setModalOpen("resvDelete");

      } else {
        setModalOpen("error");
        setCheckedRows('');
      }
     
  }

    const resvDelete =async()=> {
      console.log(cancelReason);
      const resvId = checkedRows[0].resvId;
      const rsp = await AxiosApi.resvDel(resvId);
        if (rsp.status === 200){
          setModalOpen("resvDel");
          setCheckedRows('');
        } 
        sendCancelMapRequest(cancelReason);
        setCancelReason('');  
    }

     //팝업 처리
     const [modalOpen, setModalOpen] = useState(null);
     const closeModal = () => {
            setModalOpen(null);
            restResv("예약대기");
        };
    return(

    <ResvBlock>
      <div className="board-title">예약대기 리스트</div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>날짜</th>
            <th>NO.</th>
            <th>회원ID</th>
            <th>시간</th>
            <th>인원</th>
            <th>요청사항</th>
          </tr>
        </thead>
        <tbody>
        
        {resvList.map((e)=> (
          <tr key={e.resvId}>
            <td>
              <input
                type="checkbox"
                checked={checkedRows.includes(e)}
                onChange={() => handleCheckboxChange(e)}
              />
            </td>
            <td>{e.resvDate}</td>
            <td>{e.resvId}</td>
            <td>{e.memId}</td>
            <td>{e.resvTime}</td>
            <td>{e.resvPeople}</td>
            <td>{e.resvRequest}</td>
          </tr>
          ))}
        </tbody>
      </table>
      <div>
      <button className="btn" onClick={resvStatUpdate}>예약확정</button>
      <button className="btn" onClick={resvDeleteModal}>예약거절</button>
      </div>
      <MessageModal open={modalOpen === "error"} close={closeModal} header="삭제 오류" > 예약 거절은 리스트 당 한개만 선택 가능합니다.</MessageModal>
      <MessageModal open={modalOpen==="resvUpdate"} close={closeModal} type ="ok" header="확정 완료">예약이 확정 되었습니다. </MessageModal>
      <MessageModal open={modalOpen==="resvDel"} close={closeModal} type ="ok" header="거절 완료">예약이 거절 되었습니다. </MessageModal>
      <Modal open={modalOpen==="resvDelete"} close={closeModal} type ="add" header="취소 사유 " confirm={resvDelete}>
      <div className="del">취소 사유 입력
      <input type="text" value={cancelReason} onChange={(e)=>setCancelReason(e.target.value) } className="delInput"/>
      </div>
      </Modal>
    </ResvBlock>
  );
};

export default WatingList;