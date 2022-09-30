import { useState } from "react";
import styled from "styled-components"
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
    left: 0rem;
    top: 50%;
    width: 23rem;

`

const FourthPlayer = styled.div`
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%) rotate(-90deg);
    width: 23rem;
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
    const [firstPlayerCards, setFirstPlayerCards] = useState(Array<{value: string, type: string}>);
    const [secondPlayerCards, setSecondPlayerCards] = useState(Array<{value: string, type: string}>);
    const [thirdPlayerCards, setThirdPlayerCards] = useState(Array<{value: string, type: string}>);
    const [fourthPlayerCards, setFourthPlayerCards] = useState(Array<{value: string, type: string}>);
    const [deckCards, setDeckCards] = useState(Array<{value: string, type: string}>);
    const [blankCards, setBlankCards] = useState(0);

    const [firstPlayerResult, setFirstPlayerResult] = useState(" ");
    const [secondPlayerResult, setSecondPlayerResult] = useState(" ");
    const [thirdPlayerResult, setThirdPlayerResult] = useState(" ");
    const [fourthPlayerResult, setFourthPlayerResult] = useState(" ");

    const [deck, setDeck] = useState([...initialDeck]);
    const [visibleDeckCards, setVisibleDeckCards] = useState(false);
    const [visibleFirstPlayerCards, setVisibleFirstPlayerCards] = useState(false);
    const [visibleSecondPlayerCards, setVisibleSecondPlayerCards] = useState(false);
    const [visibleThirdPlayerCards, setVisibleThirdPlayerCards] = useState(false);
    const [visibleFourthPlayerCards, setVisibleFourthPlayerCards] = useState(false);
    
    const deleteCardFromAvaliable = (cardIndex: number) => {
        const array = deck;
        array.splice(cardIndex, 1);
        setDeck(array);
    }

    const randCards =(count: number) => {
        const cards: Array<{value: string, type: string}> = [];
        for(let i=0; i<count; i++){
            const rand = Math.floor(Math.random()*deck.length);
            cards.push(deck[rand])
            deleteCardFromAvaliable(rand);
        }    
        return cards;
    }


    const randFirstPlayerCards = () => {

        let times = 0;
        const interval = window.setInterval(()=>{
                if(times<2){
                    const randomCard = randCards(1)[0];
                    setFirstPlayerCards(prev => [...prev, randomCard])
                    times++;
                } else {
                    window.clearInterval(interval);
                    setVisibleFirstPlayerCards(true)
                } 
            }, 1000); 
    }

    const randDeckCards = () => {
        let times = 0;
        const interval = window.setInterval(()=>{
            if(times<3){
                const randomCard = randCards(1)[0];
                setDeckCards(prev => [...prev, randomCard])
                times++;
            }
            else {
                window.clearInterval(interval);
                setVisibleDeckCards(true)
            } 
        }, 1000)

    }

    const randSecondPlayerCards=()=>{
        const randomCard = randCards(2);
        setSecondPlayerCards(randomCard)
        setTimeout(()=>{setVisibleSecondPlayerCards(true)}, 500)
        
    }

    const randThirdPlayerCards=()=>{
        const randomCard = randCards(2);
        setThirdPlayerCards(randomCard)
        setTimeout(()=>{setVisibleThirdPlayerCards(true)}, 1000)
    }

    const randFourthPlayerCards=()=>{
        const randomCard = randCards(2);
        setFourthPlayerCards(randomCard)
        setTimeout(()=>{setVisibleFourthPlayerCards(true)}, 1500)
        
    }


    const handleShowCards = () =>{
        randSecondPlayerCards();
        randThirdPlayerCards();
        randFourthPlayerCards();
        setBlankCards(0);
    }

    const createBlankCards= () => {
        let times = 0;
        const interval = window.setInterval(()=>{
            if( times < 2 ){
                setBlankCards(prev => (prev + 1))
                times++;
            }
            else {
                console.log(blankCards)
                window.clearInterval(interval);
            } 
        }, 1000)
        
    }

    const handleStartGame = ()=> {
        randFirstPlayerCards();

        createBlankCards();

        setTimeout(() => {
            randDeckCards();
        }, 2000);
    }

    const handleAddCardToDeck = () => {
        if(deckCards.length < 5){
            setDeckCards((prev) => [...prev, ...randCards(1)]);
        }   
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
    
    const handleResetGame = () => {
        setDeck([...initialDeck]);
        setDeckCards([]);
        setVisibleDeckCards(false);

        setFirstPlayerCards([]);
        setVisibleFirstPlayerCards(false);
        setSecondPlayerCards([]);
        setThirdPlayerCards([]);
        setFourthPlayerCards([]);

        setFirstPlayerResult("");
        setSecondPlayerResult("");
        setThirdPlayerResult("");
        setFourthPlayerResult("");

        setBlankCards(0)
    }


    return(
        <Div>
            <FirstPlayer>
                <p>{firstPlayerResult}</p>
                <CardList cards={firstPlayerCards} visible={visibleFirstPlayerCards}/>
                <p>Player1</p>
            </FirstPlayer>
            <SecondPlayer>
                <p>{secondPlayerResult}</p>
                <CardList cards={secondPlayerCards} visible={visibleSecondPlayerCards} blankCards={blankCards}/>
                <p>Player2</p>
            </SecondPlayer>
            <ThirdPlayer>
                <p>{thirdPlayerResult}</p>
                <CardList cards={thirdPlayerCards} visible={visibleThirdPlayerCards} blankCards={blankCards}/>
                <p>Player3</p>
            </ThirdPlayer>
            <FourthPlayer>
                <p>{fourthPlayerResult}</p>
                <CardList cards={fourthPlayerCards} visible={visibleFourthPlayerCards} blankCards={blankCards}/>
                <p>Player4</p>
            </FourthPlayer>

            <Deck>
                <CardList cards={deckCards} visible={visibleDeckCards} deck/>
                <div>
                    <button onClick={handleAddCardToDeck}>Wyłóż kartę</button>
                    <button onClick={handleCheckWinner}>Sprawdź</button>
                    <button onClick={handleShowCards}>Poka karty</button>
                    <button onClick={handleResetGame}>Reset Game</button>
                    <button onClick={handleStartGame}>StartGame</button>
                </div>
            </Deck>
        </Div>
    )
}

export default Table