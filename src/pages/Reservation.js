import React,{useContext,useState}from "react";
import HomeFooter from "../components/footer/HomeFooter";
import Header from "../components/header/Header";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from "react-calendar";
import moment from "moment/moment";
import ko from "date-fns/locale/ko";
import Select from 'react-select';
import ResCheck from "../components/restaurantComponent/ResCheck";
import 'react-calendar/dist/Calendar.css'; // css import

const Style = styled.div`
.cont{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
button {
    width: 100px;
    height: 30px;
    position: relative;
}
.back{
        left:600px;
        background-color: #FF7F50;
    }
    .next{
        top:30px;
        left:800px;
        background-color: #FF7F50;
    }

    //달력 커스텀
    //오늘 표시 변경
    .react-calendar {
        margin: 30px;
        width: 700px;
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


const Reservation =() =>{
	const restId = localStorage.getItem("restId");
    const memId = localStorage.getItem("userId");  // 로컬 스토리지로 로그인 시 회원 id 입력받고

    const navigate = useNavigate();
	const[type,setType] = useState("booking");
    const changeType = () => {
        setType("check");
    }
    
// 캘린더 
    const [value, setValue] = useState(new Date());// 날짜 저장
    const [time,setTime] = useState(new Date());// 시간 저장
// 인원 수
    const [people, setPeople] = useState(1);

    function selPeo(selectedOption) {
        setPeople(selectedOption.value);
      }
    
    const optionPeos = [];
      for (let i = 1; i <= 10; i++) {
        optionPeos.push({ value: i, label: `${i}명` });
      }
// 좌석
    const [seat, setSeat] = useState(1);

    function selSeat(selectedOption) {
        setSeat(selectedOption.value);
    }

    const optionSeats = [];
    for (let i = 1; i <= 10; i++) {
        optionSeats.push({ value: i, label: `${i}번` });
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
        window.localStorage.setItem("data", data);
    
    return(
        <Style>
            <Header/>
            {type ==="booking"&&(
                <div className="cont">
                    <div>
                        <Calendar 
                        onChange={setValue} 
                        value={value}
                        calendarType="US"
                        minDate={new(Date)}
                        />
                    </div>
                    <div className="">
                        <p>시간을 선택해 주세요 :</p>
                        <DatePicker
                        selected={time}
                        onChange={(date) => setTime(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={60}
                        minTime={new Date().setHours(11, 0)}
                        maxTime={new Date().setHours(20, 0)}
                        timeCaption="Time"
                        dateFormat="a h:mm"
                        locale={ko}
                        />
                    </div>
                    <div>
                        <p>인원을 선택해 주세요 :</p>
                        <Select options={optionPeos} defaultValue={optionPeos[0]} onChange={selPeo} />
                    </div>
                    <div>
                        <p>좌석을 선택해 주세요 :</p>
                        <Select options={optionSeats} defaultValue={optionSeats[0]} onChange={selSeat} />
                    </div>
                    <button className="next" onClick={changeType}>다음</button>
                    <button className="back" onClick={()=>navigate(-1)}>취소</button>
                </div>
            )}
            {type==="check"&& (
                <ResCheck data = {data}/>
            )}
            <HomeFooter/>        
        </Style>
    );
}

export default Reservation;