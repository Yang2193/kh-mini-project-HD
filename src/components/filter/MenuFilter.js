import React, { useEffect, useState } from "react";
import styled from "styled-components";

const menuCategory = ["한식", "중식", "양식", "일식", "아시안", "분식", "카페/디저트", "국/탕/찌개", "패스트푸드"];

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
    justify-content: center;
    align-items: center;
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

const MenuBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-radius: 20px;
    overflow: auto;
    justify-content: flex-start;
    align-content: flex-start;

    input{ display: none;
    }
`;

const MenuFilter = () => {

    const [checkedMenu, setCheckedMenu] = useState([]);

    const onCheckMenu = (menu) => {
        const value = menu.target.value;
        const checked = menu.target.checked;

        console.log(value);
        console.log(checked);

        if (checked) {
            setCheckedMenu([...checkedMenu, value]);
            } else {
            setCheckedMenu(checkedMenu.filter((menu) => menu !== value));
            }          
            console.log(checkedMenu); 
    }
    
    const menuMap = () => {
        return(
            menuCategory.map((menu) => (
                <Label key={menu} isChecked={checkedMenu.includes(menu)} className={menu.length >= 7 ? 'small' : ''}>
                    <input type="checkbox" onChange={onCheckMenu} value={menu} /> {menu}
                </Label>
            ))
        );
    }


    
    return(
        <FilterStyle>
            <p>메뉴</p>
            <MenuBox>
                {menuMap()}
            </MenuBox>
        </FilterStyle>
    );
}

export default MenuFilter;