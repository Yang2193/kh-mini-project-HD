import React from "react";
import styled, {css} from "styled-components";
import SideMenu from "../sidemenu/SideMenu";
import LogoCoral from "../../images/logo-removebg-preview.png";

const Container = styled.div`
    background-color: none;
    position: relative;
    height: 100px;
    width : 100%;
    display: flex;
    justify-content: center;
`;

const Box = styled.div`
    background-color: #FFA07A;
    position: relative;
    height: 100px;
    width : 100%;
    display: flex;
    justify-content: center;
    .title{
        height: inherit;
        font-size: 30px;
        font-family: "NanumGothic";
        font-weight: bolder;
        color : white;
        margin-top:30px;

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




const Header = ({setCategory,children}) => {
    return(
        <>
            <Container>
                <LogoBox>
                    <Logo src={LogoCoral}/>
                </LogoBox>
                <Box>           
                <div className="title"> {children} </div>
                </Box>
                <SideMenu setCategory={setCategory}/>
                
            </Container>
        </>
    );
}

export default Header;
