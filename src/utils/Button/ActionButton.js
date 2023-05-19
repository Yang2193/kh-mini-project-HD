import React from "react";
import styled from "styled-components";

const Button =styled.button`
background-color: #FFA07A;
border: none;
cursor: pointer;
`;
const ActionButton =  ({onClick, children}) => {

    return(
        <>
        <Button onClick={onClick}>{children}</Button>
        </>
    ); 

}


export default ActionButton;