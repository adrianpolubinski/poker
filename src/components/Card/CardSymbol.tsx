import styled from "styled-components";

import Clubs from './cardIcons/Clubs';
import Diamond from './cardIcons/Diamond';
import Heart from './cardIcons/Heart';
import Spades from './cardIcons/Spade';

interface CardSymbolStyled {
    rotated?: boolean
}

const Div = styled.div<CardSymbolStyled>`

    width: 20%;
    height: 30%;

    position: absolute;

    top: ${(p: CardSymbolStyled) => !p.rotated && '1rem'};
    left: ${(p: CardSymbolStyled) => !p.rotated && '1rem'};
    bottom: ${(p: CardSymbolStyled) => p.rotated && '1rem'};
    right: ${(p: CardSymbolStyled) => p.rotated && '1rem'};
    transform: ${(p: CardSymbolStyled) => p.rotated && 'rotate(180deg)'};

    & > p {
        font-size: 1.8rem;
        text-align: center;
    }

    & > div {
        height: 50%;
        width: 100%;
    }
`
interface CardSymbolProps {
    value: string,
    type: string,
    rotated?: boolean,
}

function CardSymbol({ value, type, rotated}: CardSymbolProps){

    return (
        <Div rotated={rotated} >
            <p>{value}</p>
            <div>
                {(type === 'C') && <Clubs />}
                {(type === 'D') && <Diamond />}
                {(type === 'H') && <Heart />}
                {(type === 'S') && <Spades />}
            </div>
        </Div>
    )
}

export default CardSymbol;