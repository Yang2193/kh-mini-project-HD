import React, { useState } from "react";
import styled from "styled-components";
import menu from "../../images/menu.png";
import { useEffect } from "react";

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

    //이미지 미리보기상태 관리 
    const [previewImage, setPreviewImage] = useState(null);
    //메뉴등록 이미지 업로드함수
    const ImgUpload = (e, menuId) => {
        const file = e.target.files[0];
        if (file) {
            // 파일이 선택된 경우에만 미리보기 이미지를 설정
            const reader = new FileReader();
            reader.onloadend = () => {
            setPreviewImage(reader.result);
            };
                reader.readAsDataURL(file);
            } else {
                setPreviewImage(null); // 파일이 선택되지 않은 경우 미리보기 이미지를 null로 설정
            }

        if(type==='add' && file){
            setImageUpload(file);
        }
        else {
            ImageUploadUpdate(file, menuId);
        }
      };
      
    //메뉴 수정 이미지 업로드 함수
      const ImageUploadUpdate = (file, menuId) => {
        setImageUpload((prevState) => ({
          ...prevState,
          [menuId]: {
            file: file,
            imageUrl: null, // 이미지 URL을 저장할 프로퍼티
          },
        }));
      };
    
   //input값이 변경될때마다 발생하는 onChange함수
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

      useEffect(()=> {
        setImageUpload(null);

      },[]);
    return(

        <MenuBoxBlock>
        <div className="imgBox">
            {previewImage ? (<img src={previewImage} alt="미리보기이미지"/>) : 
                            (menuInfo.menuImgFileName ? (
                            <img src={menuInfo.menuImgFileName} alt="메뉴사진" />
                            ) : (
                            <img src={menu} alt="메뉴 기본 사진" />
                            )
                            )}
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