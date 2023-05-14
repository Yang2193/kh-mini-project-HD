import React from "react";
import styled from "styled-components";
import RatingUI from "./RatingUI";

const RatingBox = styled.div`

    
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    .text{
        font-size: 25px;
        font-family: inherit;
        font-weight: bold;
        
    }
    &>* {
        margin: 10px;
    }
    
`;
const RatingView = ({ratingAvg}) => {

    const AVG_RATING = ratingAvg;

    return(
    
      <RatingBox>
      <div className="text"> 평점 </div>
      <RatingUI rating={AVG_RATING}/>
      <div className="text">({AVG_RATING}점 / 5점)</div>
      </RatingBox>
    );
}

export default RatingView;