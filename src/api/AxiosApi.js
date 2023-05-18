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
        return await axios.get(KH_DOMAIN + `/?review=${review})`);
    },

    // Carousel에서 이 주의 인기 매장, 이 달의 인기 매장, 이 주의 리뷰 가져오는 용도

    weeklyTop3RestListGet : async() => {
        return await axios.get(KH_DOMAIN + `/weeklyTop3Rest`);
    },

    monthlyTop3RestListGet : async() => {
        return await axios.get(KH_DOMAIN + `/monthlyTop3Rest`);
    },

    weeklyTop3ReviewListGet : async() => {
        return await axios.get(KH_DOMAIN + `/weeklyTop3Review`);
    },
    //Carousel에서 인기식당 리스트 불러오는 용도
    
    carouselPopularListGet : async() =>{
      return await axios.get(KH_DOMAIN + `/carouselPopularList`);
    },

    carouselReviewListGet : async() => {
      return await axios.get(KH_DOMAIN + `/carouselReviewList`);
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
   memberReg: async(id, pwd, name, mail, phone, nickname, address) => {
    const member = {
        id: id, 
        pwd: pwd,
        name: name,
        email: mail,
        phone : phone,
        nickname : nickname,
        address : address
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
    //사업자 로그인
    bizMemberLogin: async(id, pw) => {
      const login = {
          id : id,
          pwd : pw 
      };
      return await axios.post(KH_DOMAIN + "/business/login", login);
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

    //사업자 회원 이메일 인증
    bizMailConfirm: async(mail) => {
      const email = {
        email: mail
      };
      return await axios.post(KH_DOMAIN + "/bizSignup/email", email);
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

    // 비번 찾기 1단계 , 아이디, 이메일로 가입된 회원이 있는지 체크
    findPwStep1: async(id, email) => {
      const obj = {
        id: id,
        email: email
      }
      return await axios.post(KH_DOMAIN + "/checkMemberIdEmail", obj);
    },

    //비번 찾기 2단계, 이메일로 해당 아이디의 변경된 PW값을 보내줌
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
  addReview:async(restId,memId,title,content,rating,image)=>{
    const review={
      restId:restId,
      memberId:memId,
      title:title,
      content:content,
      rating:rating,
      image:image

    }
    return await axios.post(KH_DOMAIN + "/restaurant/add/review",review);
  },
// 리뷰 상세 정보 불러오기
  reviewDetail:async(reviewId)=>{
    return await axios.get(KH_DOMAIN + `/review/detail?reviewId=${reviewId}`)
  },
// 문의 등록
  addInquiry:async(restId,memId,title,content,image)=>{
    const inquiry={
      restId:restId,
      memberId:memId,
      title:title,
      content:content,
      image:image
    }
    return await axios.post(KH_DOMAIN + "/restaurant/add/inquiry",inquiry);
  },

  //찜 등록
  addRestLike:async(restId,memId,name)=>{
    const addLike={
      restId:restId,
      memberId:memId,
      restName:name
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
  },
  //예약 수정
  updateRes:async(resDate,resReq,resSeat,resPeo,resId)=>{
    const data={
      resDate:resDate,
      resReq:resReq,
      resSeat:resSeat,
      resPeo:resPeo,
      resId:resId
    }
    return await axios.post(KH_DOMAIN+"/restaurant/update/reservation",data)
  },
  //레스토랑 조회 
  restSelect : async(id) => {
    return await axios.get(KH_DOMAIN+`/restaurant/select?name=${id}`);
  },

  //레스토랑 상세조회 
  restInfoSelect : async(id) =>{
  
    return await axios.get(KH_DOMAIN+`/business/restaurantInfo?restId=${id}`);
  },

  //레스토랑 문의내역 조회
    restInquirySelect : async(id) =>{
    return await axios.get(KH_DOMAIN+`/business/inquiry?id=${id}`);
  },

   //레스토랑 예약내역 조회
   restResvSelect : async(id,stat) =>{
    return await axios.get(KH_DOMAIN+`/business/resv?id=${id}&stat=${stat}`);
  },

    //레스토랑 Info 업데이트 
    restInfoUpdate : async(data) => {
      const restInfo ={
          vo : data
      }
      return await axios.post(KH_DOMAIN+"/business/restInfo/update",restInfo);
  },
  //레스토랑 업데이트 
   restUpdate : async(data) => {
    const restaurant ={
      vo : data
  }
    return await axios.post(KH_DOMAIN+"/business/restaurant/update",restaurant);
  },
  //레스토랑 Info 업데이트 
  restInfoInsert : async(data) => {
    const restInfo ={
        vo : data
    }
    return await axios.post(KH_DOMAIN+"/business/restInfo/insert",restInfo);
},
  //레스토랑 업데이트 
  restInsert : async(data) => {
    const restaurant ={
      vo : data
  }
    return await axios.post(KH_DOMAIN+"/business/restaurant/insert",restaurant);
  },
  
  // 매장의 메뉴 정보 불러오기
  restMenu:async(restaurantId)=>{
    return await axios.get(KH_DOMAIN + `/business/restaurant/menu?restaurantId=${restaurantId}`)
  },
  // 메뉴 등록하기 
  restMenuAdd : async(restId,menuName,menuPrice,menuDesc,menuImgFileName) => {
    const restMenu ={
      restId : restId,
      menuName : menuName,
      menuPrice : menuPrice,
      menuDesc :menuDesc,
      menuImgFileName :menuImgFileName
  }
    return await axios.post(KH_DOMAIN+"/business/restaurant/menu/add",restMenu);
  },
  // 메뉴 삭제하기 
  restMenuDel : async(menuId) => {
    const restMenu ={
      menuId : menuId,
  }
    return await axios.post(KH_DOMAIN+"/business/restaurant/menu/delete",restMenu);
  },

  //메뉴 수정하기 
  restMenuUpdate : async(data) => {
    const restMenu ={
      vo : data,
  }
    return await axios.post(KH_DOMAIN+"/business/restaurant/menu/update",restMenu);
},
//답변 등록하기 
inquiryAnswerUpdate : async(data) => {
  const inquiryData ={
    vo : data,
}
  return await axios.post(KH_DOMAIN+"/business/inquiry/answer/update",inquiryData);
  },


//예약 확정하기 
resvStatUpdate : async(data) => {
 
  const resvList ={
    vo : data,
}
console.log(resvList);
  return await axios.post(KH_DOMAIN+"/business/resv/stat/update",resvList);
},

//찜 숫자 조회
//찜가게 조회 
likeCntGet : async(id) => {
  return await axios.get(KH_DOMAIN + `/restLike/cnt?id=${id}` );
},

//문의 수정하기 
inquiryUpdate : async(data) => {
  const inquiryData ={
    vo : data,
}
  return await axios.post(KH_DOMAIN+"/inquiry/update",inquiryData);
},
// 예약 취소하기 
resvDel : async(resvId) => {
  const resvData ={
    resvId : resvId,
}
  return await axios.post(KH_DOMAIN+"/resv/delete",resvData);
},
// 리뷰 수정
reviewUpdate:async(title,content,rating,image,revId)=>{
  const data={
    title: title,
    content: content,
    rating: rating,
    image:image,
    reviewId:revId
  }
  return await axios.post(KH_DOMAIN+"/review/update",data);

},
// 리뷰 삭제
reviewDelete:async(revId)=>{
  const data={
    reviewId:revId
  }
  return await axios.post(KH_DOMAIN+"/review/delete",data);
},

//이메일 보내는 API 모음

//문의 등록 시 이메일 보내기
  sendInquiryEmail : async(restName, memId)=>{
    const inquiry = {
      restName: restName,
      memberId: memId
    }
    return await axios.post(KH_DOMAIN + "/restaurant/add/inquiry/sendMsg", inquiry);
  },

  //문의 등록 시 사업자 쪽에게 이메일 보내기
  sendInquiryEmailBiz : async(restId, restName, memId) =>{
    const inquiry = {
      restId: restId,
      restName: restName,
      memberId: memId
    }
    return await axios.post(KH_DOMAIN + "/restaurant/add/inquiry/sendMsgBiz", inquiry);
  },
//문의 답변 등록 시 이메일 보내기
  sendInquiryAnswerEmail : async(restId, memId)=>{
    const inquiry = {
      restId: restId,
      memberId: memId
    }
    return await axios.post(KH_DOMAIN + "/restaurant/inquiry/answerMsg", inquiry);
    },

  //문의 답변 등록 시 사업자 쪽에게 이메일 보내기
  sendInquiryAnswerEmailBiz : async(restId, memId) =>{
    const inquiry = {
      restId: restId,
      memberId: memId
    }
    return await axios.post(KH_DOMAIN + "/restaurant/inquiry/answerMsgBiz", inquiry);
    },
  //예약 시 회원에게 이메일 보내기
  sendReservationEmail : async(restId, memId, date) =>
  {
    const reservation = {
      restId : restId,
      memberId: memId,
      resDate: date
    }
    return await axios.post(KH_DOMAIN + "/reservation/email", reservation);
  },
  //예약 시 사업자 회원에게 알림 이메일 보내기
  sendReservationEmailBiz : async(restId, memId, date) =>
  {
    const reservation = {
      restId : restId,
      memberId: memId,
      resDate: date,
    }
    return await axios.post(KH_DOMAIN + "/reservation/emailBiz", reservation);
  },
  //예약 변경 시 회원에게 이메일 보내기
  sendReservationUpdateEmail : async(restId, restName, memId, date, time) =>
  {
    const reservation = {
      restId : restId,
      restName : restName,
      memberId: memId,
      resDate: date,
      resTime: time
    }
    return await axios.post(KH_DOMAIN + "/reservation/update/email", reservation);
  },
  //예약 변경 시 사업자 회원에게 이메일 보내기
  sendReservationUpdateEmailBiz : async(restId, restName, memId, date, time, resvId) =>
  {
    const reservation = {
      restId : restId,
      restName : restName,
      memberId: memId,
      resDate: date,
      resTime: time,
      resvId : resvId
    }
    return await axios.post(KH_DOMAIN + "/reservation/update/emailBiz", reservation);
  },
  //예약 확정 시 회원에게 이메일 보내기
  sendReservationConfirmEmail : async(restId, memId, date, time) =>
  {
    const reservation = {
      restId : restId,
      memberId: memId,
      resDate: date,
      resTime: time

    }
    return await axios.post(KH_DOMAIN + "/reservation/confirm/email", reservation);
  },
  //예약 확정 시 사업자 회원에게 이메일 보내기
  sendReservationConfirmEmailBiz : async(restId, memId, date, time, resvId) =>
  {
    const reservation = {
      restId : restId,
      memberId: memId,
      resDate: date,
      resTime: time,
      resvId : resvId
    }
    return await axios.post(KH_DOMAIN + "/reservation/confirm/emailBiz", reservation);
  },
  //예약 취소 시 회원에게 이메일 보내기
  sendReservationCancelEmail : async(restId, restName, memId, date, time) =>
  {
    const reservation = {
      restId : restId,
      restName : restName,
      memberId: memId,
      resDate: date,
      resTime: time
    }
    return await axios.post(KH_DOMAIN + "/reservation/cancel/email", reservation);
  },
  //예약 취소 시 사업자 회원에게 이메일 보내기
  sendReservationCancelEmailBiz : async(restId, restName, memId, date, time, resvId) =>
  {
    const reservation = {
      restId : restId,
      restName : restName,
      memberId: memId,
      resDate: date,
      resTime: time,
      resvId : resvId
    }
    return await axios.post(KH_DOMAIN + "/reservation/cancel/emailBiz", reservation);
  },
  //사업자 측에서 예약 요청 거절 시 회원에게 이메일 보내기
  sendReservationRejectEmail : async(restId, memId, date, time, reason) =>
  {
    const reservation = {
      restId : restId,
      memberId: memId,
      resDate: date,
      resTime: time,
      reason : reason
    }
    return await axios.post(KH_DOMAIN + "/reservation/reject/email", reservation);
  },
  //사업자 측에서 예약 요청 거절 시 이메일 보내기
  sendReservationRejectEmailBiz : async(restId, memId, date, time, resvId, reason) =>
  {
    const reservation = {
      restId : restId,
      memberId: memId,
      resDate: date,
      resTime: time,
      resvId : resvId,
      reason : reason
    }
    return await axios.post(KH_DOMAIN + "/reservation/reject/emailBiz", reservation);
  }


}

export default AxiosApi;