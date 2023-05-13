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
                {type === "Region" && (
                    <>
                    </>
                )}
                {type === "Category" && (
                    <>
                    </>
                )}
                {type === "Rating" && (
                    <>
                    </>
                )}
                {type === "Price" && (
                    <>
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