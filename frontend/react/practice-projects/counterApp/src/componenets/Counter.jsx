import React from "react";
import CounterDisplay from "./CounterDisplay";
import Buttons from "./Buttons";
import ResetBtn from "./ResetBtn";

const Counter = ({count, increment, decrement, reset}) => {
  return (
    <main>
      <ResetBtn reset={reset} />
      <CounterDisplay count={count} increment={increment} decrement={decrement} />
    </main>
  );
};

export default Counter;
