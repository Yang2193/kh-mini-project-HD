import React, { useEffect } from "react";
import HomeFooter from "../components/footer/HomeFooter";
import Header from "../components/header/Header";
import BizMenuBar from "../components/business/BizMenuBar";
import BizProfile from "../components/business/BizProfile";
import RatingView from "../components/business/RatingView";
import BizSection from "../components/business/BizSection";
import styled from "styled-components";
import { useState } from "react";
import { useCallback } from "react";
import AxiosApi from "../api/AxiosApi";
import { useContext } from "react";
import { RestaurantContext } from "../context/RestaurantContext";
import { useLocation } from "react-router-dom";

const BizBlock = styled.div`
//전체폰트
font-family: "NanumGothic";
//배경색상
background-color:#EEE4DC;
//페이지제목
.pageTitle{
        font-family: "MalangMalangB";
        margin-top: 30px;
        text-align: center;
        font-size: 50px;
        font-weight: 800;
    }
  .defaultBox{
    height: 150px;
  }
`;
const MenuBlock =styled.div`
 width: 70%;
    margin: 0 auto;
    background-color:#F0B7A2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
`;

const BusinessPage = () => {

  const location =useLocation();
  const queryParams = new URLSearchParams(location.search);
  const headerSelect = queryParams.get("category");
  const [ratingAvg,setRatingAvg] = useState();

    const [category,setCategory] = useState(null);
    const onSelect = useCallback(category => setCategory(category),[]);

    const [restInfoList, setRestInfoList] = useState(null);
   
    const [likeCnt, setLikeCnt] = useState(null);
   
    //매장 정보 조회 
   const {restValue,setRestValue} =useContext(RestaurantContext);
 
      //레스토랑 정보

      const restaurant = async () => {
        const rsp = await AxiosApi.restSelect(localStorage.getItem("userId"));
        if (rsp.status === 200) setRestValue(rsp.data);
    
  
      };
      //레스토랑 상세정보
      const restInfo = async() => {
        console.log(restValue.restId);
       const rsp = await AxiosApi.restInfoSelect(restValue.restId);
       if (rsp.status === 200) setRestInfoList(rsp.data);
      
       
      };
      //평점 가져오기 
        const rtInfoFix = async()=>{
          if (restValue && restValue.restId) {
            const rsp = await AxiosApi.restaurantInfoFixed(restValue.restId);
            if (rsp.status === 200) setRatingAvg(rsp.data[0].avgRating);
        }
        };

      //찜가게 조회
      const likeCount= async()=> {
        if (restValue && restValue.restId) {
        const rsp = await AxiosApi.likeCntGet(restValue.restId);
        if(rsp.data)setLikeCnt(rsp.data);
        }
    }
    
      useEffect(() => {
        restaurant();
        
        }, []);
  
        useEffect(()=> {
          restInfo();
          rtInfoFix();
          likeCount();
        },[restValue]);

        useEffect(() => {
       setCategory(headerSelect || null);
      }, [headerSelect]);
    
    return(
    <BizBlock>
    <Header>사업자 페이지</Header>
    <div className="pageTitle"> 사업자 페이지 </div>
    <BizProfile restInfoList={restInfoList} setRestInfoList={setRestInfoList} restName ={restValue.restName}likeCnt={likeCnt}/>
    <MenuBlock>
    <BizMenuBar category={category} onSelect={onSelect}/>
    <RatingView ratingAvg={ratingAvg}/>
    </MenuBlock>
    {category===null? <div className="defaultBox">널 </div> :
    <BizSection category={category} restInfoList={restInfoList} setRestInfoList={setRestInfoList} restName ={restValue.restName}/>}
    <HomeFooter/>
    </BizBlock>
  
     
    );
}

export default BusinessPage;