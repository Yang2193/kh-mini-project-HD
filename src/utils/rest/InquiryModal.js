import React from "react";
import styled from "styled-components";
import { useState,useContext } from "react";
import AxiosApi from "../../api/AxiosApi";
import { storage } from "../../firebase/firebase";
import { ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { v4 } from "uuid"; // 이름이 같지 않게 랜덤함수 불러오기
import Modal from "../Modal";
const ModalStyle = styled.div`
     .modal {
        display: none;  // 숨겨진 상태로 시작
        position: fixed;
        top: 0;  // 화면 전체를 덮도록 위치
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 99; // 다른 모달 보다 위에 위치하도록 함
        background-color: rgba(0, 0, 0, 0.6); // 배경색을 검정으로 하고 투명도 조절
    }
    .openModal {
        display: flex; // 모달이 보이도록 함
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        /* 팝업이 열릴때 스르륵 열리는 효과 */
        animation: modal-bg-show 0.8s;
    }
    .section {
        width: 50%;
        height: 60%;
        margin: 0 auto;
        border-radius: 0.3rem;
        background-color: #fff;
        /* 팝업이 열릴때 스르륵 열리는 효과 */
        animation: modal-show 0.3s;
        overflow: hidden;
    }
    .section > header{
        background-color: lightsalmon;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        padding: 16px 64px 16px 16px;
        font-weight: 700;
        height: 20px;
    }
    .section > header button {
        position: absolute;
        top: 4.5px;
        right: 15px;
        width: 30px;
        font-size: 21px;
        font-weight: 700;
        text-align: center;
        color: #999;
        background-color: transparent;
    }
    .section > main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 75%;
        padding: 16px;
        border-bottom: 1px solid #dee2e6;
        border-top: 1px solid #dee2e6;
        .title{
            padding-left: 20px;
            margin-bottom: 30px;
            width: 88%;
            height: 10%;
            background-color:#EEE4DC;
            font-size: 20px;
            border-radius: 10px;
            border: none;
        }
        .content{
            padding: 20px;
            border-radius: 10px;
            font-family: "NanumGothic";
            width: 86%;
            height: 60%;
            margin-bottom: 30px;
            background-color:#EEE4DC;
            font-size: 20px;
            border: none;
        }
        .file{
            background-color:#EEE4DC;
            width: 58%;
            height: 10%;
            padding:20px;
            border-radius: 10px;
            font-size: 20px;

        }
    }
    .section>footer{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .section > footer button {
        width: 200px;
        height: 30px;
        margin-top: 13px;
        margin-left:100px;
        margin-right: 100px;
        font-size: 20px;
        background-color: lightsalmon;
        border-radius: 10px;
        font-size:20px;
    }
    .section > footer button:hover {
        box-shadow: 1px 1px 5px;
    }

    @keyframes modal-show {
        from {
            opacity: 0;
            margin-top: -50px;
        }
        to {
            opacity: 1;
            margin-top: 0;
        }
    }
    @keyframes modal-bg-show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

`;

const InquiryModal = (props) => {
    const memId= localStorage.getItem("userId");
    const restId = localStorage.getItem("restId");
    const restName = localStorage.getItem("restName");
       //팝업 처리
       const [modalOpen, setModalOpen] = useState(false);
       const closeModal = () => {
              setModalOpen(false);
              close();
              resetInput();

          };
    // 팝업 열고 닫음
    const {open,close} = props;
    // 팝업창 초기화
    const resetInput = () => {
        setInputTitle("");
        setInputContent("");
        setImageUpload(null);
      }
    // 이미지 업로드 기능
    const [imageUplod, setImageUpload] = useState(null);// 이미지 파일 저장 

    const onChangeImage =(e) =>{
        setImageUpload(e.target.files[0])
    }

    const uploadImage= async()=>{ 
        if(imageUplod===null) return;

        const imageRef = ref(storage, `images/${imageUplod.name + v4()}`);
        const uploadSnapshot = await uploadBytes(imageRef, imageUplod);
        const imageUrl = await getDownloadURL(uploadSnapshot.ref);
        return imageUrl;
      };
    // 문의 데이터 입력 받고 데이터 추가 전송
    const [inputTttle, setInputTitle] = useState("");
    const [inputContent, setInputContent] = useState("");

    const onChangeTitle = e =>{
        if (e.target.value.length <= 30) {
            setInputTitle(e.target.value);
          }        
    }
    const onChangeContent = e =>{
        if (e.target.value.length <= 215) {
            setInputContent(e.target.value);
          }    
    }

   
    const addInquiry = async () => {
        let inquiryImageUrl = null;

        if (imageUplod) {
            inquiryImageUrl = await uploadImage();
            console.log(inquiryImageUrl);
        }

        const rsp = await AxiosApi.addInquiry(restId,memId,inputTttle,inputContent,inquiryImageUrl);
        if (rsp.data === true) {
            setModalOpen(true);
            
            const inquiryRsp = await AxiosApi.sendInquiryEmail(restName, memId);
            console.log(inquiryRsp.status);

            if(inquiryRsp.status === 200){
                console.log(inquiryRsp.data);
            }else console.log("이메일 전송실패");

            const inquiryBizRsp = await AxiosApi.sendInquiryEmailBiz(restId, restName, memId);
            if(inquiryBizRsp.status === 200){
                console.log(inquiryBizRsp.data);
            }else console.log("이메일 전송실패");


        } else {
            console.log("전송 실패");
        }

        };

    return (
        <ModalStyle>
            <div className={open ? "openModal modal" : "modal"}>
            {open && 
                <div className="section">
                    <header>
                        <p>문의 작성</p>
                        <button onClick={close}>&times;</button>
                    </header>
                    <main>
                        <input className="title" value={inputTttle} type="text" onChange={onChangeTitle} placeholder="제목을 입력해 주세요"/>
                        <textarea className="content" cols="30" rows="10"  value={inputContent} onChange={onChangeContent} placeholder="내용을 입력해 주세요"></textarea>
                    </main>
                    <footer>
                        <button className="add" onClick={addInquiry}>문의 등록</button>
                        <button className="clo" onClick={close}>취소</button>
                    </footer>
                </div>
            }
            </div>
            <Modal open={modalOpen} close={closeModal} type ="ok" header="등록 완료"> 문의 등록이 완료 되었습니다. </Modal>

        </ModalStyle>
    );
  }
  

export default InquiryModal;