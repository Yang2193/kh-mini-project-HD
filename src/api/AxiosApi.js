import React from "react";
import axios from "axios";

const KH_DOMAIN = "http://localhost:8111";

const AxiosApi = {

    //검색 필터로 매장 찾기
    filterRestaurant : async(regions, category, price, rating) => {

        const filter = {
            regions : regions,
            category : category,
            price : price,
            rating : rating
        };

        return await axios.get(KH_DOMAIN + "/restaurantList", filter);

    }

}

export default AxiosApi;