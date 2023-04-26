import { useState } from "react";
import React from "react";
import styled,{ css } from "styled-components";

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;

`

const DetailedBtn = styled.div`
    cursor: pointer;
    margin-top: 20px;
    border-radius: 20px;
    width : 60px;
    height: 30px;
    display: flex;
    background-color: gray;
    color: white;

`

const CheckBox = styled.div`
    display: none;
    background-color: gray;
    color: white;

    ${({isOpen}) =>
    isOpen &&
    css`
        display: flex;
        width : 80%;
        height : 300px;
        background-color: gray;
        
    `}
`;

const DetailedCheck = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onClickOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <Container>
            <DetailedBtn onClick={onClickOpen}>상세 검색</DetailedBtn>
            <CheckBox isOpen={isOpen}/>
        </Container>
    );
}

export default DetailedCheck;