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
    },

    // 로그인
    memberLogin: async(id, pw) => {
        const login = {
            id : id,
            pwd : pw 
        };
        return await axios.post(KH_DOMAIN + "/login", login);
    },
    //회원 조회
    memberGet: async(id) => {
        
        return await axios.get(KH_DOMAIN + `/member?name=${id}`);
    },

    // 회원 가입
    memberReg: async(id, pwd, name, mail) => {
        const member = {
            id: id, 
            pwd: pwd,
            name: name,
            mail: mail
        };
        return await axios.post(KH_DOMAIN + "/new", member);
    },
    // 회원 가입 여부 확인
    memberRegCheck: async(id) => {
        const check = {
            id: id
        };
        return await axios.post(KH_DOMAIN + "/check", check);
    },

    // 회원 탈퇴
    memberDel: async(id) => {
        const del = {
            id : id
        };
        return await axios.post(KH_DOMAIN + "/del", del);
    },

    //회원 업데이트 
    memberUpdate : async(data) => {
        const member ={
            vo : data
        }
        return await axios.post(KH_DOMAIN+"/update",member);
    },

    //문의 조회
    inquiryGet : async(id) => {
        return await axios.get(KH_DOMAIN + `/inquiry?name=${id}`);
    },
    //리뷰 조회
    reviewGet : async(id) => {
        return await axios.get(KH_DOMAIN + `/review?name=${id}`);

    },
    
    //예약내역 조회 
    resvGet : async(id,stat) => {
        return await axios.get(KH_DOMAIN +  `/resv?name=${id}&stat=${stat}`);
    },

    //매장이름가져오기 
    restNameGet : async(id) => {
        return await axios.get(KH_DOMAIN +  `/restName?name=${id}`);
    },

    //찜가게 조회 
    restLikeGet : async(id) => {
        return await axios.get(KH_DOMAIN + `/restLike?name=${id}` );
    }


}

export default AxiosApi;