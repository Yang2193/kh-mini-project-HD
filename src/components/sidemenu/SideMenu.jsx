import React, { useRef, useState, useEffect } from "react";
import styled, {css} from "styled-components";

const MenuButton = styled.div`
  height  : 100px;
  width : 100px;
  position: absolute;
  right: 0px;
  top: 0px;
  background-color: coral;
`;

const Box = styled.div`
    display: none;
    height: 820px;
    width: 380px;
    background-color: coral;
    position: absolute;
    top: 0;
    left: -280px;
    z-index: 1;

    ${({ isOpen }) =>
    isOpen &&
    css`
      display: block;
      
    `}
`;

const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {   
        const clickOutside = (event) =>{
            if(ref.current && !ref.current.contains(event.target)){
                setIsOpen(false);
            }
        };

        document.addEventListener("click", clickOutside);
        return () => {
            document.removeEventListener("click", clickOutside);
        };

    },[ref]);

    
    
    const onClickMenu = () => {
        setIsOpen(!isOpen);
    }

    const onClickBox = (event) => {
        event.stopPropagation();
    };

    return(
        
            <MenuButton onClick={onClickMenu} ref={ref}>
                <Box isOpen={isOpen} onClick={onClickBox}/>
            </MenuButton>
        
    );
}

export default SideMenu;