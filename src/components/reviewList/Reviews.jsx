import React, { useEffect } from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";

const Container = styled.div`
    width: 100%;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;



const ReviewInfo = styled.div`
    width : 630px;
    height : 210px;
    border: 1px solid black;
    margin-top: 10px;
`;

const Reviews = () => {

    useEffect(() => {
        const rsp = AxiosApi.popularReviewListGet("review");
    }, [])

    return(
    <Container>
        <ReviewInfo/>
        <ReviewInfo/>
        <ReviewInfo/>
        <ReviewInfo/>
        <ReviewInfo/>
        <ReviewInfo/>
    </Container>);

}

export default Reviews;