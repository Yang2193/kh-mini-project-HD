
import MyReview from "./MyReview";
import MyLikeStore from "./MyLikeStore";
import MyInquiry from "./MyInquiry";
import styled from "styled-components";
import MyResv from "./MyResv";
import React from "react";
import MypageMain from "./MypageMain";
import MyInfo from "./MyInfo";
const SectionBlock = styled.div`
    background-color:#FBF4EF;
    border-radius: 5px;
    border : 3px solid #F0B7A2;
    border-style :double;
    width : 700px;
    height: auto;
    .titleName {
        color : #FF7F50;
        font-size: 40px;
        font-weight: 900;
        text-align: center;
        margin: 20px;
    }

`;

const menuSelect = (name) => {
    switch(name){
        case "menu1" : 
        return <MyInfo/>;
       
        case "menu2" : 
        return <MyReview/>;
       
        case "menu3" : 
        return <MyLikeStore/>;
    
        case "menu4" : 
        return <MyInquiry/>;
        
        case "menu5" : 
        return <MyResv/>;
        default:
           return <MypageMain/>;
    }
}

const Section= ({category}) => {
    return(
        <SectionBlock>
        {menuSelect(category)}
        </SectionBlock>
    );
}

export default Section;