import { useEffect, useRef, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

// array of cards ( 1 each)
const cardImages = [
  [
    { src: "/img/helmet-1.png", matched: false },
    { src: "/img/potion-1.png", matched: false },
    { src: "/img/ring-1.png", matched: false },
    { src: "/img/scroll-1.png", matched: false },
    { src: "/img/shield-1.png", matched: false },
    { src: "/img/sword-1.png", matched: false },
  ],
  [
    { src: "/img/css.png", matched: false },
    { src: "/img/html.png", matched: false },
    { src: "/img/js.png", matched: false },
    { src: "/img/react.png", matched: false },
    { src: "/img/redux.png", matched: false },
    { src: "/img/bootstrap.png", matched: false },
  ],
];

function App() {
  // state management
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [numOfCards, setNumOfCards] = useState("12");

  //ref management
  const numOfCardsRef = useRef();
  const cardBankRef = useRef();
  const difRef = useRef();

  // useEffects
  useEffect(() => {
    //** start the game when the page loads */
    shuffleCards();
  }, []);

  useEffect(() => {
    //** Compare two selected cards
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        // if the user found 2 matching cards change 'matched'
        // property on them to true
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else return card;
          });
        });
        resetTurn();
      } else {
        let dif = Number(difRef.current.value);
        setTimeout(() => {
          resetTurn();
        }, dif);
      }
    }

    // check to see if all cards are turned
    if (cards.every((card) => card.matched) && cards.length > 1) {
      setTimeout(() => {
        alert(`You Won in ${turns} turns!`);
        shuffleCards();
        console.log("you won!");
      }, 200);
    }
  }, [choiceOne, choiceTwo]);

  // shuffle cards
  const shuffleCards = () => {
    const selectedCards = Number(numOfCardsRef.current.value / 2);
    const cardBank = cardBankRef.current.value;

    // shuffle the current selected card bank
    cardImages[cardBank].sort(() => 0.5 - Math.random());

    // select card pack and double the cards
    const shuffledCards = [
      ...cardImages[cardBank].slice(0, selectedCards),
      ...cardImages[cardBank].slice(0, selectedCards),
    ]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevValue) => prevValue + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <div className="settings-container">
        <button onClick={shuffleCards}>New Game</button>
        <div className="options-container">
          <div className="number-container">
            <label htmlFor="numOfCards">Number of Cards: </label>
            <select
              ref={numOfCardsRef}
              name="numOfCards"
              id="num-of-cards"
              value={numOfCards}
              onChange={(e) => {
                setNumOfCards(e.currentTarget.value);
                shuffleCards();
              }}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="12">12</option>
            </select>
          </div>
          <div className="bank-container">
            <label htmlFor="cardBank">Select card Bank: </label>
            <select
              ref={cardBankRef}
              name="cardBank"
              id="cardBank"
              defaultValue={"0"}
              onChange={() => {
                shuffleCards();
              }}
            >
              <option value="0">RPG</option>
              <option value="1">Languages</option>
            </select>
          </div>
          <div className="difficulty-container">
            <label htmlFor="difficulty">Select difficulty:</label>
            <select
              name="difficulty"
              id="difficulty"
              ref={difRef}
              onChange={() => {
                shuffleCards();
              }}
              defaultValue={"1000"}
            >
              <option value="1000">Easy</option>
              <option value="500">Medium</option>
              <option value="250">Hard</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            cardBank={cardBankRef.current.value}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
