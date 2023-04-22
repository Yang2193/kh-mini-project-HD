import styled from "styled-components";
import React from "react";
import Background from "./images/korean-food-fried-rice-with-kimchi-serve-with-fried-egg.jpg"
import HomeHeader from "./HomeHeader";

const Container = styled.div`
    width: 100%;
    height: 300px;
   

    
`

const BackgroundImage = styled.div`
    
    height: 300px;
    background-image: url(${Background});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    
`

const HeaderSection = () =>{

    return (
        <Container>
            <BackgroundImage>
                <HomeHeader/>
            </BackgroundImage>
        </Container>
    );
}

export default HeaderSection;