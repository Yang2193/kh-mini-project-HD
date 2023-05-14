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


const Body = styled.div`
    background-color: ivory;
    position: relative;

    p {
        text-align: center;
    }

    @media (min-height: 1200px) {
        height: 100vh;
}
`;

const Home = () => {

    const [type, setType] = useState("Main");

    const handleType = (type) => {
        setType(type);
    }

    const [searchFilter, setSearchFilter] = useState([]);


    const handleFilter = (filter) => {
        setSearchFilter(filter);
    }

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
                        <Button handleType={handleType} handleFilter={handleFilter}/>
                        <HomeCarousel/>  
                    </>
                )}
                {type === "List" && (
                    <>
                     <DetailedCheck handleType={handleType} handleFilter={handleFilter}/>
                     <RestaurantInfoBox searchFilter={searchFilter}/>
                    </>
                )}
 
                {type === "Review" && (
                    <>
                        <Reviews/>
                    </>
                )}
                <HomeFooter/>    
            </Body>
            
        </>
    );
}

export default Home;