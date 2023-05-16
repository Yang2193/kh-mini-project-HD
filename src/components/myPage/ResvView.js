import React, {useContext}from "react";
import styled from "styled-components";
import { useState } from "react";
import { MemberContext } from "../../context/MemberContext";
import DatePicker from "react-datepicker";
import AxiosApi from "../../api/AxiosApi";
import Select from "react-select";
import ko from "date-fns/locale/ko";
import moment from "moment";
import Modal from "../../utils/Modal";
const CustomSelect = styled(Select)`
position: relative;
left: 100px;
bottom:30px;
    width: 200px;
    height: 20px;
    .css-13cymwt-control{
        height: 5px;
        font-size: 15px;

    }
`;
//리뷰 상세정보
const ResvModal = styled.div`
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
// 날짜 시간
const [value, setValue] = useState(new Date());// 날짜 저장
const [time,setTime] = useState(new Date());// 시간 저장
const date = moment(value).format("YYYY-MM-DD") + ' ' + moment(time).format("HH:mm:ss")

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
//요청사항
const[resReq,setResReq] = useState();
const onChange=(e)=>{
    setResReq(e.target.value)
}
// 업데이트
const onClickUpate =  async(resvId)=> {
    const rsp = await AxiosApi.updateRes(date,resReq,seat,people,resvId);
    console.log(date,resReq,seat,people,resvId);
    if(rsp.data){
        setShowInput(false);
    } 
    // date를 분리해서 업데이트 해야 resvTime이 제대로 나오나? emailRsp, emailBizRsp에선 data.date, data.time으로 넣을 시 변경 전 데이터로 입력되는 거 같음.
    const emailRsp = await AxiosApi.sendReservationUpdateEmail(data.restId, data.restName, data.memId, date, "테스트");
    if(emailRsp.status === 200){
        console.log(emailRsp.data);
        console.log("예약 변경 메일 발송")
    } else console.log("예약 변경 메일 발송 실패");

    const emailBizRsp = await AxiosApi.sendReservationUpdateEmailBiz(data.restId, data.restName, data.memId, date, "테스트", data.resvId);
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
    //  예약 취소 resvTime NULL로 뜸... 이 문제도 해결해야하고.
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
      locale={ko}
      dateFormat="a h:mm"/>  :
    <span className="result">{data.resvTime}</span>}
    <br />
    <label htmlFor ="peo">인원수 : </label>
    {showInput ? <CustomSelect options={optionPeos} defaultValue={optionPeos[0]} onChange={selPeo} /> :
                 <span className="result">{data.resvPeople}명</span>}
    <br />
    <label htmlFor ="seat">좌석 : </label>
    {showInput ? <CustomSelect options={optionSeats} defaultValue={optionSeats[0]} onChange={selSeat} /> :
                 <span className="result">{data.resvSeat}번</span>}
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