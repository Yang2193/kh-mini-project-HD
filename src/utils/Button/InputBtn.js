import React from "react";
import styled from "styled-components";

const Button =styled.input`
    margin-top: 10px;
    margin-left: 30px;
    margin-right: 30px;
    font-size: 26px;
    font-weight: bold;
    width: 150px; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: coral;
    font-size: 15px;
    font-weight: 400;
    border-radius: 5px;
    border: coral;
    font-weight: 700;
    cursor: pointer;

&:active{
    margin-top: 10px;
    margin-left: 30px;
    margin-right: 30px;
    font-size: 15px;
    font-weight: bold;
    width: 150px; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: coral;
    font-weight: 400;
    border-radius: 5px;
    border: #999;
    font-weight: 700;
    }
`;
const InputBtn =  ({onClick, children,onKeyDown,value}) => {

    return(
        <>
        <Button type="button" onClick={onClick} onKeyDown={onKeyDown} value={value}/>
        </>
    ); 

}


export default InputBtn;