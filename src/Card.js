import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Card = ({dict}) => {
    const navigate = useNavigate();
    console.log(dict)
    return (
        <CardWrap>
            <h3>{dict.word}</h3>
            <p>{dict.exp}</p>
            <p className='example'>{dict.ex}</p>
            <div>
               <button className='check'>체크</button>
               <button className='edit' onClick={() => {navigate('/input/edit')}}>수정</button>
               <button className='delete'>삭제</button>
            </div>
        </CardWrap>
    );
};

    const CardWrap = styled.article`
        background-color: #fff;
        width: 100%;
        border-radius: 10px;
        border: 1px solid #ddd;
        box-sizing: border-box;
        padding: 20px;
        display: flex;
        flex-direction: column;
        position: relative;

        @media screen and (min-width: 768px){
        width: calc((100% - 20px) / 2)
        }

        @media screen and (min-width: 1024px){
            width: calc((100% - 40px) / 3)
        }

        & > h3 {
            font-size: 23px;
            font-weight: 600;
        }

        & > p {
            margin-top: 30px;
        }

        .example {
            color: #1d7bf8;
            margin-bottom: 10px;
        }

        > div {
            display: flex;
            position: absolute;
            top: 10px;
            right: 10px;
        }
    `;

export default Card;