import './App.css';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import Input from './Input';


function App() {
  return (
    <AppWrap>
      <header>
        <h1>공부와는 전혀 상관없는 단어장</h1>
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
  }
  header > h1 {
    font-size: 2rem;
  }

  > div {

  }
`;

export default App;
