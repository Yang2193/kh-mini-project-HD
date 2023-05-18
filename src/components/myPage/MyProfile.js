import React, { useEffect, useState ,useContext } from "react";
import styled from "styled-components";
import ProfileImg from "../../images/ProfileImg.png"
import AxiosApi from "../../api/AxiosApi";
import { MemberContext } from "../../context/MemberContext";
import Modal from "../../utils/Modal";
const MyProfileBlock = styled.div`  
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
    
    //프로필 이미지
    .profileImg img{
        width: 200px;
        height: 200px;
        border-radius :100px;
        
    }
    //버튼
    .confirmBtn{
            margin: 20px;
            font-size: 26px;
            font-weight: bold;
            width: 200px; 
            height: 50px;
            color: white;
            background-color: #FF7F50;
            font-size: 15px;
            border-radius: 18px;
            border:none;
            cursor: pointer;
        }


    .profileInfo{
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        .box{
                display: flex;
                flex-direction: row;
                margin: auto 20px;
                justify-content: center;
                align-items: center;
                label{
                    font-size: 20px;
                    width: 80px;
                    margin : 10px;
           
                }
                input{
                    margin-left: 10px;
                    margin-right: 10px;
                    width: 250px; 
                    height: 20px;
                    padding: .5em .1em; 
                    font-family: inherit; 
                    border: 1px solid #999;
                    font-size: 18px;
                    border-radius: 10px; /* iSO 둥근모서리 제거 */
                }
                .result {
                    margin-left: 10px;
                    margin-right: 10px;
                    width: 250px;
                    height: 20px;
                    font-size: 18px;
                    font-family: inherit;
                   
                }
            }
    }


`;
//나의 프로필
const MyProfile =  () => {
    const [showInput, setShowInput] = useState(false);
    const {memberValue,setMemberValue} = useContext(MemberContext);
    //팝업 처리
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => {
            setModalOpen(false);
        };
    useEffect(() => {    
        const memberInfo = async() => {
            const rsp = await AxiosApi.memberGet(localStorage.getItem("userId")); 
            if(rsp.status === 200) setMemberValue(rsp.data[0]);
            console.log(rsp.data[0]);
           
        };
        memberInfo();            
    }, []);

    const onClickUpate =  async()=> {

        const rsp = await AxiosApi.memberUpdate(memberValue);
        if(rsp.data){
            setMemberValue(memberValue);
            setModalOpen(true);
            //input창 닫기 
            setShowInput(false);
        } 
    }
    

    
    const onChange= (e) => {
        const{name,value} = e.target;
        setMemberValue(state => ({...state,[name]:value}));
    }
    if(!memberValue) return<MyProfileBlock>로그인이 필요합니다.</MyProfileBlock>;//추후 업데이트
    return( 
        <MyProfileBlock>
        <div className="profileImg"><img src={memberValue.imgFileName === null ? (ProfileImg):(memberValue.imgFileName)} alt="Logo" /></div>
        <div className="profileInfo">
            <div className="text">
            <div className="box">
            <label htmlFor ="name">이름</label>
            {showInput ? <input  type="text" id="name" name='name' value={memberValue.name} onChange={onChange}/> :
                         <span className="result">{memberValue.name}</span>}
            </div>
            <div className="box">
            <label htmlFor ="nickName">닉네임</label>
            {showInput ? <input type="text" id="nickName" name='nickName' value={memberValue.nickName} onChange={onChange}/> :
                        <span className="result">{memberValue.nickName}</span>}
            </div>
            </div> 
        </div>
        {showInput? <button className="confirmBtn" onClick={onClickUpate} style={{backgroundColor : "#FFA07A"}}>수정완료</button> :
                    <button className="confirmBtn" onClick={()=> setShowInput(true)}>프로필수정</button>}
        <Modal open={modalOpen} close={closeModal} type ="ok" header="수정 완료">프로필 수정 완료 되었습니다. </Modal>
        </MyProfileBlock>
    );
}

export default MyProfile;