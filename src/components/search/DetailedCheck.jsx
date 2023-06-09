import { useContext, useState } from "react";
import React from "react";
import styled,{ css } from "styled-components";

import FilterModal from "../../utils/FilterModal";
import { SearchContext, UserContext } from "../../context/UserInfo";
import AxiosApi from "../../api/AxiosApi";

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

const DetailedCheck = ({handleFilter, handleType}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const context = useContext(UserContext);
    const {keywordArr, address, category, price ,rating} = context;
    




    // 모달 열고 닫기
    const onClickOpen = () => {
        setIsOpen(!isOpen);
    }

    const onClickBox = (event) => {
        event.stopPropagation();
    };



    const onClickTest = () => {
        console.log(rating);
        console.log(price);
        console.log(category);
        console.log(address);
    }

    // 확인 버튼 누르면 검색어 & 검색필터에 선택된 값 전송 후 결과 받아옴.
    const confirm = async() => {
        console.log(keywordArr, address, category, price, rating);
        const searchFilter = await AxiosApi.filterRestaurant(keywordArr, address, category, price, rating);
        handleFilter(searchFilter.data);
        console.log(searchFilter.data);
        setIsOpen(!isOpen);
        handleType("List");
    }

 

    return (
        <Container>
            <DetailedBtn onClick={onClickOpen}>
                <div className="textBox" onClick={onClickTest}>검색 필터</div>
            </DetailedBtn>
            <FilterModal open={isOpen} close={onClickOpen} header="검색 필터" confirm={confirm}/>
            
        </Container>
    );
}

export default DetailedCheck;