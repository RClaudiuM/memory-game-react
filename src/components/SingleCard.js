import React from "react";
import "./SingleCard.css";

function SingleCard({ card, handleChoice, flipped, disabled, cardBank }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} className="front" alt="card front" />
        <img
          src={`/img/${cardBank}.png`}
          className="back"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default SingleCard;
