import React, { useContext, useState } from "react";
import styled from "styled-components";
import Select from 'react-select';
import {RestaurantContext} from "../../context/RestaurantContext";
import AxiosApi from "../../api/AxiosApi";
import Modal from "../../utils/Modal";
import {useNavigate } from "react-router-dom";
import AddressModal from "../../utils/AddressModal";
import { storage } from "../../firebase/firebase";
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import { v4 } from "uuid"; // 이름이 같지 않게 랜덤함수 불러오기


const RestInsertBlock = styled.div`
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
        .option{
            width: 150px;
            text-align: center;
        }
        
            label{
                width: 120px;
                text-align: right;
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
           
   
        }
  .inputBox{
        margin-left: 10px;
        margin-right: 10px;
        width: 300px; 
        height: 20px;
        line-height : normal;
        padding: .8em .5em; 
        font-family: inherit; 
        border: 1px solid #999;
        border-radius: 18px;
        
    }
    .radioBtn{
       margin: 0 auto;
       padding: 0;
       width: 50px;
       text-align: center;
    }
    .radioBox {
        display: flex;
        align-items: center;

        label{
            width: auto;
           
        }
    
    
    }
        
  

`;
const RestInsert = ({restInfoList,setRestInfoList}) => {
    
    const {restValue, setRestValue} =useContext(RestaurantContext);
    
    const options = [
        {value:'한식',label:'한식'},
        {value:'중식',label:'중식'},
        {value:'양식',label:'양식'},
        {value:'일식',label:'일식'},
        {value:'아시안',label:'아시안'},
        {value:'분식',label:'분식'},
        {value:'카페/디저트',label:'카페/디저트'},
        {value:'국/탕/찌개',label:'국/탕/찌개'},
        {value:'패스트푸드',label:'패스트푸드'}
    ];
    const defaultOption = {value:restValue.category,label:restValue.category};


    const [selectOption, setSelectOption] = useState(null);
    const selectChange = (selectedOption) => {
        console.log(selectOption);
        setSelectOption(selectedOption);
        setRestValue(state => ({...state, category: selectedOption.value}));
      };


   //input 값 변경시 상태 변경
   const restOnChange = (e) => {
    const{name,value} = e.target;
    setRestValue(state => ({...state,[name]:value}));
};
const restInfoOnChange = (e) => {
    const{name,value} = e.target;
  
    setRestInfoList(state => ({...state,[name]:value}));
};

//두개 객체의 동시에 변경해야해서 따로 적용
const restIdOnchange = (e) => {
    const{name,value} = e.target;
    console.log(name,value);
    setRestValue(state => ({...state,[name]:value}));
    setRestInfoList(state => ({...state,[name]:value}));
};

//팝업 처리
const [modalOpen, setModalOpen] = useState(false);
const closeModal = () => {
       setModalOpen(false);
    //    navigate(0);
   };
   const onClickUpate =  async()=> {
     let ImageUrl = null;
     if (imageUplod) {
            ImageUrl = await uploadImage();
            restInfoList.restImgFileName =ImageUrl;
    }
    const rsp = await AxiosApi.restInfoUpdate(restInfoList);
    const rsp2 = await AxiosApi.restUpdate(restValue);
    if(rsp.data && rsp2.data){
         setRestInfoList(restInfoList);
         setRestValue(restValue);
         setModalOpen(true);
     } 
    }
     //navigate사용
     const navigate = useNavigate();

     // 주소찾기 팝업 및 조건부 렌더링 용
    const [isOpenPost, setIsOpenPost] = useState(false);
    const [inputAddress, setInputAddress] = useState(restInfoList.restAddr);
    const openPost = () => {
        setIsOpenPost(true);
      };
      const closePost = () => {
        setIsOpenPost(false);
    }
    const searchAddress = (address) => {
        setInputAddress(address);
        setRestInfoList((state) => ({ ...state, restAddr: address }));
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
    
    return(
            <RestInsertBlock>
            <div className='titleName'> 매장정보 수정 </div>
                  <div className='box'>
                  <label htmlFor='id'>사업자 ID : </label>
                  <input id='id' disabled={true} value={restValue.memId} className="inputBox"/>
                  </div>
                  <div className='box'>
                  <label htmlFor='id'>사업자 등록번호 :</label>
                  <input id='id'value={restValue.restId} name='restId' onChange={restIdOnchange} className="inputBox"/>
                  </div>
                  <div className='box'>
                  <label htmlFor='id'>매장 이름 :</label>
                  <input id='id' value = {restValue.restName||''}name='restName' onChange={restOnChange} className="inputBox"/>
                  </div>
                  <div className='box'>
                  <label htmlFor='id'>전화 번호 : </label>
                  <input id='id' value={restInfoList.restPhoneNum||''} name='restPhoneNum'onChange={restInfoOnChange} className="inputBox"/>
                  </div>
                   <div className='box'>
                    <label htmlFor='addr'>주소</label>
                    <input id='addr' name='restAddr' value={inputAddress} onChange={restInfoOnChange} className="inputBox" />
                    <button onClick={openPost} className='addrBtn'>주소찾기</button>
                    {isOpenPost && <AddressModal open={isOpenPost} onClose={closePost} searchAddress={searchAddress} />}
                    </div>
                    <div className='box'>
                     <label htmlFor='input-file'>프로필 사진</label>
                    <input id='input-file' name='imgFileName' type="file" onChange={onChangeImage}/>
                  </div>
                  <div className='box'>
                  <label htmlFor='id'> 공지사항 : </label>
                  <input id='id' value={restInfoList.restNotice||''} name='restNotice'onChange={restInfoOnChange} className="inputBox"/>
                  </div>
                  <div className='box'>
                  <label htmlFor='id'>영업시간 : </label>
                  <input id='id' value={restInfoList.restHours||''} name='restHours'onChange={restInfoOnChange} className="inputBox"/>
                  </div>
                  <div className='box'>
                  <label htmlFor='id'>소개 글 : </label>
                  <input id='id' value={restInfoList.restIntro||''} name='restIntro'onChange={restInfoOnChange} className="inputBox"/>
                  </div>
                  <div className='box'>
                  <label>예약가능 여부: </label>
                  <div className="radioBox">
                  <input id="resvT" className="radioBtn" name="isAvailable" type="radio" value={1} defaultChecked={restValue.isAvailable === 1} onChange={restOnChange}/>
                  <label htmlFor="resvT"> 예약가능</label>
                  <input id="resvF" className="radioBtn"  name="isAvailable" type="radio" value={0} defaultChecked={restValue.isAvailable === 0} onChange={restOnChange}/>
                  <label htmlFor="resvF">예약불가</label>
                  </div>
                  </div>
                  <div className='box'>
                  <label htmlFor='id'>매장 분류 :  </label>
                 <Select
                    options={options}
                    value={defaultOption}
                    onChange={selectChange}  placeholder="메뉴선택" isSearchable={true} className="option"/>
                 </div> 
                <div className="box">
                <button className='btn' type="submit" onClick={onClickUpate}>수정</button>
                <button className='btn' style={{backgroundColor : "#EEE4DC"}} onClick={()=>navigate(0)} > 취소 </button>
                </div>
                <Modal open={modalOpen} close={closeModal} type ="ok" header="매장 정보 수정 완료">매장 정보 수정이 완료 되었습니다. </Modal>
            </RestInsertBlock>
      
    );
}

export default RestInsert;