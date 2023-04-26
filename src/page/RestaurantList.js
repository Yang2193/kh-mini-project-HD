import React from "react";
import styled from "styled-components";
import HomeHeader from "../components/header/HomeHeader";
import DetailedCheck from "../components/search/DetailedCheck";
import HomeFooter from "../components/footer/HomeFooter";
import RestaurantInfoBox from "../components/restaurantList/RestaurantInfoBox";
import Footer from "../components/footer/Footer";

const Body = styled.div`
    background-color: ivory;
    position: relative;


`;

const RestaurantList = () => {
    return(
        <Body>
            <HomeHeader/>
            <DetailedCheck/>
            <RestaurantInfoBox/>
            <Footer/>
        </Body>
    );
}

export default RestaurantList;