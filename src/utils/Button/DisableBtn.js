import React from "react";
import styled from "styled-components";

const Button =styled.button`
    margin-top: 10px;
    margin-left: 30px;
    margin-right: 30px;
    font-size: 15px;
    font-weight: bold;
    width: 150px; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: #999;
    font-weight: 400;
    border-radius: 5px;
    border: none;
    
`;
const DisableBtn =  ({children}) => {

    return(
        <>
        <Button>{children}</Button>
        </>
    ); 

}


export default DisableBtn;