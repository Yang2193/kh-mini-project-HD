import React,{useState,useEffect} from "react";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import moment from "moment/moment";
import ko from "date-fns/locale/ko";
import DatePicker from "react-datepicker";
import 'react-calendar/dist/Calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import styled from "styled-components";
import Modal from "../Modal";
import { de } from "date-fns/locale";
import ReservationCheck from "./ReservationCheck";

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
        height: 80%;
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
        height: 82%;
        padding: 16px;
        border-bottom: 1px solid #dee2e6;
        border-top: 1px solid #dee2e6;
        .cont2{
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        .cont3{
            width: 100%;
            display: flex;
            flex-direction: column;
            background-color: #EEE4DC;
            border-radius: 15px;
            select{
                width: 100px;
                height:30px ;
                font-size: 20px;
            }
        }
        .setTime{
            position: relative;
            bottom:40px;
            width: 200px;
            left:220px;
            input{
                padding: 0px 10px;
                width: 100px;
                height: 30px;
                font-size: 20px;
            }
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

    .react-calendar {
        margin-bottom: 30px;
        padding: 15px;
        width: 100%;
        max-width: 100%;
        background-color: #fff;
        color: #222;
        border-radius: 8px;
        /* box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2); */
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
        .react-calendar__tile{
            background-color: #fff;
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

const ReservationModal = (props) =>{
    const {open,close} = props;
	const restId = localStorage.getItem("restId");
    const memId = localStorage.getItem("userId"); 
    const navigate = useNavigate();

// 캘린더 
    const [value, setValue] = useState(new Date());// 날짜 저장
    const [time,setTime] = useState(new Date().setHours(8, 0, 0, 0));// 시간 저장
// 인원 수, 고정 좌석번호 저장
    const [people, setPeople] = useState(1);
    const [seat,setSeat] = useState(1);

    function handlePeo(e) { 
        setPeople(e.target.value);
      }
    function setOption(start, end) { // 포문 돌려서 옵션 생성
        const options = [];
        for (let i = start; i <= end; i++) {
          options.push(
            <option key={i} value={i}>
              {i}명
            </option>
          );
        }
        return options;
    }
    // 최종 데이터 저장
    const date = moment(value).format("YYYY-MM-DD") + ' ' + moment(time).format("HH:mm:ss")
    const data = 
        {
        restId : restId,
        memberId:memId,
        resDate:date,
        resSeat:seat,
        resPeo:people
        }
    // 회원정보 받아와서 예약하기 화면에 뿌리기
        useEffect(()=>{ 
            const getMember = async() => {
                const rsp = await AxiosApi.memberGet(memId);
                localStorage.setItem("forRes", JSON.stringify(rsp.data));
                console.log(localStorage.getItem("forRes"));
            }
            getMember();
        },[]);

    //팝업 처리
       const [modalOpen, setModalOpen] = useState(false);
       const closeModal = () => {
                close();
              setModalOpen(false);
          };
        const nextPage =() =>{
            setModalOpen(true);
        }
    return(
        <ModalStyle>
            <div className={open ? "openModal modal" : "modal"}>
            {open && 
                <div className="section">
                    <header>
                        <p>예약 신청</p>
                        <button onClick={close}>&times;</button>
                    </header>
                    <main>
                    <div className="cont2">
                        <div className="cal">
                            <Calendar 
                            onChange={setValue} 
                            value={value}
                            calendarType="US"
                            minDate={new(Date)}
                            />
                        </div>
                        <div className="cont3">
                                <p>시간을 선택해 주세요 :</p>
                            <div className="setTime">
                                <DatePicker
                                    selected={time}
                                    onChange={(date) => setTime(date)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    minTime={new Date().setHours(8, 0)}
                                    maxTime={new Date().setHours(20, 0)}
                                    timeCaption="시간"
                                    dateFormat="a h:mm"
                                    locale={ko}
                                />
                            </div>
                            <p>인원을 선택해 주세요 : <select onChange={handlePeo} value={people}>
                                                        {setOption(1,10)}
                                                    </select>
                            </p>
                        </div>
                    </div>
                    </main>
                    <footer>
                        <button className="back" onClick={close}>취소</button>
                        <button className="next" onClick={nextPage} >다음</button>
                    </footer>
                </div>
            }
            </div>
            <ReservationCheck open={modalOpen} close={closeModal}data={data}></ReservationCheck>
        </ModalStyle>
    )
}

export default ReservationModal;