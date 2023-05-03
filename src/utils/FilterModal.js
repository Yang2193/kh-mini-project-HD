import React, { useContext } from "react";
import styled from "styled-components";
import RegionFilter from "../components/filter/RegionFilter";
import MenuFilter from "../components/filter/MenuFilter";
import PriceFilter from "../components/filter/PriceFilter";
import RatingFilter from "../components/filter/RatingFilter";
import { UserContext } from "../components/context/UserInfo";

// ./search/DetailedCheck 밑에 존재

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
        /* 팝업이 열릴때 스르륵 열리는 효과 */
        animation: modal-bg-show 0.8s;
    }
    button {
        outline: none;
        cursor: pointer;
        margin-right: 10px;
        border: 0;
    }

    section {
        width: 90%;
        max-width: 1080px;
        height: 80%;
        max-height: 900px;
        margin: 0 auto;
        border-radius: 0.3rem;
        background-color: ivory;
        /* 팝업이 열릴때 스르륵 열리는 효과 */
        animation: modal-show 0.3s;
        overflow: scroll;
    }
    section > header {
        position : relative;
        height: 30px;
        background-color: coral;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }

    section > header button {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0px;
        right: 0px;
        height: 30px;
        width: 30px;
        margin: 0px;
        padding: 0px;
        font-size: 21px;
        font-weight: 700;
        text-align: center;
        color: white;
        background-color: transparent;
    }

    section > main {
        padding: 16px;
        border-bottom: 1px solid lightsalmon;
        border-top: 1px solid lightsalmon;
    }

    main {
        overflow-y: scroll;

    }

    section > footer {
        padding: 12px 16px;
        text-align: right;
        display: flex;
        justify-content: center;
    }

    section > footer button {
        right: 10px;
        padding: 6px 12px;
        color: #fff;
        background-color: coral;
        border-radius: 5px;
        font-size: 13px;
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

const FilterModal = (props) => {



    const{open, confirm, close, type, header, children} = props;
    return (
        <ModalStyle>
            <div className={open ? "openModal modal" : "modal"}>
            {open &&
                <section>
                    <header>
                        {header}
                        <button onClick={close}>
                            &times;
                        </button>
                    </header>
                    <main>
                        <RegionFilter/>
                        <MenuFilter/>
                        <PriceFilter/>
                        <RatingFilter/>
                    </main>
                    <footer>
                        <button onClick={confirm}>확인</button>
                        <button onClick={close}>취소</button>
                        {/* close는 함수가 되니, 버튼 누를 시 closeModal함수가 호출되며 바뀜. */}
                    </footer>
                </section>
            }
            </div>
        </ModalStyle>
    );
}

export default FilterModal;