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
   
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;

  &:hover {
    background-color: lightsalmon;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }

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

