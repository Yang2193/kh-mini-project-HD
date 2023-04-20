import React from "react";
import styled, {css} from "styled-components";

const Container = styled.div`
    width: 1080px;
    height: 300px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
`;

const Box = styled.div`
    width: 300px;
    height: 300px;
    background-color: grey;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        background-color: lightgrey;
    }
`;

const ImageBox = () => {

    return(
        <>
            <Container>
                <Box>매장 이미지1</Box>
                <Box>매장 이미지2</Box>
                <Box>매장 이미지3</Box>
            </Container>
        </>
    );
}

export default ImageBox;