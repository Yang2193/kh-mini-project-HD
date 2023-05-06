import React from "react";
import styled, {css} from "styled-components";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const CarouselContainer = styled.div`
    width : 100%;
    height: 300px;
    margin-top: 60px;;
`

const Container = styled.div`
    width: 1080px;
    height: 300px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;

`;

const Box = styled.div`
    width: 240px;
    height: 240px;
    background-color: gray;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        background-color: lightgrey;
    }
`;

const ImageBox = () => {

    return(
        <CarouselContainer>
            <Carousel>
                <Container>
                    <Box>매장 이미지1</Box>
                    <Box>매장 이미지2</Box>
                    <Box>매장 이미지3</Box>
                </Container>
                <Container>
                    <Box>매장 이미지1</Box>
                    <Box>매장 이미지2</Box>
                    <Box>매장 이미지3</Box>
                </Container>
                <Container>
                    <Box>매장 이미지1</Box>
                    <Box>매장 이미지2</Box>
                    <Box>매장 이미지3</Box>
                </Container>
            </Carousel>
            
        </CarouselContainer>
    );
}

export default ImageBox;