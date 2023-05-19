
import React, { useState, useContext } from 'react';
import AxiosApi from '../../api/AxiosApi';
import styled from 'styled-components';
import {useNavigate } from "react-router-dom";
import { MemberContext } from '../../context/MemberContext';
import Modal from '../../utils/Modal';
import Password from '../../utils/Password';
import AddressModal from '../../utils/AddressModal';
import { storage } from "../../firebase/firebase";
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import { v4 } from "uuid"; // 이름이 같지 않게 랜덤함수 불러오기
import ActionButton from "../../utils/Button/ActionButton";
const MemberInfoBlock = styled.div`
       
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
      
    .box{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 400px;
        position: relative;
         .addrBtn{
            position: absolute;
            right: -100px;
            width: 100px;
            height: 30px;
            background-color: #FFA07A;
            border: none;
            cursor: pointer;
        }
      
            label{
                width: 150px;
                text-align: center;
                }
        margin: 1em;
            .btn{
                width: 100px;
                height: 50px;
                margin: 10px;
                display: inline-block;
                border: none;
                border-radius: 4px;
                padding: 8px 16px;
                background-color: #FF7F50;
                color: #fff;
                text-align: center;
                font-size: 18px;
                font-weight: bold;
                cursor: pointer;  
                &:hover{
                    background-color: #FFA07A;
                 }
                &:active{
                    background-color: #FFA07A;
                }
            }
            
           
   
        }
  .inputBox{
        margin-left: 10px;
        margin-right: 10px;
        width: 100%; 
        height: 20px;
        line-height : normal;
        padding: .8em .5em; 
        font-family: inherit; 
        border: 1px solid #999;
        border-radius: 18px;
        
    }
    .delBtn{
                font-family: inherit;
                background-color: #FBF4EF;
                font-size: 18px;
                border: none;
                position: absolute;
                right: 0;
                bottom:0;
                cursor: pointer;
                &:hover{
                    font-weight: bolder;
                }
             }
`;


//내정보 수정
const MemberInfo = () => {
    //컨텍스 api를 사용
    const{memberValue,setMemberValue} = useContext(MemberContext);
    //팝업 처리
    const [modalType, setModalType] = useState(null);

    const openModal = (type) => {
        setModalType(type);
    }
    const closeModal = () => {
        setModalType(null);
    };
    const closeCompletedModal = () => {
        setModalType(null);
        localStorage.removeItem("userId");
         navigate('/');
    }
    
    //navigate사용
    const navigate = useNavigate();

    //input 값 변경시 상태 변경
    const onChange = (e) => {
        const{name,value} = e.target;
        setMemberValue(state => ({...state,[name]:value}));
    };

    //수정버튼 클릭 시
    const submit = async()=> {
        let ImageUrl = null;
        if (imageUplod) {
            ImageUrl = await uploadImage();
            memberValue.imgFileName =ImageUrl;
        }
        const rsp = await AxiosApi.memberUpdate(memberValue);
        if(rsp.data){
            //console.log("회원정보 업데이트 완료!");
            setMemberValue(memberValue);
            openModal('ok');
        } 
    }
    

    //회원 탈퇴 클릭
    const memberDelete = async() => {

            const rsp = await AxiosApi.memberDel(memberValue.memId);
            if (rsp.data) {
              closeModal();
              console.log(rsp.data);
              openModal('delCompleted');
           
            }
           
    }
    // 주소찾기 팝업 및 조건부 렌더링 용
    const [isOpenPost, setIsOpenPost] = useState(false);
    const [inputAddress, setInputAddress] = useState(memberValue.addr);
    const openPost = () => {
        setIsOpenPost(true);
      };
      const closePost = () => {
        setIsOpenPost(false);
    }
    const searchAddress = (address) => {
        setInputAddress(address);
        setMemberValue((state) => ({ ...state, addr: address }));
    }

     // 이미지 업로드 기능
     const [imageUplod, setImageUpload] = useState(null);// 이미지 파일 저장 

     const onChangeImage =(e) =>{
         setImageUpload(e.target.files[0]);
     }
 
     const uploadImage = async () => {
         if(imageUplod===null) return;
 
         const imageRef = ref(storage, `images/${imageUplod.name + v4()}`);
         const uploadSnapshot = await uploadBytes(imageRef, imageUplod);
         const imageUrl = await getDownloadURL(uploadSnapshot.ref);
         return imageUrl;
       };

 
    if(!memberValue) return<div>로그인이 필요합니다.</div>;
	return (
 
		    <MemberInfoBlock>
            <div className='titleName'> 내 정보 조회 / 수정 </div>
                  <div className='box'>
                  <label htmlFor='id'>아이디</label>
                  <input id='id' name='memId'value={memberValue.memId} disabled={true} className="inputBox"/>
                  </div>
                  <div className='box'>
                  <label htmlFor='password'>비밀번호</label>
                  <input id='password' name='pwd' type="password" value={memberValue.pwd} onChange={onChange}  className="inputBox"/>
                  </div>
                  <div className='box'>
                  <label htmlFor='name'>이름</label>
                  <input id='name'name='name'value={memberValue.name} onChange={onChange}  className="inputBox"/>
                  </div>
                  <div className='box'>
                  <label htmlFor='nickName'>닉네임</label>
                  <input id='nickName' name='nickName' value={memberValue.nickName} onChange={onChange} className="inputBox"/>
                  </div>
                  <div className='box'>
                  <label htmlFor='phoneNum'>핸드폰 번호</label>
                  <input id='phoneNum' name='phoneNum' value={memberValue.phoneNum} onChange={onChange} className="inputBox"/>
                  </div>
                  <div className='box'>
                    <label htmlFor='addr'>주소</label>
                    <input id='addr' name='addr' value={inputAddress} onChange={onChange}  className="inputBox"/>
                    <button onClick={openPost} className='addrBtn'>주소찾기</button>
                    {isOpenPost && <AddressModal open={isOpenPost} onClose={closePost} searchAddress={searchAddress} />}
                    </div>
                   <div className='box'>
                  <label htmlFor='input-file'>프로필 사진</label>
                  <input id='input-file' name='imgFileName' type="file" onChange={onChangeImage} className="inputBox"/>
                  </div>
                    
                  <div className='box'>
                  <label htmlFor='email'>이메일</label>
                  <input id='email' name='email' value={memberValue.email} onChange={onChange} className="inputBox"/>
                  </div>
                <div className="box">
                <button className='btn' type="submit" onClick={submit}>수정</button>
                <button className='btn' onClick={()=>navigate(0)} style={{backgroundColor : "#EEE4DC"}}> 취소 </button>
                </div>
                <button className='delBtn' onClick={() => openModal('del')}>회원탈퇴</button>
               
                
                <Modal open={modalType === 'ok'} close={closeModal} type ="ok" header="수정 완료">회원 정보 수정이 완료 되었습니다.</Modal>
                <Modal open={modalType === 'delCompleted'} close={closeCompletedModal} type ="ok" header="탈퇴 완료">탈퇴가 완료 되었습니다.</Modal>
                <Modal open={modalType === 'del'} close={closeModal}  header="회원탈퇴"><Password type="del" memberDelete={memberDelete}>탈퇴하시려면 비밀번호 입력이 필요합니다.</Password></Modal>
                
        </MemberInfoBlock>
   

    );
}


export default MemberInfo;