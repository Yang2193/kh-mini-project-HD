import React, { useState } from "react";
import styled from "styled-components";
import menu from "../../images/menu.png";

const MenuBoxBlock = styled.div`
    background-color:#EEE4DC;
    border-radius: 5px;
    height: auto;
    margin : 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    position: relative;
    &>* {
        margin: 10px;
    }
    .imgBox{
        width: 300px;
        height: auto;
    
    }
    img{
        width: 300px;
        height: 150px;
        border: 2px solid gray;
    }
    .placeholder{
        width: 300px;
        height: 150px;
        border: 2px solid gray;
        background-size:contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    .inputBox{
        display: flex;
        flex-direction: column;
        margin: 1rem;
        label{
            width: 30%;
            font-size: 18px;
            text-align: right;
        }
        input {
            margin-left: 10px;
            margin-right: 10px;
            width: 300px; 
            height: 20px;
            line-height : normal;
            padding: .8em .5em; 
            font-family: inherit; 
            border: 1px solid #999;
            border-radius: 18px;
            margin: 0.6rem;
        }
        .box{
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
    }

    .delBtn{
        width: 20px;
        height: 20px;
        background-color:#FF7F50;
        font-weight: bolder;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #EEE4DC;
        position: absolute;
        right: 0;
        top: 0;
    }

`;

const MenuBox = ({menuList,menuInfo,setMenuList,type,deleteClick,imageUpload,setImageUpload}) => {
    const ImgUpload = (e, menuId) => {
        const file = e.target.files[0];
        if(type==='add' && file){setImageUpload(file)}
        else {
            ImageUploadUpdate(file, menuId);
        }
      };
      
      const ImageUploadUpdate = (file, menuId) => {
        setImageUpload((prevState) => ({
          ...prevState,
          [menuId]: {
            file: file,
            imageUrl: null, // 이미지 URL을 저장할 프로퍼티
          },
        }));
      };
    
   
    const onChange = (e) => {
        const { name, value } = e.target;
        if(type==='add') {
            setMenuList((prevState) => ({ ...prevState, [name]: value }));
        }else{
            const updatedMenuList = menuList.map((menu) => {
                if (menu.menuId === menuInfo.menuId) {
                  return { ...menu, [name]: value };
                }
                return menu;
              });
              setMenuList(updatedMenuList);
        }
      };

    return(

        <MenuBoxBlock>
        <div className="imgBox">
           <img src={menuInfo.menuImgFileName} alt="메뉴사진" />
           {/* <div className="placeholder" style={{backgroundImage :`url(${menu})`}}></div> */}
            <input type="file" name = "menuImgFileName" onChange={(e) => ImgUpload(e, menuInfo.menuId)}/>
            
        </div>
            <div className="inputBox">
            <div className="box">
                <label htmlFor="name">메뉴명 </label>
                <input type="text" id="name" name="menuName" value ={menuInfo.menuName||''} onChange={onChange} />
            </div>
            <div className="box">
                <label htmlFor="desc">메뉴설명 </label>
                <input type="text" id="desc" name="menuDesc"  value ={menuInfo.menuDesc||''} onChange={onChange} />
            </div>
            <div className="box">
                <label htmlFor="price">가격 </label>
                <input type="text" id="price" name="menuPrice" value ={menuInfo.menuPrice||''} onChange={onChange}/>
            </div>

            </div>
           {type!=="add" && <div className="delBtn" onClick={() => deleteClick(menuInfo.menuId)}>X</div>}
        </MenuBoxBlock>
    );
}

export default MenuBox;