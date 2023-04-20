import React from "react";
import styled, {css} from "styled-components";

const Container = styled.div`
    background-color: lightsalmon;
    height: 100px;
    width : 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0px;
    margin-top: 30px;
`;

const Box = styled.div`

    width : 600px;
    height : 100px;
    box-sizing: border-box;
    border: 1px solid black;

`;

const HomeFooter = () => {

    return(
        <>
            <Container>
                <Box></Box>
            </Container>
        </>
    );
}

export default HomeFooter;