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
        margin-top: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
		bottom:5px;
		padding: 30px;
		background-color: white;
		width: 845px;
		border: 1px solid;
         button {
            background-color: #fff;
            font-size: 20px;
            border:none;
            cursor: pointer;
        }
        .box{
            border-radius: 15px;

            padding: 10px;
            width: 350px;
            height: 200px;
            border: 1px solid;
            margin-bottom: 40px;
            position: relative;
            left:200px;
            p{
                font-size: 20px;
                margin-bottom: 40px;
            }
            img{
            border-radius: 15px;
            position: absolute;
            border: 1px solid;
            width: 350px;
            height: 200px;
            right:450px;
            bottom:10px
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
                            <p>메뉴 이름 : {rest.menuName} </p>
                            <p>설명 : {rest.menuDesc}</p>
                            <p>가격 : {rest.menuPrice} </p>
                            <img src={rest.menuImgFileName} alt="이미지" />
                        </div>
                    ))}
         {rtMenu.length ===menu.length ? <></>  : <button onClick={handleLoadMore}>▼ 더보기</button>}
                </div>
            </MenuContanier>
    )
}


export default Menu;