import React from "react";
import HomeHeader from "../components/header/HomeHeader";
import styled, {css} from "styled-components";
import Main from "../components/home";
import HomeFooter from "../components/footer/HomeFooter";


const Body = styled.div`
    background-color: ivory;
    position: relative;

    @media (min-height: 1080px) {
        height: 100vh;
}
    
    
  
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