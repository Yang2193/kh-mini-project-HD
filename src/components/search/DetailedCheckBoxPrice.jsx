import { useState } from "react";
import React from "react";
import styled,{ css } from "styled-components";

const Box = styled.div`
    display: none;
    width: 20%;
    background-color: ivory;
    height: 80%;
    border-radius: 20px;
    border: 1px solid black;
    position: relative;
    ${({isOpen}) =>
    isOpen &&
    css`
        display: flex;
        flex-direction: column;

    `}

    .title {
        width: 100%;
        height: 20px;
        color: black;
        display: flex;
        justify-content: center;

    }

    .checkBox{
        width: 100%;
        border-radius: 20px;
        margin-top: 10px;
        height: 90%;

    }

    @media (max-width: 768px){
        width: 300px;
        height: 240px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

`;

const BoxPrice = ({isOpen}) => {

    return (
        <Box isOpen={isOpen}>
        </Box>
    );
}

export default BoxPrice;