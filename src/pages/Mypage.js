import React, { useCallback, useState } from "react";
import HomeFooter from "../components/footer/HomeFooter";
import MenuBar from "../components/myPage/MenuBar";
import MyProfile from "../components/myPage/MyProfile";
import Section from "../components/myPage/Section";
import styled from "styled-components";
import { useEffect } from "react";
import Header from "../components/header/Header";
import { useLocation } from "react-router-dom";
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
        font-family: "MalangMalangB";
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

    useEffect(() => {
       setCategory(headerSelect || 'nomarl');
      }, [headerSelect]);

	return (
		<MypageBlock>
           <Header setCategory={setCategory}> 마이페이지 </Header>
           <div className="pageTitle"> 마이페이지 </div>
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