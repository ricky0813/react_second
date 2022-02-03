import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Card from './Card';


const Main = () => {

    return (
        <Container>
            <div>
                <Card/>
            </div>
            <Link to='/input/add'>
                <button></button>
            </Link>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 7vh;
    padding: 5vh 40px;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    background-color: #fafafa;
    
    > div {
        width: calc(100% - 40px);
        max-width: 1400px;
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

    > a > button {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 0;
        position: fixed;
        bottom: 18px;
        right: 27px;
        background-color: #aaa;
        cursor: pointer;
        transition: 0.5s;

        &::before {
            content: '';
            display: block;
            width: 22px;
            height: 5px;
            border-radius: 5px;
            background-color: #fff;
            position: absolute;
            top: calc(50% - 2.5px);
            left: calc(50% - 11px)
        }

        &::after {
            content: '';
            display: block;
            height: 22px;
            width: 5px;
            border-radius: 5px;
            background-color: #fff;
            position: absolute;
            left: calc(50% - 2.5px);
            top: calc(50% - 11px)
        }
    
        &:hover {
            transform: rotate(180deg);
        }
    }
`;

export default Main;