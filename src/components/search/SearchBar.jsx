import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, {css} from "styled-components";
import AxiosApi from "../../api/AxiosApi";
import { UserContext } from "../context/UserInfo";

const Container = styled.div`
    margin-top: 60px;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    position: absolute;
    top: 160px;
`;

const Box = styled.div`
    width : 630px;
    height : 40px;
    border: 1px solid black;
    border-radius: 20px;
    position: relative;
    background-color: white;
`;

const Input = styled.input`
    width: 80%;
    height: 40px;
    border-style: none;
    border: none;
    position: absolute;
    left: 40px;
    outline: none;
    padding: 0px;
    font-size: 20px;
    
`;

const SearchBtn = styled.button`
    width: 80px;
    height: 40px;
    background-color: coral;
    border-style: none;
    border: none;
    color: white;
    font-weight: bold;
    border-radius: 20px;
    position: absolute;
    
    right: 0px;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
`

const SearchBar = ({handleFilter, handleType}) => {
   
    const context = useContext(UserContext);
    const {keywordArr, setKeywordArr, address, category, price, rating} = context;

    const [keyword, setKeyword] = useState("");

    //키워드 설정
    const onChangeKeyword = (e) =>{
        const value = e.target.value;
        setKeyword(value);
        setKeywordArr(value.split(" "));
    }
    
    // 검색 버튼
    const onClickSearch = async() =>{
        
        console.log(keywordArr, address, category, price, rating);
        const rsp = await AxiosApi.filterRestaurant(keywordArr, address, category, price, rating);
        console.log(rsp.data);
        handleFilter(rsp.data);
        handleType("List");
    };

    
    
    return(
        <>
        <Container>
            <Box>
                <Input placeholder="검색하고 싶은 키워드를 입력해주세요." value={keyword} onChange={onChangeKeyword}/>
                <SearchBtn onClick={onClickSearch}>검색</SearchBtn>
            </Box>
        </Container>
        </>
    );
}

export default SearchBar;
