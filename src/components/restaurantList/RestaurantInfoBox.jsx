import React from "react";
import styled, { css } from "styled-components";

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
    width: 600px;
    height: 210px;
    border: 1px solid black;
    margin: 10px 10px;

`;

const RestaurantInfoBox = () => {
    return(
        <Container>
            <RestaurantInfo/>
            <RestaurantInfo/>
            <RestaurantInfo/>
            <RestaurantInfo/>
            <RestaurantInfo/>
            <RestaurantInfo/>
         
        </Container>
    );
}

export default RestaurantInfoBox;