import React, { useState } from 'react'
import Counter from './componenets/Counter'

const App = () => {
  let [count, setCount] = useState(0);
  let increment = () => {
    setCount(count+=1);
  }

  let decrement = () => {
    if(count > 0){
      setCount(count-=1)
    }
  }

  let reset = () => {
    setCount(count=0);
  }
  console.log(count);
  return (
    <div id='counter-app'>
      <h1>Counter App</h1>
      <Counter count={count} increment={increment} decrement={decrement} reset={reset} />
    </div>
  )
}

export default App