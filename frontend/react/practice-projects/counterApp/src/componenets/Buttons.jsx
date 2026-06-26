import React from 'react'

const Buttons = ({increment, decrement, count}) => {
  return (
    <div id='btn-div'>
        {/* {count < 1 && <div></div>} */}
        {/* {count > 0 && <button id='decrement' onClick={decrement} >-</button>} */}
        {/* <button id='decrement' onClick={decrement} style={{opacity: count === 0 ? 0 : 100}} >-</button> */}
        <button id="decrement" onClick={decrement} disabled={count===0} >-</button>
        <button id="increment" onClick={increment}>+</button>
    </div>
  )
}

export default Buttons