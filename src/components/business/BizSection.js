import React, {useContext} from "react";
import styled from "styled-components";
import RestInsert from "./RestInsert";
import RestInquiry from "./RestInquiry";
import ResvList from "./ResvList";
import RestMenuInsert from "./RestMenuInsert";
import { RestaurantContext } from "../../context/RestaurantContext";
import RestUpdate from "./RestUpdate";
const SectionBlock = styled.div`
    margin : 0 auto;
    background-color:#FBF4EF;
    border-radius: 5px;
    border : 3px solid #F0B7A2;
    border-style :double;
    width : 70%;
    //height: 300px;
    margin-top :20px;
    .titleName {
        color : #FF7F50;
        font-size: 40px;
        font-weight: 900;
        text-align: center;
        margin: 20px;
    }

`;



const BizSection = ({category,restInfoList,setRestInfoList,restName}) => {
    const {restValue} =useContext(RestaurantContext);
    const menuSelect = (name) => {
        switch(name){
            case "menu1" : 
            return restInfoList === ""?(<RestInsert/>) : (<RestUpdate restInfoList={restInfoList}setRestInfoList={setRestInfoList}/>);
           
            case "menu2" : 
            return <RestInquiry restValue={restValue}/>;
           
            case "menu3" : 
            return <ResvList restValue={restValue}/>;
        
            case "menu4" : 
            return <RestMenuInsert/>;
            
            default:
               return null;
        }
    }

   

      
    return(
            <SectionBlock>
           {menuSelect(category)}
            </SectionBlock>
      
    );
}

export default BizSection;