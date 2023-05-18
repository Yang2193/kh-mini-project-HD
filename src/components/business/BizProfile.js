import React, { useEffect, useState } from "react";
import shop from "../../images/shop.png";
import styled, { css } from "styled-components";
import AxiosApi from "../../api/AxiosApi";
import Modal from "../../utils/Modal";
import {BsFillHeartFill} from 'react-icons/bs';
const ProfileBlock = styled.div`  
width: 70%;
height: auto;
margin: 30px auto;
background-color: #FBF4EF;
border-radius: 20px;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
align-items: center;
padding: 20px;
position: relative;
//프로필 이미지
.profileImg img{
    width: 300px;
    height: 200px;
    
}

.likeCnt{
    width: 60px;
    height: 60px;
    position: absolute;
    right:10px;
    top:15px;
    color :red;
}
.likeValue{
    width: 60px;
    height: 60px;
    position: absolute;
    right:10px;
    top:10px;
    color :white;
    font-size :30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;

}
//버튼
.confirmBtn{
        margin: 20px;
        font-size: 26px;
        font-weight: bold;
        width: 100px; 
        height: 40px;
        color: white;
        background-color: #FF7F50;
        font-size: 15px;
        border-radius: 18px;
        border:none;
    }
    .info{
            font-size: 20px;
            margin : 40px;
           
            }

    .box{
        display: flex;
        flex-direction: row;
         .inputBox, .result {
                margin-left: 10px;
                margin-right: 10px;
                width: 400px;
                height: 50px;
                padding: .5em .1em;
                font-family: inherit;
                border: 3px solid #999;
                font-size: 18px;
                border-radius: 10px;
                
            }

        }

`;

const StyledButton = styled.button`
  margin: 20px;
  font-size: 26px;
  font-weight: bold;
  width: 100px; 
  height: 40px;
  color: white;
  background-color: #FF7F50;
  font-size: 15px;
  border-radius: 18px;
  border: none;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
`;


const BizProfile = ({restInfoList,setRestInfoList,restName,likeCnt}) => {
    
   
    const [showInput, setShowInput] = useState(false);
    //팝업 처리
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => {
           setModalOpen(false);
       };
    const onClickUpate =  async()=> {

        const rsp = await AxiosApi.restInfoUpdate(restInfoList);
        if(rsp.data){
             setRestInfoList(restInfoList);
             setModalOpen(true);
            //input창 닫기 
             setShowInput(false);
         } 
    }
    useEffect(()=> {
        console.log(restInfoList);
    },[]);

 
    const onChange= (e) => { 
        const{name,value} = e.target;
        setRestInfoList(state => ({...state,[name]:value}));
    }
    return(
            <ProfileBlock>
            <BsFillHeartFill className="likeCnt"/>
            <span className="likeValue">{likeCnt===null ? 0 : likeCnt}</span>
            <div className="profileImg">  <img src={restInfoList && restInfoList.restImgFileName ? restInfoList.restImgFileName : shop} alt="Logo" /></div>
            <div className="info">
            <div>가게명 : <span className="result">{typeof restName === 'undefined'? "매장등록이 필요합니다." : restName}</span></div>
            <label htmlFor ="notice">공지사항</label>
            <div className="box">
            {showInput ? (<input className="inputBox" type="text" id="notice" name='restNotice' value={restInfoList.restNotice||''} onChange={onChange} />)
            :
            (<div className="result">{restInfoList===null ? "":restInfoList.restNotice}</div>)}
            
           
           {showInput ? (
                <StyledButton className="confirmBtn" onClick={onClickUpate} style={{ backgroundColor: "#FFA07A" }}>수정완료</StyledButton>
            ) : (
                <StyledButton className="confirmBtn" onClick={() => setShowInput(true)} disabled={restInfoList === ""}>수정</StyledButton>
            )
            }
            </div>
          
            <Modal open={modalOpen} close={closeModal} type ="ok" header="수정 완료">프로필 수정 완료 되었습니다. </Modal>
            </div>
         
            </ProfileBlock>
      
    );
}

export default BizProfile;