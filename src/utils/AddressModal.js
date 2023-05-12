import React, { useState } from "react";
import styled from "styled-components";
import DaumPostcodeEmbed from "react-daum-postcode";

const ModalStyle = styled.div`

    .box1{
        background: none;
        width: 500px;
        height: 30px;
        display: flex;
        position: relative;

        .addressBtn {
            margin-right: 0;
            display: flex;
            position: absolute;
            right: 0;
            outline: none;
            cursor: pointer;
            border: 0;
            width: 60px;
            height: 30px;
            justify-content: center;
            align-items: center;
         } 
    }
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

const AddressModal = (props) => {


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
            props.searchAddress(fullAddress);
            props.onClose()
        }
     
        const postCodeStyle = {
            display: "block",
            position: "relative",
            top: "20px",
            width: "500px",
            height: "500px",
          };
     
        return(
            <ModalStyle>
                <div className={props.open ? "openModal modal" : "modal"}>
                    <div className="box1">
                        <button className="addressBtn" onClick={() => {props.onClose()}}>창 닫기</button>
                    </div>
                    <DaumPostcodeEmbed style={postCodeStyle} onComplete={handlePostCode} />                    
                </div>
            </ModalStyle>
        );
}

export default AddressModal;
