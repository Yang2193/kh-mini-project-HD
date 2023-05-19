import React, {useContext}from "react";
import styled from "styled-components";
import { useState,useEffect } from "react";
import { MemberContext } from "../../context/MemberContext";
import DatePicker from "react-datepicker";
import AxiosApi from "../../api/AxiosApi";
import ko from "date-fns/locale/ko";
import moment from "moment";
import Modal from "../../utils/Modal";

//리뷰 상세정보
const ResvModal = styled.div`
    border-radius: 15px;
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
    input{
        position: relative;
        left:100px;
        bottom:35px
    }
    #seat{
        position: relative;
        bottom:30px;
    }
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
        .react-datepicker{
            position: relative;
            left:100px;
        }
        input{
            height: 30px;
            font-size:15px;
            margin: 0;
        }
        select{
            margin-left: 10px;
            width: 100px;
            height: 30px;
            font-size:15px;

        }
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

const ResvView = ({data,setModalOpen}) => {
const {memberValue} = useContext(MemberContext);

// 예약 변경
const [showInput, setShowInput] = useState(false);
// 초기값을 위한 시간 타입 변경
const timeString = data.resvTime; // "오후 00:00"
const isPM = timeString.includes("오후");
const timeParts = timeString.replace(/[^\d:]/g, "").split(":");
let hours = parseInt(timeParts[0], 10);
const minutes = parseInt(timeParts[1], 10);

if (isPM && hours !== 12) {
  hours += 12;
} else if (!isPM && hours === 12) {
  hours = 0;
}

const timeFormat = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00`;
console.log(timeFormat); // "15:00:00"

// date 저장
const [value, setValue] = useState(new Date(data.resvDate));// 날짜 저장, 초기값 세팅
const [time, setTime] = useState(moment(timeFormat, "HH:mm:ss").toDate()); // 시간 저장, 초기값 세팅

const date = moment(value).format("YYYY-MM-DD") + ' ' + moment(time).format("HH:mm:ss");
const inputDate = moment(value).format("YYYY-MM-DD"); //날짜 이메일 보낼 떄 따로 넣기 위해서 수정.
// 인원 수
const [people, setPeople] = useState(1);
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
// 좌석
const [seat, setSeat] = useState(1);
//요청사항
const[resReq,setResReq] = useState();
const onChange=(e)=>{
    setResReq(e.target.value)
}

// 오전/ 오후 표시하기 위해서 가져왔어요
function formatTime(date) {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
  
    return date.toLocaleString('ko-KR', options);
  }

// 업데이트
const onClickUpate =  async(resvId)=> {
    const rsp = await AxiosApi.updateRes(date,resReq,seat,people,resvId);
    console.log(date,resReq,seat,people,resvId);
    if(rsp.data){
        setShowInput(false);
        setModalOpen("updateOK");
    } 

    const inputTime = formatTime(new Date(date));

    const emailRsp = await AxiosApi.sendReservationUpdateEmail(data.restId, data.restName, data.memId, inputDate, inputTime);
    if(emailRsp.status === 200){
        console.log(emailRsp.data);
        console.log("예약 변경 메일 발송")
    } else console.log("예약 변경 메일 발송 실패");

    const emailBizRsp = await AxiosApi.sendReservationUpdateEmailBiz(data.restId, data.restName, data.memId, inputDate, inputTime, data.resvId);
    if(emailBizRsp.status === 200){
        console.log(emailBizRsp.data);
        console.log("사업자 회원에게 예약 변경 메일 발송")
    } else console.log("사업자 회원에게 예약 변경 메일 발송 실패");

}
// 예약 취소 
const onClickDel = async(resvId) => {
    const rsp = await AxiosApi.resvDel(resvId);
    if(rsp.data){
       console.log("삭제완료");
       setModalOpen("delOK");
    } 
    
    const emailRsp = await AxiosApi.sendReservationCancelEmail(data.restId, data.restName, data.memId, data.resvDate, data.resvTime);
    if(emailRsp.status === 200){
        console.log(emailRsp.data);
        console.log("예약 취소 메일 발송")
    } else console.log("예약 취소 메일 발송 실패");

    const emailBizRsp = await AxiosApi.sendReservationCancelEmailBiz(data.restId, data.restName, data.memId, data.resvDate, data.resvTime, data.resvId);
    if(emailBizRsp.status === 200){
        console.log(emailBizRsp.data);
        console.log("사업자 회원에게 예약 취소 메일 발송")
    } else console.log("사업자 회원에게 예약 취소 메일 발송 실패");

}

    return(
    <ResvModal data={data}>
    <div className="stat">{data.resvStat}</div>
    <div className="restName">{data.restName}</div>
    <br />
    <div className="section1">
        <label htmlFor ="date">날짜 : </label>
        {showInput ?  <DatePicker
        selected={value}
        onChange={(date) => setValue(date)}
        id="date"
        locale={ko}
        dateFormat="yyyy-MM-dd"/> 
        : <span className="result">{moment(data.resvDate).format("YYYY-MM-DD")}</span>}
        <br />
        <label htmlFor ="time">시간 : </label>
        {showInput ?<DatePicker
        selected={time}
        onChange={(date) => setTime(date)}
        showTimeSelect
        showTimeSelectOnly
        minTime={new Date().setHours(8, 0)}
        maxTime={new Date().setHours(20, 0)}
        timeCaption="시간"
        locale={ko}
        dateFormat="a h:mm"/>  :
        <span className="result">{data.resvTime}</span>}
        <br />
        <label htmlFor ="peo">인원수 : </label>
        {showInput ? <select onChange={handlePeo} value={people}>
                        {setOption(1,10)}
                     </select> 
                    : <span className="result">{data.resvPeople}명</span>
        }
        <br />
    </div>
    <br />
    <div className="section2Title">예약자 정보 및 요청사항</div>
    <div className="section2">
    <div>이름 : {memberValue.name}</div>
    <div>전화번호 : {memberValue.phoneNum}</div>
    <label htmlFor ="date">요청사항 : </label>
    {showInput ? <textarea placeholder='요청사항을 적으세요' value={resReq} onChange={onChange} cols="45" rows="10"/> :
                 <div className="box">{data.resvRequest}</div> }
    
    </div>
    <div>
    {data.resvStat !=="예약확정" &&(<>
    {showInput ? <button className="updateBtn btn" onClick={()=>onClickUpate(data.resvId)} style={{backgroundColor : "#FFA07A"}}>예약변경완료</button>:
                <button className="updateBtn btn" onClick={()=> setShowInput(true)} >예약변경</button>}</>)}
        <button className="cancelBtn btn" onClick={()=> onClickDel(data.resvId)}>예약취소</button>
    </div>
    
    </ResvModal>
    );


}

export default ResvView;