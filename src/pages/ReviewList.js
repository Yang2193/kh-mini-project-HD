import React from "react";
import styled from "styled-components";
import HomeHeader from "../components/header/HomeHeader";
import HomeFooter from "../components/footer/HomeFooter";
import Reviews from "../components/reviewList/Reviews";


const Body = styled.div`
    background-color: ivory;
    position: relative;

    @media (min-height: 1080px) {
        height: 100vh;
}
`;


const ReviewList = () => {

    return (
        <Body>
            <HomeHeader/>
                <Reviews/>
            <HomeFooter/>
        </Body>
    );
}

export default ReviewList;