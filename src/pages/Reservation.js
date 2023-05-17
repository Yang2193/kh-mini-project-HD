import React,{useContext,useState,useEffect}from "react";
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
import AxiosApi from "../api/AxiosApi";
const Style = styled.div`
	font-family: "NanumGothic";
	background-color:#EEE4DC;
    .all{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .cont{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        border-radius: 15px;
        margin-top: 30px;
        width: 1000px;
        height: 710px;
		background-color: #fff;

        .cal{
            flex-direction: column;
        }
        .setTime{
            padding:10px;
            border: 1px solid;
            width: 690px;
            height: 120px;
            position: relative;
            font-size: 20px;
            border-radius: 15px;

        }
        .setPeo{
            width: 300px;        
            position: relative;
            bottom:130px;
            left:200px;
            font-size: 20px;
        }
    }
    .btns {
        display: flex;
        justify-content: center;
        align-items: center;
        button{
        position: relative;
        background-color:#FF7F50;
        bottom:40px;
        width: 100px;
        height: 30px;
        border: none;
        border-radius: 15px;
        font-size: 15px;
        }
        button:hover{
            color:white;
        }
    }
    .back {
        right:150px;
    }
    .next {
        left: 150px;

    }
    //select 커스텀
    .css-b62m3t-container{
        width: 100px;
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
    const [time,setTime] = useState(new Date().setHours(8, 0, 0, 0));// 시간 저장
// 인원 수
    const [people, setPeople] = useState(1);
    const [seat,setSeat] = useState(1);

    function selPeo(selectedOption) {
        setPeople(selectedOption.value);
      }
    
    const optionPeos = [];
      for (let i = 1; i <= 10; i++) {
        optionPeos.push({ value: i, label: `${i}명` });
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
    // 회원정보 받아와서 예약하기 화면에 뿌리기
        useEffect(()=>{ 
            const getMember = async() => {
                const rsp = await AxiosApi.memberGet(memId);
                localStorage.setItem("forRes", JSON.stringify(rsp.data));
                console.log(localStorage.getItem("forRes"));
            }
            getMember();
        },[]);
            
    return(
        <Style>
            <Header/>
            {type ==="booking"&&(
            <div className="all">
                <div className="cont">
                <h1>예약 신청</h1>

                    <div className="cal">
                        <Calendar 
                        onChange={setValue} 
                        value={value}
                        calendarType="US"
                        minDate={new(Date)}
                        />
                    </div>
                    <div className="setTime">
                        <p>시간을 선택해 주세요 :</p>
                        <DatePicker
                        selected={time}
                        onChange={(date) => setTime(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={60}
                        minTime={new Date().setHours(8, 0)}
                        maxTime={new Date().setHours(20, 0)}
                        timeCaption="Time"
                        dateFormat="a h:mm"
                        locale={ko}
                        />
                    </div>
                    <div className="setPeo">
                        <p>인원을 선택해 주세요 :</p>
                        <Select options={optionPeos} defaultValue={optionPeos[0]} onChange={selPeo} />
                    </div>
                    {/* <div>
                        <p>좌석을 선택해 주세요 :</p>
                        <Select options={optionSeats} defaultValue={optionSeats[0]} onChange={selSeat} />
                    </div> */}
                    <div className="btns">
                        <button className="next" onClick={changeType}>다음</button>
                        <button className="back" onClick={()=>navigate(-1)}>취소</button>
                    </div>
                </div>
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