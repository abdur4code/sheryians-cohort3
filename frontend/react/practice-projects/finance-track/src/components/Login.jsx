import React, { useState } from "react";

const Login = ({ setToggle, setUsersData, usersData }) => {
  const userDefault = {
    email: "",
    password: "",
  };
  const [logedUser, setLogedUser] = useState(userDefault);
  const inputChange = (e) => {
    const { name, value } = e.target;

    if (value.trim() !== "") {
      setLogedUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    let logedUserData = null;
    usersData.map((elem) => {
      let userEmail = elem.email;
      let userPassword = elem.password;
      if (
        userEmail === logedUser.email &&
        userPassword === logedUser.password
      ) {
        logedUserData = elem;
      }
    });

    if (logedUserData) {
      setLogedUser(logedUserData);
    } else {
      alert("Wrong Email or Password");
    }
    alert(`${logedUser.name} Login Successfully!`);
    console.log(logedUser);
    setLogedUser(userDefault);
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
      <h2 className="text-3xl">Log In</h2>
      <form onSubmit={formSubmit} action="" className="flex flex-col gap-3">
        <input
          onChange={inputChange}
          value={logedUser.email}
          name="email"
          className="border text-s p-1 border-gray-300 rounded-2xl"
          type="text"
          placeholder="Email"
        />
        <input
          onChange={inputChange}
          name="password"
          value={logedUser.password}
          className="border text-s p-1 border-gray-300 rounded-2xl"
          type="Password"
          placeholder="Password"
        />
        <button
          className="bg-blue-500 text-white text-center p-1 text-lg rounded-2xl hover:bg-blue-600"
          type="submit"
        >
          Log in
        </button>
      </form>
      <p className="text-sm text-center">
        Don't have an Account!{" "}
        <span
          onClick={() => setToggle((prev) => !prev)}
          className="text-blue-600 cursor-pointer hover:text-gray-800"
        >
          Register Here
        </span>
      </p>
    </div>
  );
};

export default Login;
