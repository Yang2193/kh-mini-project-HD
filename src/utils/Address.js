import React from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import styled from "styled-components";


const ModalStyle = styled.div`
    .modal {
        display: none;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 99;
        background-color: rgba(0, 0, 0, 0.6);
    }

    .openModal {
        display: flex;
        align-items: center;
        flex-direction: column;
        /* 팝업이 열릴때 스르륵 열리는 효과 */
        animation: modal-bg-show 0.8s;
        justify-content: center;
    }

    button {
        outline: none;
        cursor: pointer;
        margin-right: 10px;
        border: 0;
        width: 30px;
        height: 20px;
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

const Addre = (props) => {
    	// 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
        const handlePostCode = (data) => {
            let fullAddress = data.address;
            let extraAddress = ''; 
            
            if (data.addressType === 'R') {
              if (data.bname !== '') {
                extraAddress += data.bname;
              }
              if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
              }
              fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
            }
            console.log(data)
            console.log(fullAddress)
            console.log(data.zonecode)
        }
     
        const postCodeStyle = {
            display: "block",
            position: "relative",
            top: "10%",
            width: "500px",
            height: "500px",
            padding: "7px",
          };
     
        return(
            <ModalStyle>
                <div className={props.open ? "openModal modal" : "modal"}>
                    <DaumPostcodeEmbed style={postCodeStyle} onComplete={handlePostCode} />
                    <button  onClick={() => {props.onClose()}}>닫기</button>

                    {/* // 닫기 버튼 생성 */}
                </div>
            </ModalStyle>
        );
}

export default Addre;