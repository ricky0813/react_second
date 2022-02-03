import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { createDictFB, updateDictFB } from './redux/modules/dict';

const Input = (props) => {
    // import 변수 할당
    const params = useParams();
    const inputData = useRef([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // timpStamp 정보 만들기
    const today = new Date();
    const timeStamp = today.toISOString().replace(/[^0-9]/g,'')
    // toISOString() -> 2022-01-31T12:31:44.323Z (국제표준시)

    // 추가 클릭 시 실행되는 함수 : map으로 Ref 배열 내에 있는 DOM 들의 value 모은 배열반환, 추가하는 미들웨어 dispatch, 메인화면으로 이동
    const addDictList = () => {
        const dictValue = inputData.current.map(d => d.value); 
        dispatch(createDictFB({word: dictValue[0], exp: dictValue[1], ex: dictValue[2], timeStamp: timeStamp, checked: false})); 
        alert('단어가 추가되었습니다!')
        navigate('/');
    }

    // 수정 클릭 시 실행되는 함수 : map으로 Ref 배열 내에 있는 DOM 들의 value 모은 배열반환, 수정하는 미들웨어 dispatch(timeStamp, checked 외에 수정내용만), 메인화면으로 이동
    const editDictList = () => {
        const dictValue = inputData.current.map(d => d.value);
        if(dictValue[0] === '' || dictValue[1] === '' || dictValue[2] === ''){
            alert('작성되지 않은 항목이 있습니다!')
        } else{
            dispatch(updateDictFB(params.type,{word: dictValue[0], exp: dictValue[1], ex: dictValue[2]}))
            alert('단어가 수정되었습니다!')
            navigate('/');
        }
    }

    // 수정 페이지에서 기존 내용 불러오기 위한 useSelecor 그리고 파라미티(id)와 같은 id값을 가진 데이터 find
    const dict_data = useSelector((state) => state.dict.list).find(a => a.id === params.type)

    return (
        <Container>
            {/* 파라미터 값에 따라 달라지는 제목 */}
            <h2>{params.type === 'add' ? '단어 추가하기' : '단어 수정하기'}</h2>
            <div>
                <label>
                    단어
                    {/* 파라미터가 add가 아닐 때만 기존 데이터를 defaultValue로 보여기주기(defaultValue가 수정할 수 있는 기본값) */}
                    {/* dict_data를 가져올 때 아직 덜 가져온 상태일 경우 콘솔 창에 값을 찾지 못했다고 찍힐 수 있어, 삼항 연산자로 작성 */}
                    <input type='text' ref={ref => inputData.current[0] = ref} defaultValue={params.type !== 'add' ? dict_data?.word : ''}/>
                </label>
                <label>
                    설명
                    <input type='text' ref={ref => inputData.current[1] = ref} defaultValue={params.type !== 'add' ? dict_data?.exp : ''}>
                    </input>
                </label>
                <label>
                    예시
                    <input type='text' ref={ref => inputData.current[2] = ref} defaultValue={params.type !== 'add' ? dict_data?.ex : ''}>
                    </input>
                </label>
            </div> 
            {/* 파라미터 값에 따라 달라지는 버튼 */}
            <button onClick={params.type === 'add' ? addDictList : editDictList}>{params.type === 'add' ? '추가하기' : '수정하기'}</button>          
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
        background-color: transparent;
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
        background-color: #dcdcdc;
        width: 8vw;
        min-width: 180px;
        height: 6vh;    
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;        
    }

`;
export default Input;