import { useEffect,useState,useContext } from "react";
import AxiosApi from "../api/AxiosApi";
import { ReviewIdContext } from "../context/RestaurantId";
import styled from "styled-components";
import Header from "../components/header/Header";
import HomeFooter from "../components/footer/HomeFooter";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Modal from "../utils/Modal";
import ReviewUpdate from "../utils/rest/ReviewUpdate";
import { AiFillLike } from "react-icons/ai";

const ReviewPage = styled.div`
    font-family: "NanumGothic";
	background-color:#EEE4DC;
	.all{
	display: flex;
    justify-content: center;
    align-items: center;
	}
    .cont{
        box-shadow: 1px 1px 5px;
        border-radius: 15px;
        position: relative;
		padding: 30px;
		width: 60%;
        height: 600px;
		background-color: #fff;
        margin: 60px 0px;

    }
    .btns{
        position: relative;
        left: 900px;
        bottom:680px;
        button{
            width: 100px;
            height: 30px;
            margin-left: 20px;
            background-color: lightsalmon;
            border-radius: 15px;
            border: none;
        }
        button:hover{
            color:#fff;
        }
    }

    .like{
        position: relative;
        height: 40px;
        width: 40px;
        bottom:45px;
        left:80px;
        cursor: pointer;
        border: none;
        background-color: white;
    }
    .box{
       /* border: 1px solid; */
       width: 50%;
       height: 100%;
        p{
            position: relative;
        }
        .date{
            font-size: 10px;
        }
        .title {
            height: 30px;
            font-size: 20px;
            font-weight: bold;
            bottom: 20px;
        }
        .ratingBox{
            font-size: 20px;
            bottom:30px;
        }
        .content{
            height: 400px;
            bottom:35px;
            font-size: 18px;
        }
        .nick{
            font-size: 17px;
        }
        .date{
            font-size: 10px;
            bottom:32px;
            left:100px;
        }
        .likeCount{
            font-size: 15px;
            bottom:30px

        }
    }
    .return{
            position: relative;
            font-size: 20px;
            width: 150px;
            height: 50px;
            background-color: salmon;
            border: none;
            cursor: pointer;
            bottom: 50px;
            left: 950px;
            border-radius: 10px;
        }
        .return:hover{
            box-shadow: 1px 1px 2px;
        }
    .imgBox{
        position: relative;
        bottom:600px;
        left:640px;
        img{
            border-radius: 10px;
            width: 500px;
            height: 400px;
            position: absolute;
        }
    }

    
@media (max-width: 768px) { /* 화면 크기가 768px 이하인 경우에만 적용 */
  .imgBox {
    width: auto;
  }

  .imgBox img {
    width: 100%; /* 이미지를 화면에 꽉 차도록 설정 */
    height: auto; /* 이미지 높이는 가로 비율에 맞게 자동 조정 */
  }

  .ratingBox {
    font-size: 16px; /* 평점 폰트 크기를 작게 조정 */
    bottom: 20px;
  }
}
    `;

const ReviewDetail = () =>{
    const nav = useNavigate();
    const {reviewId} = useContext(ReviewIdContext);
    const memId = localStorage.getItem("userId");  // 로컬 스토리지로 로그인 시 회원 id 입력받고

    const [rtReview, setRtReview] = useState(""); // 리뷰 데이터 불러오기
    useEffect(() => {
        const rtReview = async()=>{
        const rsp = await AxiosApi.reviewDetail(reviewId)
        setRtReview(rsp.data);
    };
    rtReview();
    },[]);

    // 리뷰 공감 기능
    const [revLikeList,setRevLikeList] = useState([]); // 공감 리스트 배열
    const [isRevLike, setIsRevLike] = useState(false); // 최종 공감 상태 
    useEffect(()=>{ // 로그인한 회원id를 기준으로 공감 리뷰 리스트를 db에서 불러와 확인하고 배열에 삽입
        const liked = async() => {
            const rsp = await AxiosApi.revLiked(memId);
            setRevLikeList(rsp.data);
        }
        liked();
    },[memId]);

    useEffect(() => {
        if (revLikeList.some(item => item.reviewId === reviewId)) { // 배열을 확인하며 해당 리뷰에 공감이 등록되어 있으면 true 아니면 false
        setIsRevLike(true);
        } else {
        setIsRevLike(false);
        }
      }, [revLikeList, reviewId]);

    const addLike = async () => { 
        const rsp = await AxiosApi.addRevLike(reviewId, memId);
        if (rsp.data === true) {
            console.log("공감 등록 성공");
            setRevLikeList([...revLikeList, {reviewId, memId}]); // 찜등록 성공시 배열에도 추가
            setIsRevLike(true); // 최종 찜 상태를 true 로 전달
            console.log(revLikeList);
            } else {
                console.log(" 등록 전송 실패");
            }
        };

    const deleteLike = async () => {
        const rsp = await AxiosApi.delRevLike(reviewId, memId);
        if (rsp.data === true) {
            console.log("공감 삭제 성공");
            setRevLikeList(revLikeList.filter(item => !(item.reviewId === reviewId && item.memId === memId))); // 찜 삭제 성공시 배열에도 삭제
            setIsRevLike(false); // 최종 찜 상태를 false 로 전달
            console.log(revLikeList);

            } else {
            console.log("삭제 전송 실패");
            }
        };

    const onClickLiked = () =>{
        if(!memId) {  
            alert("로그인이 되어있지 않습니다.")
            nav("/login");
        } 
        if (!isRevLike) {
            addLike();
        }else{
            deleteLike();
        }
    }
    const movePage = (restId,reservation) => {
        localStorage.setItem("restId", restId);
        localStorage.setItem("resPossible",reservation);
        nav("/Info");
      };
    // 팝업  
    const[modalUpdate,setModalUpdate]=useState(false); // 리뷰 수정
    const [deleteModal,setDeleteModal] = useState(false); // 리뷰 삭제 완료

    const update =() =>{
        setModalUpdate(true);

    }
    const closeModal = () => {
        setModalUpdate(false);
        setDeleteModal(false);
    }
    const deleteReview = async(revId)=>{
        const rsp = await AxiosApi.reviewDelete(revId);
        if (rsp) {
            setDeleteModal(true);
        }
    }
    return(
        <ReviewPage>
        <Header/>
        <div className="all">
             {rtReview&&rtReview.map(rest=>(
                    <div className="cont" key={rest.reviewId}>
                        <div className="box">
                            <p className="nick">{rest.nickName}</p>
                            <p className="date">작성일 : {rest.reviewDate}</p>
                            <p className="title">{rest.reviewTitle}</p>
                            <p className="content">{rest.reviewContent}</p>
                            <p className="ratingBox">
                                평점 : <StarRatings rating={rest.reviewRating}
                                    starDimension="30px"
                                    starSpacing="4px"
                                    starRatedColor="gold"/> {rest.reviewRating}
                            </p>
                            <p className="likeCount">공감수 : {rest.likeCnt}</p>
                        </div>
                        <button className="like" onClick={()=>onClickLiked()} >
                            <AiFillLike style={{fontSize: '24px', color: isRevLike ? "salmon" : "#999999" }} />
                        </button>
                        <button className="return" onClick={()=>movePage(rest.restId,rest.reservation)}>매장으로 이동</button>
                        {(memId === rest.memId) ? (
                            <div className="btns">
                                <button className="update" onClick={update}>수정하기</button>
                                <button className="delete" onClick={()=>deleteReview(rest.reviewId)}>삭제</button>
                                <Modal open={deleteModal} close={closeModal} type ="ok" header="수정 완료"> 삭제가 완료 되었습니다.</Modal>
                            </div>
                        ) : null}
                        <ReviewUpdate open={modalUpdate} close={closeModal}></ReviewUpdate>
                        <div className="imgBox">
                            <img src={rest.reviewImage} alt="이미지"/>
                        </div>
                    </div>
                ))}
        </div>
        <HomeFooter/>
        </ReviewPage>
    )

}

export default ReviewDetail;