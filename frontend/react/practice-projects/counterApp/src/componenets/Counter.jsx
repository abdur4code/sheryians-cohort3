import React from "react";
import CounterDisplay from "./CounterDisplay";
import Buttons from "./Buttons";
import ResetBtn from "./ResetBtn";
import Title from "./Title";

const Counter = ({count, increment, decrement, reset, title, changeTitle}) => {
  return (
    <main>
      <ResetBtn reset={reset} />
      <Title title={title} changeTitle={changeTitle} />
      <CounterDisplay count={count} increment={increment} decrement={decrement} />
    </main>
  );
};

export default Counter;
