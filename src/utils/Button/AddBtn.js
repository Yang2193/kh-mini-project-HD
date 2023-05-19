import React from "react";
import styled from "styled-components";

const Button =styled.button`
/* width: 100px; */
height: 50px;
margin: 10px;
display: inline-block;
border: none;
border-radius: 4px;
padding: 8px 16px;
background-color: #FF7F50;
color: #fff;
text-align: center;
font-size: 18px;
font-weight: bold;
cursor: pointer;  
&:hover{
    background-color: #FFA07A;
       }
&:active{
     background-color: #FFA07A;
        }
`;
const Addbtn =  ({onClick, children}) => {

    return(
        <>
        <Button onClick={onClick}>{children}</Button>
        </>
    ); 

}


export default Addbtn;