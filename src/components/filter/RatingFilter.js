import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ratingList = ["3.0 이상", "3.5 이상", "4.0 이상", "4.5 이상"];

const Label = styled.label`
        background-color: ${({ isChecked }) => (isChecked ? 'coral' : 'ivory')};
        color : ${({ isChecked }) => (isChecked ? 'white' : 'black')};
        width : 120px;
        height : 30px;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;
        border: 1px solid coral;
        cursor: pointer;
`;

const FilterStyle = styled.div`
    width: 100%;
    display:flex;
    flex-direction: column;
    border-top: 1px solid coral;
    margin-top: 16px;

    p{
        text-align: center;
    }
    .flex-box{
        display:flex;
        flex-direction: row;
        width: 100%;
        height : 360px;
    }
    .small {
        font-size: 12px;
    }
`;

const RatingBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-radius: 20px;
    overflow: auto;
    justify-content: center;
    align-content: flex-start;

    input{ display: none;
    }
`;

const RatingFilter = () => {

    const [checkedRating, setCheckedRating] = useState("");

    const onCheckRating = (rating) => {
        const value = rating.target.value;
        const checked = rating.target.checked;
        
        if (checked) {
            setCheckedRating(value);
          } 
    };

    const ratingMap = () => {
        return(
            ratingList.map(rating => (
                <Label key={rating} isChecked={checkedRating === rating} className={rating.length >= 7 ? 'small':''}>
                    <input type="radio" name="rating" onChange={onCheckRating} value={rating}/>
                    {rating}
                </Label>
            ))
        );
    };

    return(
        <FilterStyle>
            <p>평점</p>
            <RatingBox>
                {ratingMap()}
            </RatingBox>
        </FilterStyle>
    );
}

export default RatingFilter;