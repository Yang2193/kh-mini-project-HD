import styled from "styled-components";
import React,{useState,useEffect, useContext}from "react";
import AxiosApi from "../api/AxiosApi";
import Header from "../components/header/Header";
import HomeFooter from "../components/footer/HomeFooter";
import RestaurantContainer from "../components/restaurantComponent/RestaurantContainer";
import RestaurantNav from "../components/restaurantComponent/RestaurantNav";
import { RestIdContext } from "../context/RestaurantId";
import Menu from "../components/restaurantComponent/RestaurantMenu";
import Review from "../components/restaurantComponent/RestaurantReview";
const InfoContainer = styled.section`
		position: relative;
		top: 30px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: ivory;
		height: 700px;
		.cont{
        position: relative;
		top:15px;
		padding: 30px;
		background-color: white;
		width: 845px;
		border: 1px solid;
		height: 540px;
		p{
			margin: 10px;
			font-size: 20px;
		}
		.box{
			margin-bottom: 80px;
		}
	}
	
`;


const Info = () => {
	// Context Api 사용
	const {restId} = useContext(RestIdContext);
	// 데이터 호출 
	const [rtInfo, setRtInfo] = useState("");
	
	const[type,setType] = useState("default");

	const handleType = (e) =>{
		setType(e);

	}

	useEffect(() => {
		const rtInfo = async () => {
		const rsp = await AxiosApi.restaurantInfo(restId);
		setRtInfo(rsp.data);
		};
		rtInfo();
	}, []);

	return (
		<>
			<Header/>
			<RestaurantContainer/>

			<RestaurantNav  handleType={handleType}/>

			{type === "default" && (
				<InfoContainer>
				{rtInfo&&rtInfo.map(rest =>(
					<div className="cont" key ={rest.restaurantNotice}>
						<div className="box">
							<h2>공지사항</h2>
							<p>{rest.restaurantNotice}</p>
						</div>
						<div className="box">
							<h2>전화번호</h2>
							<p>{rest.restaurantPhone}</p>
						</div>
						<div className="box">
							<h2>매장소개</h2>
							<p>{rest.restaurantIntroduce}</p>
						</div>
						<div className="box">
							<h2>영업시간</h2>
							<p>{rest.restaurantHours}</p>
						</div>
						<div className="box">
							<h2>매장주소</h2>
							<p>{rest.restaurantAddr}</p>
						</div>
					</div>
				))}			
			</InfoContainer>
			)}

			{type === "menu" && (
				<Menu/>
			)}
			{type === "review" && (
				<Review/>
			)}
			<HomeFooter/>
		</>
	);
};
export default Info;