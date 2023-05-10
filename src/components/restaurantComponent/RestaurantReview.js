import React from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";
import {useState,useEffect,useContext} from "react";
import { RestIdContext,ReviewIdContext } from "../../context/RestaurantId";
import ReviewModal from "../../utils/rest/ReviewModal";
import { useNavigate } from "react-router-dom";

const ReviewContanier = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    .cont{
        margin-top: 30px;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
		bottom:5px;
		padding: 30px;
		background-color: white;
		width: 845px;
		border: 1px solid;
        
        a {
            
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            position: relative;
            right:320px;
            text-decoration: none;
            width: 200px;
            height: 50px;
            background-color: salmon;
            color: black;
            border: 1px solid;
            margin-bottom: 30px;

        }
        button {
            background-color: #fff;
            font-size: 20px;
            border:none;
            cursor: pointer;
            border-radius: 5px;
        }
        .modalBtn{
            width: 150px;
            height: 50px;
            background-color: salmon;
            margin-bottom: 30px;
            position: relative;
            right: 345px;
        }
        .box{
            padding: 10px;
            padding-top: 0px;
            width: 820px;
            height: 350px;
            border: 1px solid;
            margin-bottom: 40px;
            p {
                font-size: 20px;
                margin-bottom: 10px;
            }
            .title {
                    font-weight: bold;
                    font-size: 23px;
                }
            .rating{
                font-size: 20px;
            }
            .content{
                font-size: 20px;
            }
            .nick{
                font-size: 17px;
            }
            .date{
                font-size: 10px;
            }
        img{
            width: 200px;
            height: 100px;
            margin-left: 55px;
            margin-top: 10px;
        }
        .imgBox{
            position: relative;
            bottom: 20px;
            border: 1px solid;
            width: 100%;
            height: 120px;
        }
        }
        .like{
        position: relative;
        left:750px;
        bottom:200px;
        border: 1px solid;
        background-color: white;
    }
    }
`;

const Review =() => {
//Context API로 매장 id 받아와서 해당 id 매장 정보 출력
    const {restId} = useContext(RestIdContext);
    const isLogin=localStorage.getItem("isLogin")
    const memId = localStorage.getItem("userId");  // 로컬 스토리지로 로그인 시 회원 id 입력받고
// 리뷰 데이터 입력
    const [rtReview, setRtReview] = useState(""); // 모든 리뷰 데이터
    const [visibleReviews, setVisibleReviews] = useState([]); // 화면에 보이는 리뷰 데이터
    const [rvCount, setRvCount] = useState(3); // 현재까지 불러온 리뷰 데이터 개수

// onClick 으로 클릭시 3개씩 화면에 나올 데이터 개수 추가 + 화면 높이 증가
    const [rvHeight, setRvHeight] = useState();

// 모든 리뷰 데이터 불러오는 axios 호출
    useEffect(() => {
	        const rtReview = async()=>{
            const rsp = await AxiosApi.restaurantReview(restId)
            setRtReview(rsp.data);
        };
        rtReview();
    },[]);
    
// 화면에 나올 리뷰 수 관리
    useEffect(() => {
        setVisibleReviews(rtReview.slice(0, rvCount));
    }, [rtReview, rvCount]);

// onClick 으로 클릭시 3개씩 화면에 나올 데이터 개수 추가 + 화면 높이 증가
    function handleLoadMore() {
        setRvCount(rvCount + 3);  // 개수 추가
        setRvHeight(rvHeight + 300); // 높이를 300px 증가시킴
    }

// 리뷰 작성 버튼 입력시 팝업 창
    const [modalOpen, setModalOpen] = useState(false);
    const navigate= useNavigate();

    const openModal = () => {

        console.log(isLogin,memId);
        if (isLogin === "TRUE") {
            setModalOpen(true);
        } else {
            alert("로그인이 되어있지 않습니다.")
            navigate("/login");
        }
    }

    const closeModal = () => {
        setModalOpen(false);
    }
// 리뷰 공감 버튼
    const [revLikeList,setRevLikeList] = useState([]); // 찜 리스트 배열
    const [isRevLike, setIsRevLike] = useState(false); // 최종 찜 상태 
    const {reviewId, setReviewId} = useContext(ReviewIdContext)
    useEffect(()=>{ // 로그인한 회원id를 기준으로 공감 리뷰 리스트를 db에서 불러와 확인하고 배열에 삽입
        const liked = async() => {
            const rsp = await AxiosApi.revLiked(memId);
            setRevLikeList(rsp.data);
        }
        liked();
    },[memId]);

    useEffect(() => {
        if (revLikeList.some(item => item.reviewId === reviewId)) { // 배열을 확인하며 해당 매장사이트에서 찜이 등록되어 있으면 true 아니면 false
        setIsRevLike(true);
        } else {
        setIsRevLike(false);
        }
      }, [revLikeList, reviewId]);

    const addLike = async (revId) => { 
        const rsp = await AxiosApi.addRevLike(revId, memId);
        if (rsp.data === true) {
            console.log("공감 등록 성공");
            setRevLikeList([...revLikeList, {revId, memId}]); // 찜등록 성공시 배열에도 추가
            setIsRevLike(true); // 최종 찜 상태를 true 로 전달
            console.log(revLikeList);
            } else {
                console.log(" 등록 전송 실패");
            }
        };

    const deleteLike = async (revId) => {
        const rsp = await AxiosApi.delRevLike(revId, memId);
        if (rsp.data === true) {
            console.log("공감 삭제 성공");
            setRevLikeList(revLikeList.filter(item => !(item.revId === revId && item.memId === memId))); // 찜 삭제 성공시 배열에도 삭제
            setIsRevLike(false); // 최종 찜 상태를 false 로 전달
            console.log(revLikeList);

            } else {
            console.log("삭제 전송 실패");
            }
        };

    const onClickLiked = (revId) =>{
        if (!isRevLike) {
            addLike(revId);
        }else{
            deleteLike(revId);
        }
    }

    return (
        <ReviewContanier>
            <div className="cont" style={{height: rvHeight}}>
                <button className="modalBtn" onClick={openModal}>리뷰 작성 하기</button>
                <ReviewModal open={modalOpen} close={closeModal}></ReviewModal>
                {visibleReviews&&visibleReviews.map(rest=>(
                    <div className="box" key={rest.reviewId}>
                        <p className="nick">{rest.nickName}</p>
                        <p className="date">작성일 : {rest.reviewDate}</p>
                        <p className="title">{rest.reviewTitle}</p>
                        <p className="content">{rest.reviewContent}</p>
                        <p className="rating">평점 : {rest.reviewRating}</p>
                        <button className="like" onClick={()=>onClickLiked(rest.reviewId)} style={{backgroundColor : isRevLike ? "salmon" : "white"}}>공감</button>
                        <div className="imgBox">
                            <img src="" alt="" />
                            <img src="" alt="" />
                            <img src="" alt="" />
                        </div>
                    </div>
                ))}
                <button onClick={handleLoadMore}>더보기</button>
            </div>
        </ReviewContanier>
    )
}

export default Review;

