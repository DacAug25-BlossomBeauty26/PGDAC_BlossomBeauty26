import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";



const Home = () => {
  const [showLogin, setShowLogin] = useState(true);
  const toggleForm = () => setShowLogin(!showLogin);

  return (
    <div>
      <h1>Blossom Beauty</h1>
      {showLogin ? <LoginForm toggleForm={toggleForm}/> : <RegistrationForm toggleForm={toggleForm}/>}
    </div>
  );
};

export default Home;
