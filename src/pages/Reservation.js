import React,{useContext,useState}from "react";
import { RestIdContext } from "../context/RestaurantId";
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

const Reservation =() =>{
    const {restId} = useContext(RestIdContext);
    const memId = localStorage.getItem("memId");  // 로컬 스토리지로 로그인 시 회원 id 입력받고

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
        <>
            <Header/>
            {type ==="booking"&&(
                <div>
                    <div>
                        <Calendar 
                        onChange={setValue} 
                        value={value}
                        calendarType="US"
                        minDate={new(Date)}
                        />
                    </div>
                    <div>
                        <p>시간을 선택해 주세요:</p>
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
                        <p>인원을 선택해 주세요:</p>
                        <Select options={optionPeos} defaultValue={optionPeos[0]} onChange={selPeo} />
                    </div>
                    <div>
                        <p>좌석을 선택해 주세요:</p>
                        <Select options={optionSeats} defaultValue={optionSeats[0]} onChange={selSeat} />
                    </div>
                    <button onClick={changeType}>다음</button>
                    <button onClick={()=>navigate(-1)}>취소</button>
                </div>
            )}
            {type==="check"&& (
                <ResCheck data = {data}/>
            )}
            <HomeFooter/>        
        </>
    );
}

export default Reservation;