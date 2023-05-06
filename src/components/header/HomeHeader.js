import React from "react";
import styled, {css} from "styled-components";
import SideMenu from "../sidemenu/SideMenu";
import LogoCoral from "../../images/logo-removebg-preview.png";
import BackgroundImg from "../../images/korean-food-fried-rice-with-kimchi-serve-with-fried-egg.jpg";
import SearchBar from "../search/SearchBar";
import HeaderTextImg from "../../images/text1.png"
import { useNavigate } from "react-router-dom";

//Home에 쓰는 헤더
const Container = styled.div`
    background-color: none;
    position: relative;
    height: 300px;
    width : 100%;
    display: flex;
    justify-content: center;
`;

const Box = styled.div`
    background-color: black;
    position: relative;
    height: 300px;
    width : 100%;
    display: flex;
    justify-content: center;
  


    .background{
        height: 300px;
        width: 100%;
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: black;
          opacity: 0.5;
        }
        background-image: url(${BackgroundImg});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        z-index: 0;
    }

`;

const TextImage = styled.div`
    position: absolute;
 
    display: flex;
    top: 60px;
    justify-content: center;
    width: 721px;
    height: 137px;
    background: none;
    background-image: url(${HeaderTextImg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    z-index: 1;

    @media (max-width: 920px) {
        
      top: 100px;  
      width: 400px;
      height: 76px;
    }
`;
const LogoBox = styled.div`
    position: absolute;
    height: 100px;
    width: 100px;
    left: 0px;
    z-index: 1;
`;
const Logo = styled.img`
  
`;




const HomeHeader = ({ handleType, children }) => {

    const navigate = useNavigate();
    const onClickHome = () => {
        navigate("/");
        handleType("Main");
    };

    return(
        <>
            <Container>
                <LogoBox onClick={onClickHome}>
                    <Logo src={LogoCoral}/>
                </LogoBox>
                <Box>           
                    <TextImage/>
                    <div className="background"></div>
                </Box>
                <SideMenu/>
                {children}
            </Container>
        </>
    );
}

export default HomeHeader;
