import React from "react";
import styled from "styled-components";

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
.inputBox {
    display: none;
}

.custom-file-upload {
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    background-color:#FFA07A;
    }

.textBox{
    text-align: right;
    margin-left: 10px;
    margin-right: 10px;
    height: 20px
}

& > * {
    margin-right: 10px;
}

`;
const FileBtn = ({onChangeImage,selectedFile}) =>  {
    return(
        <Container>
        <input id='input-file' name='imgFileName' type="file" onChange={onChangeImage} className="inputBox" />
        <span className="textBox">{selectedFile ? selectedFile.name : '선택된 파일 없음'}</span>
        <label htmlFor='input-file' className='custom-file-upload'>파일선택 
        </label>
      </Container>
    );
}

export default FileBtn;