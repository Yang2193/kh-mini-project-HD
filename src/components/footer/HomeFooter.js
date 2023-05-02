import React from "react";
import styled, {css} from "styled-components";
import FooterButtons from "./FooterButtons";

//홈화면에 쓰이는 Footer. 

const Container = styled.div`
    background-color: lightsalmon;
    height: 100px;
    width : 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
   
    @media (min-height: 1080px) {
        position: absolute;
        bottom: 0px;
        width : 100%;
    }

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

const HomeFooter = () => {

    return(
    
        <Container>
            <Box>
                <FooterButtons/>
            </Box>
        </Container>
        
       
    );
}

export default HomeFooter;