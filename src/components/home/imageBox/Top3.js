import React from "react";
import styled, {css} from "styled-components";
import ImageBox from "./ImageBox";

const Container = styled.div`

    width: 100%;
    height: 300px;
    justify-content: center;
    display: flex;
    margin-top: 20px;

`;

const ImageCon = styled.div`
    display: flex;
    height: 300px;
    box-sizing: border-box;
    justify-content: space-evenly;
`;


const Top3 = () => {

    return(
        <>
            <Container>
                <ImageCon>
                    <ImageBox/>
                </ImageCon>
            </Container>
        </>
    );
}

export default Top3;