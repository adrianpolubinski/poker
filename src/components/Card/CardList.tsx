import { useEffect, useState } from "react";
import styled from "styled-components";
import BlankCard from './BlankCard';

import Card from "./Card";

interface CardListStyled {
    cardCount?: number,
    deck?:boolean
}

const Div = styled.div<CardListStyled>`
    min-height: 15rem;
    & > ul {
        display: flex;
    }

    & > ul > li {
        margin: 0 1rem;
        width: ${(p: CardListStyled) => (
                                        (p.deck && "10rem") || 
                                        ((p.cardCount === 1 ) && '10rem') || "10rem")};
        height: 15rem;
    }
    
`

interface CardListProps {
    cards: Array<{value: string, type: string}>,
    visible?: boolean,
    deck?: boolean,
    blankCards?: number
}

function CardList({ cards, visible, deck, blankCards }: CardListProps ) {
    
    let cardElements: Array<JSX.Element> = [];

    const [blank, setBlank] = useState(blankCards)
    const [visibleList, setVisibleList] = useState(visible);

    useEffect(()=>{
        setBlank(blankCards)
        setVisibleList(visible)
    },[blankCards,visible])


    if(blank){
        for(let i=0; i< blank; i++){
            cardElements.push(
            <li key={i}>
                <BlankCard />
            </li>
            )
        }

    } else {
        cardElements = cards.map((card, index) => {
            return(
                <li key={index}>
                    <Card  value={card.value} type={card.type} visible={visibleList}/>
                </li>
            )  
        })
    }
    

    return (
        <Div cardCount={cards.length} deck={deck}>
            <ul>
                {cardElements}
            </ul>
        </Div>
    )
}

export default CardList;