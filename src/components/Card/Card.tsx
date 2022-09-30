import { useEffect, useState } from 'react';
import styled from 'styled-components';


import Clubs from './cardIcons/Clubs';
import Diamond from './cardIcons/Diamond';
import Heart from './cardIcons/Heart';
import Spades from './cardIcons/Spade';

import CardSymbol from "./CardSymbol";


interface CardStyled {
    isVisible?: boolean
}

const Div = styled.div<CardStyled>`
    width: 100%;
    height: 100%;

    background-color: #fff;
    border-radius: 1rem;
    position: relative;
    
    transform: ${(p:CardStyled) => p.isVisible ? 'rotateY(0deg);' : 'rotateY(180deg);'};
    transition: transform .5s ease-in-out;
    
    & > div:first-child {
        opacity: ${(p: CardStyled) => p.isVisible && '0'};;
        transition: opacity 0s .25s;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        padding: .5rem;

        & > div {
            background-image: url('img/card/card-back.png');
            background-position: center;
            background-size: cover;
            border-radius: 1rem;
            width: 100%;
            height: 100%;
        }
    }

    & > div:last-child {
        opacity: ${(p: CardStyled) => !p.isVisible && '0'};
        transition: opacity 0s .25s;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;

        & > div:nth-child(2) {
            height: 50%;
            width: 50%;

            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }



`

interface CardProps {
    value: string,
    type: string,
    visible?: boolean
}

function Card( {value, type, visible }: CardProps ) {

    const [isVisible, setIsVisible] = useState(visible);

    useEffect(()=>{
        setIsVisible(visible);
    },[visible])

    return (
        <Div isVisible={isVisible}>
            <div>
                <div></div>
            </div>
            
            <div>
                <CardSymbol value={value} type={type}/>
                <div>
                    {(type === 'C') && <Clubs />}
                    {(type === 'D') && <Diamond />}
                    {(type === 'H') && <Heart />}
                    {(type === 'S') && <Spades />}
                </div>         
                <CardSymbol value={value} type={type} rotated/>
            </div>
        </Div>
    )
}

export default Card;