import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import { useState } from "react";

const LoginModal = ({ showModal, setShowModal }) => {

  const [isLogin, setIsLogin] = useState(true);

  if (!showModal) return null;

  return (

    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50"  style={{ zIndex: 9999 }}>

      <div className="bg-white p-4 rounded shadow position-relative" style={{ width: "420px" }}>

        <button
          className="btn-close position-absolute top-0 end-0 m-3"
          onClick={() => setShowModal(false)}
        />

        {isLogin ? <LoginForm /> : <RegistrationForm />}

        <p className="text-center mt-3">

          {isLogin ? "Don't have account?" : "Already have account?"}

          <span
            className="fw-bold ms-1"
            style={{ cursor: "pointer" }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>

        </p>

      </div>

    </div>

  );

};

export default LoginModal;
