import React from "react";
import styled, {css} from "styled-components";

const BizMenuBlock = styled.div`
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    & > * {
        margin: 10px;
    }
`;

const Category = styled.div`

    width: 200px;
    height: 100px;
    background : #FF7F50;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-family: inherit;
    border : 1px solid white;
    border-radius: 5px;
    cursor: pointer;

`

const categories = [
    {
        name :'menu1',
        text : '매장 등록'
    },
    {
        name :'menu2',
        text : '고객 1:1 문의'
    },
    
    {
        name :'menu3',
        text : '예약리스트'
    },
    
    {
        name :'menu4',
        text : '메뉴판'
    }
];

const BizMenuBar = ({onSelect,category}) => {
 
    return( 
            <BizMenuBlock>
           
            {categories.map(c => (
                 <Category key={c.name} active={c.onSelect===c.name} onClick={()=>onSelect(c.name)}>
                 {c.text}                
                 </Category>
            ))}
            
            </BizMenuBlock>
      
    );
}

export default BizMenuBar;