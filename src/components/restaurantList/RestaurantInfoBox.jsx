import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
    width: 100%;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 10px;
    

`;

const RestaurantInfo = styled.div`
    width: 630px;
    height: 210px;
    border: 1px solid black;
    margin-top: 10px;

`;

const RestaurantInfoBox = () => {
    return(
        <Container>
            <RestaurantInfo/>
            <RestaurantInfo/>
            <RestaurantInfo/>
            <RestaurantInfo/>
            <RestaurantInfo/>
        </Container>
    );
}

export default RestaurantInfoBox;