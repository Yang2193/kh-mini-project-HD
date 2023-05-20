import React from "react";
import styled, {css} from "styled-components";
import SideMenu from "../sidemenu/SideMenu";
import LogoCoral from "../../images/logo-removebg-preview.png";
import LogoImg from "../../images/허당Logo.png"
import { useNavigate } from "react-router-dom";
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
    width: 100px;
`;




const Header = ({setCategory,children}) => {
    const navigate = useNavigate();
    const memberType = window.localStorage.getItem("memberType");
    const HomeClick = () => {
     if(memberType ==="general" || memberType === "") navigate("/");
    }
    return(
        <>
            <Container>
                <LogoBox onClick={()=>HomeClick()}>
                    <Logo src={LogoImg}/>
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
