import React from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";
import {useState,useEffect,useContext} from "react";
import { RestIdContext } from "../../context/RestaurantId";

const MenuContanier = styled.section `
		display: flex;
		justify-content: center;
		align-items: center;

    .cont{
        border-radius: 15px;
        box-shadow: 1px 1px 5px;
        margin: 30px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
		bottom:5px;
		padding: 30px;
		background-color: white;
		width: 1000px;
         button {
            background-color: #fff;
            font-size: 20px;
            border:none;
            cursor: pointer;
        }
        .box{
            box-shadow: 1px 1px 5px;

            border-radius: 15px;
            background-color:#EEE4DC;
            padding: 10px;
            width: 820px;
            height: 300px;
            margin-bottom: 40px;
            display: flex;
            align-items: center;
            .menuInfo{
                width: 300px;
                position: relative;
                left:400px;
                /* border: 1px solid; */

            }
            p{
                font-size: 20px;
            }
            .imgBox{
                /* border: 1px solid; */
                width: 350px;
                height: 200px;
                position: relative;
                right:280px;
            }
            img{
            position: absolute;
            border-radius: 15px;
            width: 350px;
            height: 200px;
            background-color: #fff;
        }
        }
}
`;

const Menu =() => {
	const restId = localStorage.getItem("restId");

    const [rtMenu, setRtMenu] = useState("");
    const [menu, setMenu] = useState([]); // 현재까지 불러온 메뉴 데이터
    const [menuLode, setMenuLode] = useState(3); // 현재까지 불러온 메뉴 데이터 개수
    const [menuHeight, setMenuHeight] = useState();// 화면 높이 추가

	useEffect(() => {
		const rtMenu = async()=>{
            const rsp = await AxiosApi.restMenu(restId)
            setRtMenu(rsp.data);
        };
        rtMenu();
    },[]);
// 화면에 나올 메뉴 수
    useEffect(() => {
        setMenu(rtMenu.slice(0, menuLode));
    }, [rtMenu, menuLode]);

// onClick 으로 클릭시 3개씩 화면에 나올 데이터 개수 추가 + 화면 높이 증가
    function handleLoadMore() {
        setMenuLode(menuLode + 3);  // 개수 추가
        setMenuHeight(menuHeight + 300); // 높이를 300px 증가시킴
    }

    return (
            <MenuContanier>
                <div className="cont">
                    {menu && menu.map(rest =>(
                        <div className="box" key={rest.menuId}>
                            <div className="menuInfo">
                                <p>메뉴 이름 : {rest.menuName} </p>
                                <p>설명 : {rest.menuDesc}</p>
                                <p>가격 : {rest.menuPrice} </p>
                            </div>
                            <div className="imgBox">
                                <img src={rest.menuImgFileName} alt="이미지" />
                            </div>
                        </div>
                    ))}
         {rtMenu.length ===menu.length ? <></>  : <button onClick={handleLoadMore}>▼ 더보기</button>}
                </div>
            </MenuContanier>
    )
}


export default Menu;