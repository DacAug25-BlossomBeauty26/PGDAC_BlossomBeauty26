import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

// Images
import img1 from "../assets/images/1.webp";
import img2 from "../assets/images/2.webp";
import img3 from "../assets/images/3.webp";
import img4 from "../assets/images/4.webp";
import img5 from "../assets/images/5.webp";
import img6 from "../assets/images/6.webp";
import img7 from "../assets/images/7.webp";
import img8 from "../assets/images/8.webp";
import img9 from "../assets/images/9.webp";
import img10 from "../assets/images/10.webp";
import img11 from "../assets/images/11.webp";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg px-5" style={{ backgroundColor: "#e6f7f7" }}>
        <span className="navbar-brand fw-bold fs-4 text-teal-dark">
          Blossom Beauty
        </span>

        <div className="ms-auto d-flex gap-3 align-items-center">
          <a className="nav-link text-teal-dark" href="#home">Home</a>
          <a className="nav-link text-teal-dark" href="#products">Products</a>
          <a className="nav-link text-teal-dark" href="#contact">Contact</a>

          <button
            className="btn btn-teal-light rounded-pill fw-bold"
            onClick={() => setShowModal(true)}
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Carousel */}
      <div className="position-relative overflow-hidden mt-3" style={{ height: "600px" }}>
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            className="position-absolute w-100 h-100 object-fit-cover"
            style={{
              opacity: idx === currentImage ? 1 : 0,
              transition: "opacity 1s ease-in-out"
            }}
            alt=""
          />
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100
                        d-flex justify-content-center align-items-center
                        bg-dark bg-opacity-50"
             style={{ zIndex: 1050 }}>

          <div className="bg-white p-4 rounded shadow position-relative"
               style={{ width: "420px" }}>

            <button
              className="btn-close position-absolute top-0 end-0 m-3"
              onClick={() => setShowModal(false)}
            />

            {isLogin ? <LoginForm /> : <RegistrationForm />}

            <p className="text-center mt-3 text-teal-dark">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span
                className="text-teal fw-bold ms-1"
                style={{ cursor: "pointer" }}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Register" : "Login"}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;













































// import React, { useState } from "react";
// import LoginForm from "./LoginForm";
// import RegistrationForm from "./RegistrationForm";



// const Home = () => {
//   const [showLogin, setShowLogin] = useState(true);
//   const toggleForm = () => setShowLogin(!showLogin);

//   return (
//     <div>
//       <h1>Blossom Beauty</h1>
//       {showLogin ? <LoginForm toggleForm={toggleForm}/> : <RegistrationForm toggleForm={toggleForm}/>}
//     </div>
//   );
// };

// export default Home;
