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
import MessageModal from "../../utils/MessageModal";
import { AiFillCloseSquare } from 'react-icons/ai';

const ReviewContanier = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    .cont{
        margin: 30px 0px;
		border-radius: 15px;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
		bottom:5px;
		padding: 30px;
		background-color: white;
		width: 1000px;
        box-shadow: 1px 1px 5px;
        button{
            border: none;
            border-radius: 5px;
            cursor: pointer;
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
            background-color: lightsalmon;
            margin-bottom: 30px;
            position: relative;
            right: 345px;
            font-size: 17px;
            border-radius: 15px;
        }
        .modalBtn:hover{
            box-shadow: 0px 0px 5px 0px;
        }
        .box{
            background-color:#EEE4DC;
            box-shadow: 1px 1px 5px;
            border-radius: 15px;
            padding: 10px;
            padding-top: 0px;
            width: 820px;
            height: 350px;
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
                bottom:10px;
            }
            .content{
                height: 150px;
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
                top:0px

            }
        img{
            position: relative;
            width: 300px;
            height: 200px;
            bottom: 280px;
            left: 500px;
            border-radius: 15px;
        }

        }
    }
    .main{
        width: 420px;
    }
    .btns{
        position: relative;
        left:300px;
        .update:hover{
            box-shadow: 1px 1px 5px ;
        }
    }
    .update{
        position: relative;
        width: 100px;
        height: 30px;
        background-color: lightsalmon;
        bottom:250px;
        left:400px;
    }
    .delete{
        background-color: #EEE4DC;
        position: relative;
        bottom:550px;
        left:380px;

    }
    .sort{
        position: relative;
        left:370px;
        bottom:70px;
    }

`;

const Review =() => {
    const {setReviewId} = useContext(ReviewIdContext)
    const restId = localStorage.getItem("restId");
    const memId = localStorage.getItem("userId");  
// 리뷰 데이터 입력
    const [rtReview, setRtReview] = useState(""); // 모든 리뷰 데이터
    const [visibleReviews, setVisibleReviews] = useState([]); // 화면에 보이는 리뷰 데이터
    const [rvCount, setRvCount] = useState(3); // 현재까지 불러온 리뷰 데이터 개수
    const [refresh,setRefresh] = useState();// 팝업 실행후 화면 렌더링
// onClick 으로 클릭시 3개씩 화면에 나올 데이터 개수 추가 + 화면 높이 증가
    const [rvHeight, setRvHeight] = useState();

// 모든 리뷰 데이터 불러오는 axios 호출
    useEffect(() => {
	    const seleteReview = async()=>{
            const rsp = await AxiosApi.restaurantReview(restId)
            setRtReview(rsp.data);
        };
        seleteReview();
    },[refresh]);
// 화면에 나올 리뷰 수 관리, 정렬 기능
const [sortOrder, setSortOrder] = useState('date'); // 'date' 또는 'likes' 공감순 또는 최신 날짜순

useEffect(() => {
    let sortedReviews = [...rtReview];
    if (sortOrder === 'date') {
      sortedReviews.sort((a, b) => {
        // 작성일을 비교하여 내림차순으로 정렬
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
    const [data, setData] = useState({
        title: '',
        content: '',
        rating: '',
        image: null
      });
    const navigate= useNavigate();

    const openModal = () => { // 리뷰 작성 팝업
        if (memId) {
            setModalOpen(true);
        } else {
            setModalCheck(true);
        }
    }
    const update =(id,title,content,rating,image) =>{ // 리뷰 수정 팝업
        setModalUpdate(true);
        setReviewId(id);
        setData({
            title: title,
            content: content,
            rating: rating,
            image: image
          });
    }
    const closeModal = () => { // 팝업창 닫기
        setModalOpen(false);
        setModalCheck(false);
        setModalUpdate(false);
        setDeleteModal(false);
        setRefresh(prevRefresh => !prevRefresh); // 리뷰 데이터를 다시 불러오기 위한 refresh 상태 변수 토글

    }
    const checkLogin=() => { // 로그인 체크 팝업
        setModalOpen(false);
        navigate('/Login');
      }
    const deleteReview = async(revId)=>{ // 리뷰 삭제 함수
        const rsp = await AxiosApi.reviewDelete(revId);
        if (rsp) {
            setDeleteModal(true);
        }
    }

    return (
        <ReviewContanier>
            <div className="cont" style={{height: rvHeight}}>
                <button className="modalBtn" onClick={openModal}>리뷰 작성 하기</button>
                <ReviewModal open={modalOpen} close={closeModal}></ReviewModal>
                <MessageModal open={modalCheck} close={checkLogin} confirm={closeModal} header="로그인">로그인이 되어있지 않습니다.</MessageModal>

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
                            {rest.reviewTitle.length > 10 ? `${rest.reviewTitle.slice(0, 10)}...` : rest.reviewTitle}
                        </Link>
                        <Link to={"/Detail" } className="content" onClick={()=>setReviewId(rest.reviewId)}>
                            {rest.reviewContent.length > 180 ? `${rest.reviewContent.slice(0, 180)}...` : rest.reviewContent}
                        </Link>
                        <p className="ratingBox">
                        평점 : <StarRatings rating={rest.reviewRating}
                            starDimension="30px"
                            starSpacing="4px"
                            starRatedColor="gold"/> ( {rest.reviewRating} )
                        </p>
                        <p className="likeCount">공감수 : {rest.likeCnt} </p>
                        </div>
                        <img src={rest.reviewImage}/>
                        {(memId === rest.memId) ? (
                            <div className="btns">
                                <button className="update" onClick={()=>update(rest.reviewId,rest.reviewTitle,rest.reviewContent,rest.reviewRating,rest.reviewImage)}>수정하기</button>
                                <button className="delete" onClick={()=>deleteReview(rest.reviewId)}>
                                 <AiFillCloseSquare style={{fontSize: '25px',color:"lightsalmon"}}/>
                                </button>
                            </div>
                        ) : null}
                        <ReviewUpdate open={modalUpdate} close={closeModal} data={data}></ReviewUpdate>
                        <Modal open={deleteModal} close={closeModal} type ="ok" header="수정 완료"> 삭제가 완료 되었습니다.</Modal>

                    </div>
                ))}
         {visibleReviews.length ===rtReview.length ? <></>  : <button onClick={handleLoadMore} className="more">▼ 더보기</button>}
            </div>
        </ReviewContanier>
    )
}

export default Review;

