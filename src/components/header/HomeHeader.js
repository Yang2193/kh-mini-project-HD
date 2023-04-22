import React from "react";
import styled, {css} from "styled-components";
import SideMenu from "../sidemenu/SideMenu";
import LogoCoral from "./images/logo-removebg-preview.png";


const Container = styled.div`
    margin-top: 60px;
    width: 100%;
    height: 40px;
`;

const Box = styled.div`
    background-color: none;
    position: relative;
    height: 100px;
    width : 100%;
    display: flex;
    justify-content: center;

`;
const LogoBox = styled.div`
    position: absolute;
    height: 100px;
    width: 100px;
    left: 0px;
`;
const Logo = styled.img`
  
`;

const Title = styled.div`
    display: flex;
    width: 900px;
    justify-content: center;
    align-items: center;
    height: 100px;

    @media (max-width: 1024px) {
        width: 600px;
    }

    @media (max-width: 768px) {
        width: 200px;
    }


    
`;

const TitleValue = styled.p`
    font-size: 36px;
    box-sizing: border-box;
    margin: 0 auto;
    text-align: center;

    @media (max-width: 1024px) {
        font-size: 1.5rem;
    }

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`


const HomeHeader = () => {
    return(
        <>
            <Box>
                <LogoBox>
                    <Logo src={LogoCoral}/>
                </LogoBox>
                
                <Title>
                    <TitleValue></TitleValue>
                </Title>
                <SideMenu/>
            </Box>
        </>
    );
}

export default HomeHeader;
