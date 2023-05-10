import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeHeader from "../components/header/HomeHeader";
import DetailedCheck from "../components/search/DetailedCheck";
import HomeFooter from "../components/footer/HomeFooter";
import RestaurantInfoBox from "../components/restaurantList/RestaurantInfoBox";
import Footer from "../components/footer/Footer";
import FilterModal from "../utils/FilterModal";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/search/SearchBar";

const Body = styled.div`
    background-color: ivory;
    position: relative;


`;

const RestaurantList = () => {
    useEffect(() => {
        
    }, [])
  
    const [searchFilter, setSearchFilter] = useState([]);


    const handleFilter = (filter) => {
        setSearchFilter(filter);
    }

 


    return(
        <Body>
            <HomeHeader>
                <SearchBar handleFilter = {handleFilter}/> 
            </HomeHeader>
            <DetailedCheck handleFilter = {handleFilter}/>
            <RestaurantInfoBox searchFilter={searchFilter}/>
            <Footer/>
        </Body>
    );
}

export default RestaurantList;