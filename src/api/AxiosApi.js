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
   memberReg: async(id, pwd, name, mail, phone, nickname) => {
    const member = {
        id: id, 
        pwd: pwd,
        name: name,
        email: mail,
        phone : phone,
        nickname : nickname
    };
    return await axios.post(KH_DOMAIN + "/newMember", member);
    },
    // 회원 가입 여부 확인
    memberRegCheck: async(id) => {
        const check = {
            id: id
        };
        return await axios.post(KH_DOMAIN + "/checkMember", check);
    },

    //이메일 인증
    mailConfirm: async(mail) => {
      const email = {
        email: mail
      };
      return await axios.post(KH_DOMAIN + "/signup/email", email);
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

     // 사업자 회원 가입
   bizMemberReg: async(id, pwd, name, mail, phone) => {
        const member = {
            id: id, 
            pwd: pwd,
            name: name,
            email: mail,
            phone : phone,
        };
        return await axios.post(KH_DOMAIN + "/newBizMember", member);
    },
      // 사업자 회원 가입 여부 확인
      bizMemberRegCheck: async(id) => {
        const check = {
            id: id
        };
        return await axios.post(KH_DOMAIN + "/checkBizMember", check);
    },

    // 아이디찾기 첫번째 단계, 일단 이메일로 회원정보가 있는지 체크
    findIdStep1: async(email) => {
        const mail = {
          email: email
        };
        return await axios.post(KH_DOMAIN + "/checkMemberEmail", mail);
    },

    //회원정보가 있는지 체크하고, True로 반환받으면 이메일 보내기 단계
    findIdStep2: async(email) => {
      const mail = {
        email: email
      };
      return await axios.post(KH_DOMAIN + "/findId", mail);
    },

    findPwStep1: async(id, email) => {
      const obj = {
        id: id,
        email: email
      }
      return await axios.post(KH_DOMAIN + "/checkMemberIdEmail", obj);
    },

    findPwStep2: async(id, email) => {
      const obj = {
        id: id,
        email: email
      }
      return await axios.post(KH_DOMAIN + "/findPw", obj);
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
    },

//페이지 상단 고정 매장정보 불러오기
  restaurantInfoFixed:async(restaurantId) =>{
    return await axios.get(KH_DOMAIN + `/restaurant/?restaurantId=${restaurantId}`)
  }, 
  
// 매장 상세 정보 불러오기
  restaurantInfo: async (restaurantId) => {
    return await axios.get(KH_DOMAIN + `/restaurant/info?restaurantId=${restaurantId}`);
  },
  
// 매장의 메뉴 정보 불러오기
  restaurantMenu:async(restaurantId)=>{
    return await axios.get(KH_DOMAIN + `/restaurant/menu?restaurantId=${restaurantId}`)
  },
  
//매장의 리뷰 정보 불러오기
  restaurantReview:async(restaurantId)=>{
    return await axios.get(KH_DOMAIN + `/restaurant/review?restaurantId=${restaurantId}`)
  },

// 리뷰 추가 하기
  addReview:async(restId,memId,title,content,rating)=>{
    const review={
      restId:restId,
      memberId:memId,
      title:title,
      content:content,
      rating:rating
    }
    return await axios.post(KH_DOMAIN + "/restaurant/add/review",review);
  },
// 리뷰 상세 정보 불러오기
  reviewDetail:async(reviewId)=>{
    return await axios.get(KH_DOMAIN + `/review/detail?reviewId=${reviewId}`)
  },
// 문의 등록
  addInquiry:async(restId,memId,title,content)=>{
    const inquiry={
      restId:restId,
      memberId:memId,
      title:title,
      content:content
    }
    return await axios.post(KH_DOMAIN + "/restaurant/add/inquiry",inquiry);
  },
  //찜 등록
  addRestLike:async(restId,memId)=>{
    const addLike={
      restId:restId,
      memberId:memId
    }
    return await axios.post(KH_DOMAIN+"/restaurant/add/restLike",addLike);
  },
  // 찜 삭제
  delRestLike:async(restId,memId)=>{
    const delLike={
      restId:restId,
      memberId:memId
    }
    return await axios.post(KH_DOMAIN+"/restaurant/del/restLike",delLike);
  },
  //공감 등록
  addRevLike:async(revId,memId)=>{
    const addLike={
      revId:revId,
      memberId:memId
    }
    return await axios.post(KH_DOMAIN+"/restaurant/add/revLike",addLike);
  },
  // 공감 삭제
  delRevLike:async(revId,memId)=>{
    const delLike={
      revId:revId,
      memberId:memId
    }
    return await axios.post(KH_DOMAIN+"/restaurant/del/revLike",delLike);
  },
  // 찜 리스트 조회
  restLiked:async(memId)=>{
    return await axios.get(KH_DOMAIN+`/restaurant/liked?memberId=${memId}`);
  },  

  // 리뷰 공감 리스트 조회
  revLiked:async(memId)=>{
    return await axios.get(KH_DOMAIN+`/review/liked?memberId=${memId}`);
  },
  // 예약 추가 
  addRes:async(restId,memId,resDate,resReq,resSeat,resPeo)=>{
    const res = {
      restId:restId,
      memberId:memId,
      resDate:resDate,
      resReq:resReq,
      resSeat:resSeat,
      resPeo:resPeo
    }
    return await axios.post(KH_DOMAIN+"/restaurant/add/reservation",res);
  }

}

export default AxiosApi;