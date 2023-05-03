import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserInfo";

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

    //context API에 값을 저장
    const context = useContext(UserContext);
    const { rating, setRating } = context;

    useEffect(() => {
        setRating("");
    }
    ,[])


 

    const onCheckRating = (rate) => {
        const value = rate.target.value;
        const checked = rate.target.checked;
        
        if (checked) {
            // setCheckedRating(value);
            setRating(value);
          } 
          
    };

    const ratingMap = () => {
        return(
            ratingList.map(rating1 => (
                <Label key={rating1} isChecked={rating === rating1} className={rating1.length >= 7 ? 'small':''}>
                    <input type="radio" name="rating" onChange={onCheckRating} value={rating1} checked={rating === rating1}/>
                    {rating1}
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