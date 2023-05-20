import React, { useState } from "react";
import HomeHeader from "../components/header/HomeHeader";
import styled, {css} from "styled-components";
import HomeFooter from "../components/footer/HomeFooter";
import SearchBar from "../components/search/SearchBar";
import DetailedCheck from "../components/search/DetailedCheck";
import RestaurantInfoBox from "../components/restaurantList/RestaurantInfoBox";
import Button from "../components/home/selectButton/Button";
import Top3 from "../components/home/imageBox/Top3";
import Reviews from "../components/reviewList/Reviews";
import HomeCarousel from "../components/home/HomeCarousel";
import RestListCarousel from "../components/home/RestListCarousel";
import ReviewListCarousel from "../components/home/ReviewListCarousel";
import { useEffect } from "react";
import AxiosApi from "../api/AxiosApi";


const Body = styled.div`
    background-color: ivory;
    position: relative;

    p {
        text-align: center;
    }

    /* @media (min-height: 1200px) {
        height: 100vh;
} */
`;

const Home = () => {

    const [type, setType] = useState("Main");

    //캐러셀 세팅을 위한 useState
    const [restList, setRestList] = useState(null);
    const [reviewList, setReviewList] = useState(null);
    const [wt3r, setWt3r] = useState(null);
    const [mt3r, setMt3r] = useState(null);
    const [wt3review, setWt3review] = useState(null);

    const handleType = (type) => {
        setType(type);
    }

    const [searchFilter, setSearchFilter] = useState([]);


    const handleFilter = (filter) => {
        setSearchFilter(filter);
    }

    useEffect(() => {
        const fetchData = async() => {
          try{
            const rsp = await AxiosApi.carouselPopularListGet();

            if(rsp.status === 200){
                setRestList(rsp.data);
                console.log(rsp.data);
            }

            const popularRestListRsp = await AxiosApi.popularRestListGet("popular");

            if(popularRestListRsp.status === 200){
                handleFilter(popularRestListRsp.data);      
            }

            const reviewRsp = await AxiosApi.carouselReviewListGet();

            if(reviewRsp.status === 200){
                setReviewList(reviewRsp.data);
                console.log(reviewRsp.data);
             }
             
            const weeklyTop3RestRsp = await AxiosApi.weeklyTop3RestListGet();
            
            if(weeklyTop3RestRsp.status === 200){
                setWt3r(weeklyTop3RestRsp.data);
                console.log(weeklyTop3RestRsp.data);
            }

            const monthlyTop3RestRsp = await AxiosApi.monthlyTop3RestListGet();
            
            if(monthlyTop3RestRsp.status === 200){
                setMt3r(monthlyTop3RestRsp.data);
                console.log(monthlyTop3RestRsp.data);
            }

            const weeklyTop3ReviewRsp = await AxiosApi.weeklyTop3ReviewListGet();

            if(weeklyTop3ReviewRsp.status === 200){
                setWt3review(weeklyTop3ReviewRsp.data);
                console.log(weeklyTop3ReviewRsp.data);
            }

          } catch(error){
            console.error(error);
          }
        };
        fetchData();
      }, [])

    return(
        <>
            <Body>
                <HomeHeader handleType={handleType}>
                    <SearchBar handleType={handleType} handleFilter={handleFilter}/>
                </HomeHeader>
                {type === "Main" && (
                    <>
                        <p>무엇으로 검색해야 할지 생각이 안 날 땐? 지역, 메뉴, 가격대, 평점으로 맞춤 검색! </p>
                        <DetailedCheck handleType={handleType} handleFilter={handleFilter}/>
                        {restList && <RestListCarousel handleType={handleType} handleFilter={handleFilter} carouselRestList={restList}/>}
                        {reviewList && <ReviewListCarousel carouselReviewList={reviewList}/>}
                        {(wt3r&&wt3review) && <HomeCarousel weeklyTop3Rest={wt3r} monthlyTop3Rest={mt3r} weeklyTop3Review={wt3review}/> } 
                    </>
                )}
                {type === "List" && (
                    <>
                     <DetailedCheck handleType={handleType} handleFilter={handleFilter}/>
                     <RestaurantInfoBox searchFilter={searchFilter}/>
                    </>
                )}
 
                <HomeFooter/>    
            </Body>
            
        </>
    );
}

export default Home;