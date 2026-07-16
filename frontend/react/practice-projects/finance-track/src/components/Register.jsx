import React, { useState } from "react";

const Register = ({ setToggle, setUsersData }) => {
  let userDefault = {
    name: "",
    email: "",
    password: "",
  };
  const [userInfo, setUserInfo] = useState(userDefault);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const userName = userInfo.name.trim();
    const userEmail = userInfo.email.trim();
    const userPassword = userInfo.password.trim();

    if(userName !== "" && userEmail !== "" && userPassword !== ""){
        setUsersData(prev => ([...prev, userInfo]));
    }else{
        alert("Please Enter a valid input")
    }
    alert("Account registered Successfully! Plese log in")
    setUserInfo(userDefault);
  };
  return (
    <div
      className="
    bg-white 
    w-80 
    flex flex-col 
    p-4 
    rounded-2xl
    gap-4
    "
    >
      <h2 className="text-3xl">Register</h2>
      <form onSubmit={formSubmit} action="" className="flex flex-col gap-3">
        <input
          onChange={inputChange}
          name="name"
          required
          value={userInfo.name}
          className="border text-s p-1 border-gray-300 rounded-2xl"
          type="text"
          placeholder="Name"
        />
        <input
          onChange={inputChange}
          name="email"
          required
          value={userInfo.email}
          className="border text-s p-1 border-gray-300 rounded-2xl"
          type="text"
          placeholder="Email"
        />
        <input
          onChange={inputChange}
          name="password"
          required
          value={userInfo.password}
          className="border text-s p-1 border-gray-300 rounded-2xl"
          type="Password"
          placeholder="Password"
        />
        <button
          className="bg-blue-500 text-white text-center p-1 text-lg rounded-2xl hover:bg-blue-600"
          type="submit"
        >
          Register
        </button>
      </form>
      <p className="text-sm text-center">
        Already have an Account!{" "}
        <span
          onClick={() => setToggle((prev) => !prev)}
          className="text-blue-600 cursor-pointer hover:text-gray-800"
        >
          Login Here
        </span>
      </p>
    </div>
  );
};

export default Register;
