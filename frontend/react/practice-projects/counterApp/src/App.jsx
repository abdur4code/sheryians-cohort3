import React, { useState } from 'react'
import Counter from './componenets/Counter'

const App = () => {
  let [count, setCount] = useState(0);
  let increment = () => {
    setCount(count+=1);
    changeTitle();
  }

  let decrement = () => {
    if(count > 0){
      setCount(count-=1)
      changeTitle();
    }
  }

  let reset = () => {
    setCount(count=0);
    changeTitle();
  }

  let [title, setTitle] = useState("Counter is empty.");
  let changeTitle = () => {
    if(count >= 10) {
      setTitle("Awesome!")
    }
    else if(count > 0 && count < 10) {
      setTitle("Keep going!")
    }
    else{
      setTitle("Counter is empty.")
    }
  }
  return (
    <div id='counter-app'>
      <h1>Counter App</h1>
      <Counter count={count} increment={increment} decrement={decrement} reset={reset} title={title} changeTitle={changeTitle} />
    </div>
  )
}

export default App