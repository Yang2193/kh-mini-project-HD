import { useContext, useState } from "react";
import React from "react";
import styled,{ css } from "styled-components";
import BoxRegion from "./DetailedCheckBoxRegion";
import BoxMenu from "./DetailedCheckBoxMenu";
import BoxPrice from "./DetailedCheckBoxPrice";
import BoxRating from "./DetailedCheckBoxRating";
import FilterModal from "../../utils/FilterModal";
import { SearchContext } from "../context/SearchInfo";

// 상세정보 버튼 컴포넌트

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;

`

const DetailedBtn = styled.div`
    margin-top: 20px;
    border-radius: 20px;
    width : 80px;
    height: 40px;
    display: flex;
    background-color: coral;
    color: white;
    justify-content: center;
    flex-direction: column;
    position: relative;

    .textBox {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0px;
        cursor: pointer;
        
        
    }

    

    ${({isOpen}) =>
    isOpen &&
    css`
        display: flex;
        width : 80%;
        height : 360px;
        border-radius: 20px;
        background-color: coral;

    .flex-container{
        margin-top: 10px;
        height: 300px;
        background-color: coral;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;

        @media (max-width: 768px){
            flex-direction: row;
            justify-content: center;
            overflow-y: auto;
            overflow-x: hidden;
        }
    }

    `}

`

const CheckBox = styled.div`
    display: none;
    background-color: gray;
    color: white;

  
`;

const DetailedCheck = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [region, setRegion] = useState("");
    const [menu, setMenu] = useState("");





    const onClickOpen = () => {
        setIsOpen(!isOpen);
    }

    const onClickBox = (event) => {
        event.stopPropagation();
    };

    const onRegionChange = (region) => {
        setRegion(region);
    }

 

    return (
        <Container>
            <DetailedBtn onClick={onClickOpen}>
                <div className="textBox">검색 필터</div>
            </DetailedBtn>
            <FilterModal open={isOpen} close={onClickOpen} header="검색 필터"/>
            
        </Container>
    );
}

export default DetailedCheck;