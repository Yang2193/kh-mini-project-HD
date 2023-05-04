import React from "react";
import axios from "axios";

const KH_DOMAIN = "http://localhost:8111";

const AxiosApi = {

    //검색어 && 검색 필터로 매장 찾기
    filterRestaurant : async(keywordArr, address, category, price, rating) => {

        const filter = {
            keyword : keywordArr,
            region : address,
            category : category,
            price : price,
            rating : rating
        };
        
        return await axios.post(KH_DOMAIN + "/restaurantList", filter);
    },

    //인기 식당 가져오는 용도
    popularRestListGet : async(popular) => {
        return await axios.get(KH_DOMAIN + `/restaurantList?popular=${popular}`);
    }

}

export default AxiosApi;