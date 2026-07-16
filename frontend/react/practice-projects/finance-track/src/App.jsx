import React from 'react'
import { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'

const App = () => {
  const [toggle, setToggle] = useState(true)

  const [usersData, setUsersData] = useState([])

  return (
    <div className='h-screen bg-gray-300 flex justify-center items-center' >
      {toggle ? <Register setUsersData={setUsersData} setToggle={setToggle} /> : <Login usersData={usersData} setToggle={setToggle} />}
    </div>
  )
}

export default App