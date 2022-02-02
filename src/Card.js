import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteDictFB, updateDictFB } from './redux/modules/dict';

const Card = (props) => {
    // 시간 순 정렬
    const dict_list = useSelector((state) => state.dict.list, shallowEqual).sort((a,b) => b.timeStamp - a.timeStamp)

    const navigate = useNavigate();
    const dispatch = useDispatch();


    return (
        <>
            {dict_list.map((dict, i) => {
                return(
                    <CardWrap key={dict.id} className={dict.checked === true ? 'checked' : ''}>
                        <h3>{dict.word}</h3>
                        <p>{dict.exp}</p>
                        <p className='example'>{dict.ex}</p>
                        <div>
                            {/* 체크 버튼 : checked 값이 false이면 true를, true이면 false를 dispatch해준다.*/}
                            <button className='check' onClick={() => {
                                dict.checked === false ? dispatch(updateDictFB(dict.id,{checked: true})) : dispatch(updateDictFB(dict.id,{checked: false}))
                            }}>체크</button>
                            {/* 수정 버튼 : 수정 페이지로 아이디를 파라미터로 넘겨주며 이동*/}
                            <button className='edit' onClick={() => {navigate(`/input/${dict.id}`)}}>수정</button>
                            {/* 삭제 버튼 : 프롬프트 창에서 비밀번호가 맞으면 idfmf 파라미터로 넘기는 delete 미들웨어를 dispatch */}
                            <button className='delete' onClick={()=> {
                                let password = prompt('비밀번호를 입력하세요!')
                                if(password === 'asdf1234'){
                                    dispatch(deleteDictFB(dict.id))
                                    alert('단어가 삭제되었습니다!')
                                } else if(password !== 'asdf1234'){
                                    alert('비밀번호가 틀렸습니다!')
                                }
                                }}>삭제</button>
                                
                        </div>
                    </CardWrap>
                )
            })}
        </>  
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

        /* 스타일드 컴포넌트에서 미디어쿼리 사용 시 컴포넌트 하위 요소들 내용 작성하듯이 작성하면 된다  */
        @media screen and (min-width: 768px){
        width: calc((100% - 20px) / 2)
        }

        @media screen and (min-width: 1024px){
            width: calc((100% - 40px) / 3)
        }

        &.checked {
            background-color: #eee;
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