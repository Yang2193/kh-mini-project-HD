import React, { useState } from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";

const InquriyBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 90%;
    margin : 0 auto;
    font-size: 20px;
    .box1{
        background-color:#FBF4EF;
        width: 90%;
        height: 30px;
        align-items: center;
        display: flex;
        align-items: center;
    }
    .box2{
        background-color:#FBF4EF;
        width: 90%;
        height: 50px;
        align-items: center;
        display: flex;
        align-items: center;
        font-size: 30px;
        font-weight: bold;
    }
    .box3{
        background-color:#FBF4EF;
        width: 90%;
        height: 150px;
        font-size: 25px;
        align-items: center;
        
    }
    .box4{
        background-color:#EEE4DC;
        width: 90%;
        height: 100px;
        font-size: 25px;
        align-items: center;
        border: none;
        
    }
    & > * {
        margin-bottom : 10px;
        padding: 5px;
    }

    .confirmBtn{
        //margin: 20px;
        font-size: 26px;
        font-weight: bold;
        width: 200px; 
        height: 40px;
        color: white;
        background-color: #FF7F50;
        font-size: 15px;
        border-radius: 5px;
        border:none;
        cursor: pointer;
    }
`;
const InquiryView = ({data,restInquiry,setModalOpen}) => {

    //답변 입력창 답변 내용창 상태관리
    const [showInput, setShowInput] = useState(false);
    
    const[answer, setAnswer] = useState(data);
    
    console.log(answer);
    //input창 값 입력시 상태 관리
    const onChange= (e) => { 
        const{name,value} = e.target;
        setAnswer((state)=> ({
            ...state,
            [name]: value
          }));
    }


    //답변 등록
    const answerUpdate = async () => {
        const rsp = await AxiosApi.inquiryAnswerUpdate(answer);
        if(rsp.data){
            setModalOpen("ok");
            //input창 닫기 
             setShowInput(false);
             restInquiry();
         } 

        //이메일 보내기
        const emailRsp = await AxiosApi.sendInquiryAnswerEmail(data.restId, data.memId);
            if(emailRsp.status === 200){
                console.log("회원에게 이메일 전송여부");
                console.log(emailRsp.data);
            } else console.log("회원에게 이메일 전송실패")

        const emailBizRsp = await AxiosApi.sendInquiryAnswerEmailBiz(data.restId, data.memId);
            if(emailBizRsp.status === 200){
                console.log("사업자에게 이메일 전송여부");
                console.log(emailBizRsp.data)
            } else console.log("사업자 회원에게 이메일 전송실패");
    }

    //답변하기 버튼 클릭 
    const answerBtnClick =() => {
        setShowInput("ok");
        // 답변완료 업데이트
        setAnswer((prevAnswer) => ({
            ...prevAnswer,
            inquiryStat: "답변완료"
        }));

     
    }
   

    
    return(
        <InquriyBlock>
        <div className="titleName">문의 내역</div>
        <div>NO.{data.inquiryId}</div>
        <div className="box1">아이디 : {data.memId}님</div>
        <div className="box2">제목 : {data.inquiryTitle}</div>
        <div className="box3">{data.inquiryContent}</div>
        {showInput ? (<input className="box4" type="text" name='inquiryAnswer' value={answer.inquiryAnswer||''} onChange={onChange} autoFocus={true} placeholder="답변입력"/>)
            :
        (<div className="box4">{answer.inquiryAnswer}</div>)}
            
        {showInput? <button className="confirmBtn" onClick={answerUpdate}style={{backgroundColor : "#FFA07A"}}>답변완료</button> :
                    <button className="confirmBtn" onClick={answerBtnClick}>{data.inquiryAnswer ? ("수정하기"):("답변하기")}</button>}
        
        
        </InquriyBlock>
    );
}

export default InquiryView;