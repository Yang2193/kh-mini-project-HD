import React from "react";
import Top3 from "./imageBox/Top3";
import SearchBar from "../search/SearchBar";
import SelectButton from "./selectButton/SelectButton";
import ImageBox from "./imageBox/ImageBox";
import HomeCarousel from "./HomeCarousel";


const Main = () => {
    return(
        <>
            <SelectButton/>
            <HomeCarousel/>
        </>

    );
}

export default Main;