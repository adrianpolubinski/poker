import { useCallback, useEffect, useState } from "react";
import styled from "styled-components"
import { couldStartTrivia } from "typescript";

import CardList from '../Card/CardList';
import initialDeck from "./initialDeck";

const Div = styled.div`
    position: relative;
    background-color: green;
    height: 80vh;
    width: 100vw;
    border-radius: 2rem;
    border: 1rem solid white;

    & > div > p {
        text-align: center;
        color: white;
        font-size: 3rem;
        height: 4rem;
    }
    
`

const FirstPlayer = styled.div`
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
`

const SecondPlayer = styled.div`
    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
`

const ThirdPlayer = styled.div`
    position: absolute;
    transform: translateY(-50%) rotate(90deg);
    left: 1rem;
    top: 50%;
    

`

const FourthPlayer = styled.div`
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%) rotate(-90deg);
`

const Deck = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    & > div {
        margin-top: 2rem;
        text-align: center;
    }
`



function Table() {

    let deck = initialDeck;
   
    const [firstPlayerCards, setFirstPlayerCards] = useState(Array<{value: string, type: string}>);
    const [secondPlayerCards, setSecondPlayerCards] = useState(Array<{value: string, type: string}>);
    const [thirdPlayerCards, setThirdPlayerCards] = useState(Array<{value: string, type: string}>);
    const [fourthPlayerCards, setFourthPlayerCards] = useState(Array<{value: string, type: string}>);
    const [deckCards, setDeckCards] = useState(Array<{value: string, type: string}>);


    const [firstPlayerResult, setFirstPlayerResult] = useState(" ");
    const [secondPlayerResult, setSecondPlayerResult] = useState(" ");
    const [thirdPlayerResult, setThirdPlayerResult] = useState(" ");
    const [fourthPlayerResult, setFourthPlayerResult] = useState(" ");
  
    const randCards = (count: number) => {
        const cards: Array<{value: string, type: string}> = [];
        for(let i=0; i<count; i++){
            const rand = Math.floor(Math.random()*deck.length);
            cards.push(deck[rand])
            deleteCardFromAvaliable(rand);
        }
        
        return cards;
    }

    const deleteCardFromAvaliable = (cardIndex: number) => {
        const array = deck;
        array.splice(cardIndex, 1);
        deck = array;
    }

    ////////////////////////// initial cards
    const randFirstPlayerCards = () => {
        setFirstPlayerCards(randCards(2)); 
    }

    const randDeckCards = () => {
        setDeckCards(randCards(3));
    }

    useEffect(()=> {
        randFirstPlayerCards();
        randDeckCards();
    }, [])
    /////////////////////////////////////////////////////////

    const handleAddCardToDeck = () => {
        if(deckCards.length < 5){
            setDeckCards((prev) => [...prev, ...randCards(1)]);
        }   
    }

   

    const handleShowCards = () => {
        setSecondPlayerCards(randCards(2));
        setThirdPlayerCards(randCards(2));
        setFourthPlayerCards(randCards(2)); 
    }

    const handleCheckWinner = () => {
        

        const p1 = `${firstPlayerCards[0].value}${firstPlayerCards[0].type},${firstPlayerCards[1].value}${firstPlayerCards[1].type}`;
        const p2 = `${secondPlayerCards[0].value}${secondPlayerCards[0].type},${secondPlayerCards[1].value}${secondPlayerCards[1].type}`;
        const p3 = `${thirdPlayerCards[0].value}${thirdPlayerCards[0].type},${thirdPlayerCards[1].value}${thirdPlayerCards[1].type}`;
        const p4 = `${fourthPlayerCards[0].value}${fourthPlayerCards[0].type},${fourthPlayerCards[1].value}${fourthPlayerCards[1].type}`;
        let t= "";
        
        deckCards.forEach((card, index) => {
            if(index===deckCards.length-1){
                t+=`${card.value}${card.type}`
            } else t+=`${card.value}${card.type},`
        });

        console.log(`http://localhost:3000/winner?pl[]=${p1}&pl[]=${p2}&pl[]=${p3}&pl[]=${p4}&t=${t}`)
        fetch(`http://localhost:3000/winner?pl[]=${p1}&pl[]=${p2}&pl[]=${p3}&pl[]=${p4}&t=${t}`)
            .then(res => res.json())
            .then(( data ) => {
                setFirstPlayerResult(data.players[0].result);
                setSecondPlayerResult(data.players[1].result);
                setThirdPlayerResult(data.players[2].result);
                setFourthPlayerResult(data.players[3].result);

                console.log(data)
            })
    }


    



    return(
        <Div>
            <FirstPlayer>
                <p>{firstPlayerResult}</p>
                <CardList cards={firstPlayerCards}/>
                <p>Player1</p>
            </FirstPlayer>
            <SecondPlayer>
                <p>{secondPlayerResult}</p>
                <CardList cards={secondPlayerCards} />
                <p>Player2</p>
            </SecondPlayer>
            <ThirdPlayer>
                <p>{thirdPlayerResult}</p>
                <CardList cards={thirdPlayerCards} />
                <p>Player3</p>
            </ThirdPlayer>
            <FourthPlayer>
                <p>{fourthPlayerResult}</p>
                <CardList cards={fourthPlayerCards} />
                <p>Player4</p>
            </FourthPlayer>

            <Deck>
                <CardList cards={deckCards} />
                <div>
                    <button onClick={handleAddCardToDeck}>Wyłóż kartę</button>
                    <button onClick={handleCheckWinner}>Sprawdź</button>
                    <button onClick={handleShowCards}>Poka karty</button>
                </div>
            </Deck>
        </Div>
    )
}

export default Table