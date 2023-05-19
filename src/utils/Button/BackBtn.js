import React from "react";
import styled from "styled-components";

const Button =styled.button`
font-family: inherit;
background-color: #FBF4EF;
font-size: 18px;
border: none;
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