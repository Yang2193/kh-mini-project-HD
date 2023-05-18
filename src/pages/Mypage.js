import React, { useCallback, useState } from "react";
import HomeFooter from "../components/footer/HomeFooter";
import MenuBar from "../components/myPage/MenuBar";
import MyProfile from "../components/myPage/MyProfile";
import Section from "../components/myPage/Section";
import styled from "styled-components";
import Modal from "../utils/Modal";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/header/Header";
import { useLocation } from "react-router-dom";
import MessageModal from "../utils/MessageModal";
const MypageBlock = styled.div`
    //전체폰트
    font-family: "NanumGothic";
    //배경색상
    background-color:#EEE4DC;
    //페이지제목
    .pageTitle{
        margin-top: 30px;
        text-align: center;
        font-size: 50px;
        font-weight: 800;
    }
    //메뉴바와 세션 영역 CSS
    .section {
        display: flex;
        flex-direction: row;
        margin : 20px auto;
        justify-content: center;
    }
    
`;
const Mypage= () => {
      const location =useLocation();
      const queryParams = new URLSearchParams(location.search);
      const headerSelect = queryParams.get("category");
     
      const [category,setCategory] = useState(headerSelect || 'nomal');
      const onSelect = useCallback(category => setCategory(category),[]);
    //   const [modalOpen, setModalOpen] = useState(false);
      const navigate = useNavigate();

    // useEffect(()=> {
    //     const useId= localStorage.getItem("userId");
    //     if(!useId) {
    //         setModalOpen(true);
    //     }
    // },[]);

    useEffect(() => {
       setCategory(headerSelect || 'nomarl');
      }, [headerSelect]);

	return (
		<MypageBlock>
           <Header setCategory={setCategory}> MY PAGE </Header>
           <div className="pageTitle"> MY PAGE </div>
           <MyProfile/>
           <div className="section">
           <MenuBar category={category} onSelect={onSelect}/>
           <Section category={category}/>
           </div>
           <HomeFooter/>
          
        </MypageBlock>
    );
}


export default Mypage;