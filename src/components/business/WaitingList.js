import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";
import Modal from '../../utils/Modal';
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
  

    useEffect (()=> {
        restResv("예약대기");
    },[])

   // console.log(checkedRows);

    //예약 확정 하기
    const resvStatUpdate =async()=> {
        const rsp = await AxiosApi.resvStatUpdate(checkedRows);
        if (rsp.status === 200) setModalOpen(true);
        console.log(rsp.data);
    }

     //팝업 처리
     const [modalOpen, setModalOpen] = useState(false);
     const closeModal = () => {
            setModalOpen(false);
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
            <th>좌석번호</th>
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
            <td>{formatTime(new Date(e.resvDate))}</td>
            <td>{e.resvPeople}</td>
            <td>{e.resvSeat}</td>
            <td>{e.resvRequest}</td>
          </tr>
          ))}
        </tbody>
      </table>
      <button className="btn" onClick={resvStatUpdate}>예약확정</button>

      <Modal open={modalOpen} close={closeModal} type ="ok" header="확정 완료">예약이 확정 되었습니다. </Modal>
    </ResvBlock>
  );
};

export default WatingList;