import React from "react";
import styled, {css} from "styled-components";

const Box = styled.div`
    width: 630px;
    height: 120px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-evenly;
    box-sizing: border-box;
`;
const Box2 = styled.div`
    width: 630px;
    height: 120px;
    display: flex;
    justify-content: space-evenly;
    box-sizing: border-box;
`;
const Btn = styled.button`
    background-color: coral;
    font-size: 1rem;
    color: white;
    border-radius: 20px;
    width: 120px;
    height: 120px;

`;

const Button = () => {
    return(
        <>
            <Box>
                <Btn>지역</Btn>
                <Btn>메뉴</Btn>
                <Btn>평점</Btn>
            </Box>
            <Box2>
                <Btn>가격대</Btn>
                <Btn>인기 리뷰</Btn>
                <Btn>인기 식당</Btn>
            </Box2>
        </>
    );
}

export default Button;

