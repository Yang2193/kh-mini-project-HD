import styled from 'styled-components';
import AxiosApi from '../../api/AxiosApi';
import { useNavigate } from 'react-router-dom';

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
    section > header{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f1f1f1;
        font-weight: 700;
        height: 50px;
    }
    section > main {

        padding: 16px;
        border-bottom: 1px solid #dee2e6;
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
    footer {
        height: 60px;
        button {
            position: relative;
            margin-top: 10px;
        }
        .clo {
            left:100px
        }
        .res {
            left: -100px;
        }
    }
    .cont{
        width: 700px;
        height: 500px;
        padding:15px;
        border: 1px solid;
    }
    section {
        width: 900px;
        height: 700px;
        margin: 0 auto;
        border-radius: 0.3rem;
        background-color: #fff;
        /* 팝업이 열릴때 스르륵 열리는 효과 */
        animation: modal-show 0.3s;
        overflow: hidden;
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


const ResCheck = (props) =>{
    const {open,close} = props;
    const nav = useNavigate();
    const data = JSON.parse(localStorage.getItem("resData"));

    const addRes = async() =>{
        const rsp = await AxiosApi.addRes(   
            data.restId,
            data.memId,
            data.resDate,
            data.resReq,
            data.resSeat,
            data.resPeo
        );
        if(rsp.data === true) {
            alert("예약 신청이 완료되었습니다.")
            
            nav("/info")
    
        } else {
            console.log("등록 전송 실패");
        }
    }

    return(
        <ModalStyle>
            <div className={open ? "openModal modal" : "modal" }>
                {open && 
                <section>
                    <header>
                        <p>예약 확인</p>
                    </header>
                    <main>
                        <div className='cont'>
                            <div className="box">
                                <h2>예약 날짜</h2>
                                <p>{data.resDate}</p>
                            </div>
                            <div className="box">
                                <h2>인원 수</h2>
                                <p>{data.resPeo}명</p>
                            </div>
                            <div className="box">
                                <h2>좌석 번호</h2>
                                <p>{data.resSeat}번</p>
                            </div>
                            <div className="box">
                                <h2>요청 사항</h2>
                                <p>{data.resReq}</p>
                            </div>
                        </div>
                    </main>
                    <footer>
                        <button onClick={addRes} className='res'>예약 신청</button>
                        <button onClick={close} className='clo'>취소</button>
                    </footer>
                </section>
                }
            </div>
        </ModalStyle>
    );



}

export default ResCheck;