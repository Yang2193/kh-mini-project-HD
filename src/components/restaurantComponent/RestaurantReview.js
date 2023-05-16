import React from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";
import {useState,useEffect,useContext} from "react";
import { ReviewIdContext } from "../../context/RestaurantId";
import ReviewModal from "../../utils/rest/ReviewModal";
import { Link, useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Modal from "../../utils/Modal";
import ReviewUpdate from "../../utils/rest/ReviewUpdate";

const ReviewContanier = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    .cont{
        margin-top: 30px;
		border-radius: 15px;

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
        button{
            border: none;
            border-radius: 5px;
        }
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
        .more {
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
            font-size: 20px;
        }
        .box{
            border-radius: 15px;
            padding: 10px;
            padding-top: 0px;
            width: 820px;
            height: 350px;
            border: 1px solid;
            margin-bottom: 30px;
            p {
                margin-bottom: 10px;
                position: relative;
            }
            .title {
                    font-weight: bold;
                    font-size: 20px;
                    margin-bottom: 10px;
                }
            .ratingBox{
                font-size: 20px;
                top:100px
            }
            .rating{
                left:250px;
                top:55px;
            }
            .content{
                font-size: 15px;
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
            width: 300px;
            height: 200px;
            bottom: 190px;
            left: 500px;
        }

        }
    }
    .main{
        width: 420px;
    }
    .btns{
        position: relative;
        left:300px;
    }
    .update{
        position: relative;
        width: 100px;
        height: 30px;
        background-color: lightsalmon;
        bottom:150px;
        left:250px;
    }
    .delete{
        position: relative;
        width: 100px;
        height: 30px;
        background-color: lightsalmon;
        bottom:150px;
        left:300px;

    }
    .sort{
        position: relative;
        left:370px;
        bottom:70px;
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
const [sortOrder, setSortOrder] = useState('date'); // 'date' 또는 'likes'

useEffect(() => {
    let sortedReviews = [...rtReview];
  
    if (sortOrder === 'date') {
      sortedReviews.sort((a, b) => {
        // 작성일을 비교하여 오름차순으로 정렬
        return new Date(b.reviewDate) - new Date(a.reviewDate);
      });
    } else if (sortOrder === 'likes') {
      sortedReviews.sort((a, b) => {
        // 공감 수를 비교하여 내림차순으로 정렬
        return b.likeCnt - a.likeCnt;
      });
    }
  
    setVisibleReviews(sortedReviews.slice(0, rvCount));
  }, [rtReview, rvCount, sortOrder]);
// onClick 으로 클릭시 3개씩 화면에 나올 데이터 개수 추가 + 화면 높이 증가
    function handleLoadMore() {
        setRvCount(rvCount + 3);
        setRvHeight(rvHeight + 300);
        let sortedReviews = [...rtReview];
    
        if (sortOrder === 'date') {
        sortedReviews.sort((a, b) => {
            return new Date(a.reviewDate) - new Date(b.reviewDate);
        });
        } else if (sortOrder === 'likes') {
        sortedReviews.sort((a, b) => {
            return b.likeCnt - a.likeCnt;
        });
        }
  
    setVisibleReviews(sortedReviews.slice(0, rvCount + 3));
  }
// 버튼 입력시 팝업 창
    const [modalOpen, setModalOpen] = useState(false); // 리뷰작성
    const[modalUpdate,setModalUpdate]=useState(false); // 리뷰 수정
    const [modalCheck,setModalCheck] = useState(false); // 로그인 체크 팝업
    const [deleteModal,setDeleteModal] = useState(false); // 리뷰 삭제 완료

    const navigate= useNavigate();

    const openModal = () => {
        console.log(isLogin,memId);
        if (memId) {
            setModalOpen(true);
        } else {
            setModalCheck(true);
            navigate("/login");
        }
    }
    const update =() =>{
        setModalUpdate(true);

    }
    const closeModal = () => {
        setModalOpen(false);
        setModalCheck(false);
        setModalUpdate(false);
        setDeleteModal(false);
    }
    const deleteReview = async(revId)=>{
        const rsp = await AxiosApi.reviewDelete(revId);
        if (rsp) {
            setDeleteModal(true);
        }
    }
// 리뷰 Id context api 로 전송
    const {setReviewId} = useContext(ReviewIdContext)
  
    return (
        <ReviewContanier>
            <div className="cont" style={{height: rvHeight}}>
                <button className="modalBtn" onClick={openModal}>리뷰 작성 하기</button>
                <ReviewModal open={modalOpen} close={closeModal}></ReviewModal>
                <Modal open={modalCheck} close={closeModal} type ="ok" header="수정 완료"> 로그인이 되어 있지 않습니다. </Modal>

                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="sort">
                    <option value="date">최신 날짜순</option>
                    <option value="likes">공감순</option>
                </select>

                {visibleReviews&&visibleReviews.map(rest=>(
                    <div className="box" key={rest.reviewId}>
                        <div className="main">
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
                        </div>
                        <img src={rest.reviewImage}/>
                        {(memId === rest.memId) ? (
                            <div className="btns">
                                <button className="update" onClick={update}>수정하기</button>
                                <button className="delete" onClick={()=>deleteReview(rest.reviewId)}>삭제</button>
                                <Modal open={deleteModal} close={closeModal} type ="ok" header="수정 완료"> 삭제가 완료 되었습니다.</Modal>
                            </div>
                        ) : null}
                        <ReviewUpdate open={modalUpdate} close={closeModal}></ReviewUpdate>
                    </div>
                ))}
         {visibleReviews.length ===rtReview.length ? <></>  : <button onClick={handleLoadMore} className="more">▼ 더보기</button>}
            </div>
        </ReviewContanier>
    )
}

export default Review;

