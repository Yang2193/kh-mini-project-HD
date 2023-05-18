import React from "react";
import {  useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import StarRatings from "react-star-ratings";

const Container = styled.div`
    width: 100%;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-top: 10px;
    overflow-y: scroll;
    height: 810px;
    flex-wrap: wrap;

`;

const RestaurantInfo = styled.div`
    cursor: pointer;
    color:black;
    width: 810px;
    height: 300px;
    border: 1px solid black;
    margin: 10px 10px;
    display: flex;
    align-items: center;
    border-radius: 18px;

    .image {
        border-radius: 18px;
        width : 200px;
        height: 200px;
        border: 1px solid black;
        margin: 10px;
    }
    .box{
        margin-left: 20px;
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: self-start;
        p{
            margin-bottom: 10px;
            width: 550px;
            text-align: start;
        }
    }

`;

const RestaurantInfoBox = ({searchFilter}) => {
    const nav = useNavigate();

    const movePage =(restId,restName, reservation) =>{
        localStorage.setItem("restId",restId);
        localStorage.setItem("restName", restName);
        localStorage.setItem("resPossible",reservation);
        nav("Info");
    }

    const searchFilterMap = 
        searchFilter &&
        searchFilter.map(rest => (
            <RestaurantInfo to={"/Info"} onClick={() => movePage(rest.restId,rest.restName,rest.reservation)} key={rest.restId}>
                <img src={rest.imageUrl} alt="" className="image"/>
                <div className="box">
                    <p>매장 이름 : {rest.restName} ({rest.category})</p>
                    <p>매장 주소 : {rest.addr}</p>
                    <p>예약 여부 : {(rest.reservation === 1)? "예약가능" : "예약불가"}</p>
                    <p>매장 번호 : {rest.restPhone}</p>
               
                    {rest.rating !== 0 && 
                    <p> 평점 : <StarRatings rating={rest.rating}
                            starDimension="25px"
                            starSpacing="4px"
                            starRatedColor="gold"/> ( {rest.rating} / 5 )
                    </p>
                    
                    }
                </div>
            </RestaurantInfo>
    ));

    return (
        <Container>
           {searchFilterMap}
        </Container>
    );
}

export default RestaurantInfoBox;