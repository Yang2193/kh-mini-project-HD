import React from "react";
import styled, {css} from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import AxiosApi from "../../../api/AxiosApi";
import DetailedCheck from "../../search/DetailedCheck";

const Container = styled.div`
    width : 100%;
    margin-top: 60px;
    height : 270px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Box = styled.div`
    box-sizing: border-box;
    width : 630px;
    height: 270px;
    border: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: space-evenly;

    .box{
        width: 630px;
        height: 120px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-evenly;
        box-sizing: border-box;
    }

    .box2{
        width: 630px;
        height: 120px;
        display: flex;
        justify-content: space-evenly;
        box-sizing: border-box;
    }
`;

const Box1 = styled.div`
    width: 630px;
    height: 200px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-evenly;
    box-sizing: border-box;
`;
const Box2 = styled.div`
    width: 630px;
    height: 200px;
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

const Button = ({ handleType, handleFilter }) => {

    const navigate = useNavigate();

    const onClickReviewList = () => {
       
        handleType("Review")
    }

    const onClickRestaurantList = async() => {

        const rsp = await AxiosApi.popularRestListGet("popular");
        console.log(rsp.data);
        handleFilter(rsp.data);
        handleType("List");

    }
    
    return(
        <Container>
            <Box>
                <div className="box">
                    <Btn onClick={onClickRestaurantList}>인기 식당</Btn>
                    
                </div>
                <div className="box2">
                    
                    <Btn onClick={onClickReviewList}>인기 리뷰</Btn>
                </div>
            </Box>
        </Container>
    );
}

export default Button;

