import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserInfo";

const priceList = ["1만원대", "2만원대", "3만원대", "5만원대", "10만원 이상"];

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

    const context = useContext(UserContext);
    const { price, setPrice} = context;

    // const [checkedPrice, setCheckedPrice] = useState([]);

    const onCheckPrice = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;

        console.log(value);
        console.log(checked);

        if (checked) {
            // setCheckedPrice([...checkedPrice, value]);
            setPrice([...price, value]);
            } else {
            // setCheckedPrice(checkedPrice.filter((price) => price !== value));
            setPrice(price.filter((price) => price !== value));
            }          
            // console.log(price); 
    };

    const priceMap = () => {
        return(
            priceList.map((price1) => {
                return (
                    <Label key={price1} isChecked={price.includes(price1)} className={price1.length >= 7 ? 'small' : ''}>
                        <input type="checkbox" onChange={onCheckPrice} value={price1} checked={price.includes(price1)}/> {price1}
                    </Label>
                );
            })
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