import styled from "styled-components";
import BlankCard from './BlankCard';

import Card from "./Card";

interface CardListStyled {
    cardCount?: number,
}

const Div = styled.div<CardListStyled>`
    height: 15rem;
    width: ${(p: CardListStyled) => ((p.cardCount === 0 ) && '25rem' ||
                                    (p.cardCount === 2 ) && '25rem' || 
                                    (p.cardCount === 3 ) && '35rem' || 
                                    (p.cardCount === 4 )  && '45rem' ||
                                    (p.cardCount === 5 ) && '55rem' ) };

    & > ul {
        display: flex;
        height: 100%;
        width: 100%;
    }

    & > ul > li {
        margin: 0 1rem;
        width: 50%;
        height: 100%;
    }
    
`

interface CardListProps {
    cards: Array<{value: string, type: string}>,
}

function CardList({ cards}: CardListProps ) {
    
    let cardElements: Array<JSX.Element> = [];

    if(cards.length===0){
        cardElements = [
            <li key={0}>
                <BlankCard />
            </li>,
            <li key={1}>
                <BlankCard />
            </li>
        ]

    } else {
        cardElements = cards.map((card, index) => {
            return(
                <li key={index}>
                    <Card  value={card.value} type={card.type} />
                </li>
            )  
        })
    }
    

    return (
        <Div cardCount={cards.length} >
            <ul>
                {cardElements}
            </ul>
        </Div>
    )
}

export default CardList;