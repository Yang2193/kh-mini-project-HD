import React, { useContext, useState } from "react";
import styled from "styled-components";
import Select from 'react-select';
import {RestaurantContext} from "../../context/RestaurantContext";
import AxiosApi from "../../api/AxiosApi";
import Modal from "../../utils/Modal";
import {useNavigate } from "react-router-dom";
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
        
        
            label{
                width: 150px;
                text-align: right;
                }
        margin: 1em;
            .btn{
                width: 100px;
                height: 50px;
                margin: 0  20px;
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
  input{
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
       navigate(0);
   };
   const onClickUpate =  async()=> {

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
    
    return(
            <RestInsertBlock>
            <div className='titleName'> 매장등록 </div>
                  <div className='box'>
                  <label htmlFor='id'>사업자 ID : </label>
                  <input id='id' disabled={true} value={restValue.memId}/>
                  </div>
                  <div className='box'>
                  <label htmlFor='id'>사업자 등록번호 :</label>
                  <input id='id'value={restValue.restId} name='restId' onChange={restIdOnchange}/>
                  </div>
                  <div className='box'>
                  <label htmlFor='id'>매장 이름 :</label>
                  <input id='id' value = {restValue.restName||''}name='restName' onChange={restOnChange}/>
                  </div>
                  <div className='box'>
                  <label htmlFor='id'>전화 번호 : </label>
                  <input id='id' value={restInfoList.restPhoneNum||''} name='restPhoneNum'onChange={restInfoOnChange}/>
                  </div>
                  <div className='box'>
                  <label htmlFor='id'>주소 : </label>
                  <input id='id' value={restInfoList.restAddr||''} name='restAddr'onChange={restInfoOnChange}/>
                  </div>
                  <div className='box'>
                  <label htmlFor='id'> 공지사항 : </label>
                  <input id='id' value={restInfoList.restNotice||''} name='restNotice'onChange={restInfoOnChange}/>
                  </div>
                  <div className='box'>
                  <label htmlFor='id'>영업시간 : </label>
                  <input id='id' value={restInfoList.restHours||''} name='restHours'onChange={restInfoOnChange}/>
                  </div>
                  <div className='box'>
                  <label htmlFor='id'>소개 글 : </label>
                  <input id='id' value={restInfoList.restIntro||''} name='restIntro'onChange={restInfoOnChange}/>
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
                  <label htmlFor='id'>매장 분류 : </label>
                 <Select
                    options={options}
                    value={defaultOption}
                    onChange={selectChange}  placeholder="메뉴선택" isSearchable={true} />
                 </div> 
                <div className="box">
                <button className='btn' type="submit" onClick={onClickUpate}>수정</button>
                <button className='btn' style={{backgroundColor : "#EEE4DC"}} onClick={()=>navigate(0)} > 취소 </button>
                </div>
                <Modal open={modalOpen} close={closeModal} type ="ok" header="매장등록 완료">매장 등록이 완료 되었습니다. </Modal>
            </RestInsertBlock>
      
    );
}

export default RestInsert;