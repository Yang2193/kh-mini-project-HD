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
    },

    //인기 리뷰 가져오는 메소드

    popularReviewListGet : async(review) => {
        return await axios.get(KH_DOMAIN + `/?review=${review})`)
    },

    // Carousel에서 이 주의 인기 매장, 이 달의 인기 매장, 이 주의 리뷰 가져오는 메솓,

    weeklyTop3RestListGet : async() => {
        return await axios.get(KH_DOMAIN + `/weeklyTop3Rest`)
    },

    monthlyTop3RestListGet : async() => {
        return await axios.get(KH_DOMAIN + `/monthlyTop3Rest`)
    },

    weeklyTop3ReviewListGet : async() => {
        return await axios.get(KH_DOMAIN + `/weeklyTop3Review`)
    }

}

export default AxiosApi;