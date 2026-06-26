import React from 'react'

const ResetBtn = ({reset}) => {
  return (
    <div>
        <button id="reset-btn" onClick={reset}>Reset</button>
    </div>
  )
}

export default ResetBtn