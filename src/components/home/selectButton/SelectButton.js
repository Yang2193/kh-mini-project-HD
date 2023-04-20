import React from "react";
import styled, {css} from "styled-components";
import Button from "./Button";

const Container = styled.div`
    width : 100%;
    margin-top: 60px;
    height : 270px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Box = styled.div`
    box-sizing: border-box;
    width : 630px;
    height: 270px;
    border: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: space-evenly;
`;


const SelectButton = () => {
    
    return(
        <>
            <Container>
                <Box>
                    <Button/>
                </Box>
            </Container>
        </>
    );
 
}

export default SelectButton;