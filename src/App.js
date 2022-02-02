import './App.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Routes, Route, Link } from 'react-router-dom';
import Main from './Main';
import Input from './Input';
import { loadDictFB } from './redux/modules/dict';



function App() {

  const dispatch = useDispatch();

  // 미들웨어 loadDictFB 함수를 dispatch 
  // useEffect를 하위 컴포넌트에서 사용해 디스패치 로드할 경우 렌더링 횟수도 증가하고, 카드 추가 시 뷰가 두 개씩 그려지는 문제 발생
  React.useEffect(()=>{   
    dispatch(loadDictFB())
  },[dispatch]);

  return (
    <AppWrap>
      <header>
        <Link to='/'>
          <h1>공부와는 전혀 상관없는 단어장</h1>
        </Link>
      </header>
      <div>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/input/:type' element={<Input/>} />
        </Routes>
      </div>      
    </AppWrap>
  );
}

const AppWrap = styled.div`
  width: 100%;
  height: 100vh;

  header {
    width: 100%;
    height: 7vh;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
  }

  header > a {
    text-decoration: none;
  }

  header > a > h1 {
    font-size: 2rem;
  }

  > div {

  }
`;

export default App;
