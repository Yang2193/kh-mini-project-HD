import React from "react";
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
`;

const SideMenu = () => {

    return(
        <>
            <MenuButton/>
            <Box/>
        </>
    );
}

export default SideMenu;