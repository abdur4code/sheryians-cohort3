import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-white text-6xl">{count}</h1>
      <div className="flex gap-4 items-center">
        <button className="cursor-pointer bg-green-400 font-semibold text-center text-2xl px-4 py-2 rounded" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <button className="cursor-pointer bg-amber-600 font-semibold text-center text-2xl px-4 py-2 rounded" onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
    </div>
  );
};

export default Counter;
