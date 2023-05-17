
import React, { useState, useEffect  } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import Table from '../../utils/table/CommonTable';
import TableColumn from '../../utils/table/CommonTableColumn';
import TableRow from '../../utils/table/CommonTableRow';
import AxiosApi from '../../api/AxiosApi';
import Modal from '../../utils/Modal';
import BizResvView from '../business/BizResvView';
import WatingList from './WaitingList';
const TableBlock = styled.div`
        margin: 10px;
        .common-table {
        width: 80%;
        margin: 0 auto;
        text-align: center;
        border-spacing: 0;
      
        }

        .common-table-header-column {
        border-bottom: 2px solid #ff7f50;
        padding: 0;
        font-size: 16px;
        padding: 10px 5px;
        font-weight: bold;
        }

        .common-table-row:hover {
        background-color: #F0B7A2;
        cursor: pointer;
        }
        .common-table-column {
        padding: 10px 5px;
        }
`;

const ResvListBlock = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
   .addBtn{
            position: absolute;
            right: 0;
            top :0;
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
    //달력 커스텀
    //오늘 표시 변경
    .react-calendar {
        width: 500px;
        max-width: 100%;
        background-color: #fff;
        color: #222;
        border-radius: 8px;
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
        line-height: 1.125em;
        font-size: 20px;
        }
 
        .react-calendar__navigation button {
        color: #FF7F50;
        min-width: 44px;
        background: none;
        font-size: 20px;
        margin-top: 8px;
        font-weight:bold;
        }
        
        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
        background-color: #f8f8fa;
        }
        .react-calendar__navigation button[disabled] {
        background-color: #f0f0f0;
        }
        abbr[title] {
        text-decoration: none;
        }

        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
        background: #FFA07A;
        color: #fff;
        border-radius: 40px;
        }
        
        .react-calendar__tile--now {
        background: #FBF4EF;
        border-radius: 6px;
        font-weight: bold;
        color: black;
        }
        

        
        .react-calendar__tile--active {
        background: #FFA07A;
        border-radius: 40px;
        font-weight: bold;
        color: white;
        }
        
        .react-calendar__tile--active:enabled:hover,
        .react-calendar__tile--active:enabled:focus {
        background: #FF7F50;
        color: white;
        }
        

`;

const ResvList = ({restValue}) => {
    const [resvList, setResvList] = useState([]);
    //예약 내역
    const restResv = async(stat) => {
      const rsp = await AxiosApi.restResvSelect(restValue.restId,stat);
      if (rsp.status === 200) setResvList(rsp.data);
      console.log(rsp.data);
     };

     useEffect(() => {
      restResv("예약확정");
      handleDateChange(new Date());
    }, []);

     //팝업 처리
     const [modalOpen, setModalOpen] = useState(null);
     //클릭한 행 상태 
     const [selectedResv, setSelectedResv] = useState(null);
     const closeModal = () => {
             restResv("예약확정");
             setModalOpen(null);
            
         };


    //현재날짜 기준 
    const [selectedDate, setSelectedDate] = useState(new Date());
    //날짜별 예약리스트
    const [filteredResvList, setFilteredResvList] = useState([]);
    const handleDateChange = (date) => {
      setSelectedDate(date);

      // 선택한 날짜에 해당하는 예약 목록을 필터링하여 업데이트합니다.
        const filteredList = resvList.filter((e) => {
            const reservationDate = new Date(e.resvDate);
            return (
            reservationDate.getFullYear() === date.getFullYear() &&
            reservationDate.getMonth() === date.getMonth() &&
            reservationDate.getDate() === date.getDate()
            );
        });
        setFilteredResvList(filteredList);
      
    };

    function formatTime(date) {
        const options = {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        };
      
        return date.toLocaleString('ko-KR', options);
      }

      const resvClick = (resv) => {
        setModalOpen("click");
        setSelectedResv(resv);
    }
    return(
        <>
            <ResvListBlock>
             <div className='titleName'> 예약 리스트 </div>
             <button className='addBtn' onClick={()=> setModalOpen("wait")}>예약대기목록</button>
                <Calendar
                            value={selectedDate}
                            onChange={handleDateChange}
                            formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}
                        />
            </ResvListBlock> 
                <TableBlock>
                    <Table headersName={['NO.','날짜', '예약ID', '예약시간', '인원수']}>
                    {filteredResvList && filteredResvList.map((e) => (
                        <TableRow key ={e.resvId} onClick = {() =>resvClick(e)}>
                        <TableColumn>{e.resvId}</TableColumn>
                        <TableColumn>{e.resvDate}</TableColumn>
                        <TableColumn>{e.memId}</TableColumn>
                        <TableColumn>{e.resvTime}</TableColumn>
                        <TableColumn>{e.resvPeople}명</TableColumn>
                        </TableRow>
                    ))}
                    </Table>
                </TableBlock>
                <Modal open={modalOpen === "wait"} close={closeModal} header="예약 확정하기" type="resv"><WatingList restResv={restResv} resvList={resvList} formatTime={formatTime} setModalType={setModalOpen}/></Modal>
                <Modal open={modalOpen==="resvUpdate"} close={closeModal} type ="ok" header="확정 완료">예약이 확정 되었습니다. </Modal>
                <Modal open={modalOpen ==="click"} close={closeModal} header="예약 정보" type="ok">{selectedResv&& <BizResvView data={selectedResv}/>}</Modal>
        </>
       
      
    );
}

export default ResvList;