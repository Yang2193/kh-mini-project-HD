import React from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";
import {useState,useEffect,useContext} from "react";
import { RestIdContext,ReviewIdContext } from "../../context/RestaurantId";
import ReviewModal from "../../utils/rest/ReviewModal";
import { Link, useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";

const ReviewContanier = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    .cont{
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
            text-decoration: none;
            color: black;
            margin-bottom: 10px;
            position: relative;
        }
        a:hover{
            text-decoration: underline;
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
                position: relative;
            }
            .title {
                    font-weight: bold;
                    font-size: 23px;

                }
            .ratingBox{
                font-size: 20px;
                top:120px
            }
            .rating{
                left:250px;
                top:65px;
            }
            .content{
                font-size: 20px;
                top:10px
            }
            .nick{
                font-size: 17px;
            }
            .date{
                font-size: 10px;
                bottom:25px;
                left:100px;
            }
            .likeCount{
                font-size: 15px;
                top:70px

            }
        img{
            position: relative;
            width: 40%;
            height: 300px;
            bottom: 260px;
            left: 450px;
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
    const restId = localStorage.getItem("restId");
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
        if (memId) {
            setModalOpen(true);
        } else {
            alert("로그인이 되어있지 않습니다.")
            navigate("/login");
        }
    }

    const closeModal = () => {
        setModalOpen(false);
    }
// 리뷰 Id context api 로 전송
    const {setReviewId} = useContext(ReviewIdContext)
  
    return (
        <ReviewContanier>
            <div className="cont" style={{height: rvHeight}}>
                <button className="modalBtn" onClick={openModal}>리뷰 작성 하기</button>
                <ReviewModal open={modalOpen} close={closeModal}></ReviewModal>
                {visibleReviews&&visibleReviews.map(rest=>(
                    <div className="box" key={rest.reviewId}>
                        <p className="nick">{rest.nickName}</p>
                        <p className="date">작성일 : {rest.reviewDate}</p>

                        <Link to={"/Detail" } className="title" onClick={()=>setReviewId(rest.reviewId)}>
                            {rest.reviewTitle}
                        </Link>
                        <Link to={"/Detail" } className="content" onClick={()=>setReviewId(rest.reviewId)}>
                            {rest.reviewContent}
                        </Link>
                        <p className="ratingBox">
                        평점 : 
                        <StarRatings rating={rest.reviewRating}
                            starDimension="30px"
                            starSpacing="4px"
                            starRatedColor="yellow"/>
                        </p>
                        <p className="rating">{rest.reviewRating}</p> 
                        <p className="likeCount">공감수 : {rest.likeCnt} </p>
                        <div className="imgBox">
                            <img src={rest.reviewImage}/>
                        </div>
                    </div>
                ))}
                <button onClick={handleLoadMore}>더보기</button>
            </div>
        </ReviewContanier>
    )
}

export default Review;

