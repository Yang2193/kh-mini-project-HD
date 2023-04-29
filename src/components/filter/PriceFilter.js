import React, { useEffect, useState } from "react";
import styled from "styled-components";

const priceList = ["1만원대", "2만원대", "3만원대", "5만원 이상", "10만원 이상"];

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

const PriceBox = styled.div`
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


const PriceFilter = () => {

    const [checkedPrice, setCheckedPrice] = useState([]);

    const onCheckPrice = (price) => {
        const value = price.target.value;
        const checked = price.target.checked;

        console.log(value);
        console.log(checked);

        if (checked) {
            setCheckedPrice([...checkedPrice, value]);
            } else {
            setCheckedPrice(checkedPrice.filter((price) => price !== value));
            }          
            console.log(checkedPrice); 
    };

    const priceMap = () => {
        return(
            priceList.map((price) => (
                <Label key={price} isChecked={checkedPrice.includes(price)} className={price.length >= 7 ? 'small' : ''}>
                    <input type="checkbox" onChange={onCheckPrice} value={price} /> {price}
                </Label>
            ))
        );
    }

    return(
        <FilterStyle>
            <p>가격대</p>
            <PriceBox>
                {priceMap()}
            </PriceBox>
        </FilterStyle>
    );
}

export default PriceFilter;