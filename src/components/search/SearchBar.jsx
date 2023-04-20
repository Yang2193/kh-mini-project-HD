import React from "react";
import styled, {css} from "styled-components";

const Container = styled.div`
    margin-top: 60px;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
`;

const Box = styled.div`
    width : 810px;
    height : 40px;
    border: 1px solid black;
    border-radius: 20px;
    position: relative;
    background-color: white;
`;

const Input = styled.input`
    width: 70%;
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
    color: white;
    font-weight: bold;
    border-radius: 20px;
    position: absolute;
    right: 0px;
`

const SearchBar = () => {
    return(
        <>
        <Container>
            <Box>
                <Input/><SearchBtn>검색</SearchBtn>
            </Box>
        </Container>
        </>
    );
}

export default SearchBar;
