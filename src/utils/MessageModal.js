import React from "react";
import styled from 'styled-components';

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
        max-width: ${props => props.maxWidth};
        margin: 0 auto;
        border-radius: 0.3rem;
        background-color: #fff;
        /* 팝업이 열릴때 스르륵 열리는 효과 */
        animation: modal-show 0.3s;
        overflow: hidden;
    }
    section > header {
        position: relative;
        padding: 16px 64px 16px 16px;
        background-color: #FFA07A;
        font-weight: 700;
    }
    section > header button {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 30px;
        font-size: 21px;
        font-weight: 700;
        text-align: center;
        color: #999;
        background-color: transparent;
    }

    section > main {
        padding: 16px;
        border-bottom: 1px solid #dee2e6;
        border-top: 1px solid #dee2e6;
    }

    section > footer {
        padding: 12px 16px;
        text-align: right;
    }

    section > footer button {
        padding: 6px 12px;
        color: #fff;
        background-color: #6c757d;
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

const MessageModal = (props) => {
    const { open, confirm, close, type, header, children } = props;

    const handleKeyDown = (e) => {
        if(open && e.keyCode === 13){
            confirm();
        }
    }
    
    //console.log("Modal Component : " + type);
    const maxWidth = type ==="resv" ? 'none' : '450px';
    return (
        <ModalStyle maxWidth={maxWidth}>
            <div className={open ? 'openModal modal' : 'modal'} onKeyDown={handleKeyDown}>
            {open &&
                <section>
                    <header>
                        {header}
                        <button onClick={close}>
                            &times;
                        </button>
                    </header>
                    <main>{children}</main>
                    <footer>
                     <button onClick={confirm}>확인</button>
                    </footer>
                </section>
            }
            </div>
        </ModalStyle>
    );
};

export default MessageModal;