import React,{useContext, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Info from "../../pages/RestaurantInfo";
import { RestIdContext } from "../../context/RestaurantId";
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
    text-decoration: none;
    color:black;
    width: 810px;
    height: 240px;
    border: 1px solid black;
    margin: 10px 10px;
    display: flex;
    align-items: center;
    .image {
        width : 200px;
        height: 200px;
        border: 1px solid black;
        margin: 10px;
    }

`;

const RestaurantInfoBox = ({searchFilter}) => {
    const nav = useNavigate();

    const movePage =(restId) =>{
        localStorage.setItem("restId",restId);
        nav("Info");
    }

    const searchFilterMap = 
        searchFilter &&
        searchFilter.map(rest => (
            <RestaurantInfo to={"/Info"} onClick={() => movePage(rest.restId)} key={rest.restId}>
                <div className="image"/>
                <div>
                    <p>매장 이름 : {rest.restName} ({rest.category})</p>
                    <p>매장 주소 : {rest.addr}</p>
                    <p>예약 여부 : {(rest.reservation === 1)? "예약가능" : "예약불가"}</p>
                    <p>매장 번호 : {rest.restPhone}</p>
                    {rest.rating !== 0 && <p>평점 : {rest.rating}</p>}
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