import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { createDict } from './redux/modules/dict';

const Input = ({dicts}) => {
    const params = useParams();
    const inputData = useRef([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const addDictList = () => {
        const dictValue = inputData.current.map(d => d.value);
        console.log(dictValue);
        dispatch(createDict({word: dictValue[0], exp: dictValue[1], ex: dictValue[2]}));
        alert('단어가 추가되었습니다!');
        navigate('/');
    }

    return (
        <Container>
            <h2>{params.type === 'add' ? '단어 추가하기' : '단어 수정하기'}</h2>
            <div>
                <label>
                    단어
                    <input type='text' ref={ref => inputData.current[0] = ref} defaultValue={params.type === 'edit' ? '단어' : ''}/>
                </label>
                <label>
                    설명
                    <input type='text' ref={ref => inputData.current[1] = ref}>
                    </input>
                </label>
                <label>
                    예시
                    <input type='text' ref={ref => inputData.current[2] = ref}>
                    </input>
                </label>
            </div> 
            <button onClick={()=>{addDictList()}}>{params.type === 'add' ? '추가하기' : '수정하기'}</button>          
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 7vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;

    h2 {
        margin-top: 5vh;
        font-weight: 600;
        font-size: 24px;
    }

    > div {
        margin-top: 5vh;
    }

    > div > label {  
        margin-bottom: 4vh;
        display: flex;
        flex-direction: column;
        font-weight: 500;
        font-size: 16px;
    }

    > div > label > input {
        width: 20vw;
        min-width: 280px;
        height: 3vh;
        margin-top: 0.5vh;
        border: 0;
        border-bottom: 1px solid #000;
        font-size: 14px;
        font-weight: 300;

        &:focus {
            outline: none;
        }
    }

    button {
        border: 0;
        background-color: #eee;
        width: 8vw;
        min-width: 180px;
        height: 6vh;    
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;        
    }

`;
export default Input;