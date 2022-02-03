import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteDictFB, loadDictFB, updateDictFB } from './redux/modules/dict';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useInView } from 'react-intersection-observer'



const Card = (props) => {
    // 시간 순 정렬
    const dict_list = useSelector((state) => state.dict.list);
    const paging =  useSelector((state) => state.dict.paging);

    const [loading, setLoading] = useState(false)
    const [ref, inView] = useInView()
    
    useEffect(() => {
        if (inView && !loading) {
            setLoading(true)
            dispatch(loadDictFB(paging.next))
            setLoading(false)
        }
      }, [inView, loading])

    const navigate = useNavigate();
    const dispatch = useDispatch();
    


    return (
        <>
            {dict_list.map((dict, i) => {
                return(
                    <CardWrap key={dict.id} className={dict.checked === true ? 'checked' : ''}>
                        <h3>{dict.word}</h3>
                        <p>{dict.exp}</p>
                        {dict_list.length - 1 === i ? (
                            <p className='example' ref={ref}>{dict.ex}</p>
                        ) : (
                            <p className='example'>{dict.ex}</p>
                        )}
                        <div>
                            {/* 체크 버튼 : checked 값이 false이면 true를, true이면 false를 dispatch해준다.*/}
                            <ThemeProvider theme={theme}>
                                <IconButton className='check' onClick={() => {
                                    dict.checked === false ? dispatch(updateDictFB(dict.id,{checked: true})) : dispatch(updateDictFB(dict.id,{checked: false}))
                                }} size='small' color={dict.checked === true ? 'secondary' : 'primary'}>
                                    <CheckIcon fontSize='small'/>
                                </IconButton>
                            </ThemeProvider>
                            {/* 수정 버튼 : 수정 페이지로 아이디를 파라미터로 넘겨주며 이동*/}
                            <ThemeProvider theme={theme}>
                                <IconButton className='edit' onClick={() => {navigate(`/input/${dict.id}`)}} size='small' color={dict.checked === true ? 'secondary' : 'primary'}>
                                    <EditIcon fontSize='small'/>
                                </IconButton>
                            </ThemeProvider>
                            {/* 삭제 버튼 : 프롬프트 창에서 비밀번호가 맞으면 idfmf 파라미터로 넘기는 delete 미들웨어를 dispatch */}
                            <ThemeProvider theme={theme}>
                                <IconButton className='delete' onClick={()=> {
                                    let password = prompt('비밀번호를 입력하세요!')
                                    if(password === 'asdf1234'){
                                        dispatch(deleteDictFB(dict.id))
                                        alert('단어가 삭제되었습니다!')
                                    } else if(password !== 'asdf1234'){
                                        alert('비밀번호가 틀렸습니다!')
                                    }
                                    }} size='small' color={dict.checked === true ? 'secondary' : 'primary'}>
                                    <DeleteIcon fontSize='small'/>
                                </IconButton>
                            </ThemeProvider>
                                
                        </div>
                    </CardWrap>
                )
            })}

        </>  
    );
};

    const theme = createTheme({
        palette: {
            primary: {
              // Purple and green play nicely together.
              main: '#888',
            },
            secondary: {
              // This is green.A700 as hex.
              main: '#fff',
            },
          },
    });

    const CardWrap = styled.article`
        background-color: rgba(255,255,255,0.7);
        width: 100%;
        border-radius: 10px;
        border: 1px solid #ddd;
        box-sizing: border-box;
        padding: 20px;
        display: flex;
        flex-direction: column;
        position: relative;
        transition: 0.4s;

        /* 스타일드 컴포넌트에서 미디어쿼리 사용 시 컴포넌트 하위 요소들 내용 작성하듯이 작성하면 된다  */
        @media screen and (min-width: 768px){
        width: calc((100% - 20px) / 2)
        }

        @media screen and (min-width: 1024px){
            width: calc((100% - 40px) / 3)
        }

        &:hover {
            box-shadow: 0px 3px 14px -1px rgba(0,0,0,0.08);
        }

        &.checked {
            background-color: #333;
            color: #fff;
            p {
                font-weight: 200;
            }
            .example {
                color: #fff;
            }
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
            font-size: 13px;
        }

        > div {
            display: flex;
            position: absolute;
            top: 10px;
            right: 10px;
        }
    `;

export default Card;