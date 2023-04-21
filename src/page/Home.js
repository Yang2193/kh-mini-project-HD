import React from "react";
import HomeHeader from "../components/header/HomeHeader";
import styled, {css} from "styled-components";
import Main from "../components/home";
import HomeFooter from "../components/footer/HomeFooter";


const Body = styled.body`
    background-color: ivory;
    position: relative;
    
`;

const Home = () => {

    return(
        <>
            <Body>
                <HomeHeader/>
                <Main/>   
                <HomeFooter/>
            </Body>
            
        </>
    );
}

export default Home;