import React from "react";
import styled from "styled-components";

const Button =styled.button`
margin-top: 10px;
margin-left: 30px;
margin-right: 30px;
font-size: 15px;
width: 150px;
height: 50px;
color: white;
background-color: #FFA07A;
border-radius: 5px;
border: coral;
cursor: pointer;

    &:hover{
         font-weight: bolder;
            }
`;
const BackBtn =  ({onClick, children}) => {

    return(
        <>
        <Button onClick={onClick}>{children}</Button>
        </>
    ); 

}


export default BackBtn;