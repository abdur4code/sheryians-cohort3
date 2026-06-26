import React from "react";
import Buttons from "./Buttons";

const CounterDisplay = ({count, increment, decrement}) => {
  return (
    <div id="counter-container">
      <div id="counter-display">
        <h1>{count}</h1>
      </div>
      <Buttons increment={increment} decrement={decrement} count={count} />
    </div>
  );
};

export default CounterDisplay;
