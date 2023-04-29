import React from "react";
import styled, {css} from "styled-components";
import FooterButtons from "./FooterButtons";

// 높이가 1080 이상이라 Bottom : 0 ;에 고정시켰을 시 body 부분이 푸터를 뚫고 나올 때 쓸 푸터.

const Container = styled.div`
    background-color: lightsalmon;
    height: 100px;
    width : 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
   


`;

const Box = styled.div`

    width : 600px;
    height : 100px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

`;

const Footer = () => {

    return(
    
        <Container>
            <Box>
                <FooterButtons/>
            </Box>
        </Container>
        
       
    );
}

export default Footer;