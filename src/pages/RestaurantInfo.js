import styled from "styled-components";
import React,{useState,useEffect, useContext}from "react";
import AxiosApi from "../api/AxiosApi";
import Header from "../components/header/Header";
import HomeFooter from "../components/footer/HomeFooter";
import RestaurantContainer from "../components/restaurantComponent/RestaurantContainer";
import RestaurantNav from "../components/restaurantComponent/RestaurantNav";
import Menu from "../components/restaurantComponent/RestaurantMenu";
import Review from "../components/restaurantComponent/RestaurantReview";
import { useNavigate } from "react-router-dom";

const InfoContainer = styled.section`
		font-family: "NanumGothic";
		background-color:#EEE4DC;
		.all{
		display: flex;
        justify-content: center;
        align-items: center;
		}
		.infoCont{
		border-radius: 15px;
		margin: 30px 0px;
        position: relative;
		padding: 30px;
		width: 1000px;
		background-color: #fff;
		box-shadow: 1px 1px 5px;
	}
	.box{
		margin: 50px 0px;
		p{
			font-size: 20px;
			margin-left: 2%;
		}
	}
`;
const MenuBlock =styled.div`
 width: 72%;
 box-shadow: 0px 0px 2px;
 background-color: #FBF4EF;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
`;

const Info = () => {
	// 로컬 스토리지 사용
	const restId = localStorage.getItem("restId");
	console.log(restId);
	
	// 데이터 호출 
	const [restInfo, setRestInfo] = useState("");
	
	const[type,setType] = useState("default");

	const handleType = (e) =>{
		setType(e);

	}


	useEffect(() => {
		const rtInfo = async () => {
		const rsp = await AxiosApi.restaurantInfo(restId);
		setRestInfo(rsp.data);
		};
		rtInfo();
	}, []);

	return (
		<InfoContainer>
			<Header/>
			<RestaurantContainer/>
			<MenuBlock>
			<RestaurantNav  handleType={handleType}/>
			

			{type === "default" && (
				<div className="all">
				{restInfo&&restInfo.map(rest =>(
					<div className="infoCont" key ={rest.restId}>
						<div className="box">
							<h2>공지사항</h2>
							<p>{rest.restNotice}</p>
						</div>
						<div className="box">
							<h2>전화번호</h2>
							<p>{rest.restPhoneNum}</p>
						</div>
						<div className="box">
							<h2>매장소개</h2>
							<p>{rest.restIntro}</p>
						</div>
						<div className="box">
							<h2>영업시간</h2>
							<p>{rest.restHours}</p>
						</div>
						<div className="box">
							<h2>매장주소</h2>
							<p>{rest.restAddr}</p>
						</div>
					</div>
				))}			
			</div>
			)}

			{type === "menu" && (
				<Menu/>
			)}
			{type === "review" && (
				<Review/>
			)}
			</MenuBlock>
			<HomeFooter/>
		</InfoContainer>
	);
};
export default Info;