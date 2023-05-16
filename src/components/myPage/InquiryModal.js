import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../utils/Modal";
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
const InquiryModal = ({data,inquiryInfo}) => {

    //답변 입력창 답변 내용창 상태관리
    const [showInput, setShowInput] = useState(false);
    
    const[updateValue, setUpdateValue] = useState(data);
    
    //input창 값 입력시 상태 관리
    const onChange= (e) => { 
        const{name,value} = e.target;
        setUpdateValue((state)=> ({
            ...state,
            [name]: value
          }));
    }

    //팝업 처리
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => {
           setModalOpen(false);
           
       };

    //답변 등록
    const inquiryUpdate = async () => {
        const rsp = await AxiosApi.inquiryUpdate(updateValue);
        if(rsp.data){
             setModalOpen(true);
            //input창 닫기 
             setShowInput(false);
             inquiryInfo();
         }
         
    }
    //답변하기 버튼 클릭 
    const updateBtnClick =() => {
        setShowInput(true)
    }
   

    
    return(
        <InquriyBlock>
        <div className="titleName">문의 내역</div>
        <div>NO.{data.inquiryId}</div>
        <div className="box1">아이디 : {data.memId}님</div>
        {showInput ? (<input className="box2" type="text" name='inquiryTitle' value={updateValue.inquiryTitle||''} onChange={onChange} autoFocus={true} placeholder="제목입력"/>)
            :(<div className="box2">제목 : {updateValue.inquiryTitle}</div>)}
        {showInput ? (<input className="box3" type="text" name='inquiryContent' value={updateValue.inquiryContent||''} onChange={onChange} placeholder="내용입력"/>)
            :(<div className="box3">{updateValue.inquiryContent}</div>)}
        <div className="box1">첨부파일 : {data.inquiryImgFileName}</div>
        <div className="box4">{data.inquiryAnswer}</div>
        {showInput ? (<button className="confirmBtn" onClick={inquiryUpdate} style={{ backgroundColor: "#FFA07A" }}>수정완료</button>) : 
            data.inquiryAnswer ? null : (<button className="confirmBtn" onClick={updateBtnClick}>수정하기</button>)}
        
        <Modal open={modalOpen} close={closeModal} type ="ok" header="수정 완료"> 문의 수정이 완료 되었습니다. </Modal>
        </InquriyBlock>
    );
}

export default InquiryModal;