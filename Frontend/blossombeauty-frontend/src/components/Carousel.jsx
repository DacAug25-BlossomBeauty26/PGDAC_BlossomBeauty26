import React, { useState, useEffect } from "react";

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

const Carousel = () => {

  const images = [
    img1,img2,img3,img4,img5,
    img6,img7,img8,img9,img10,img11
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentImage(prev => (prev + 1) % images.length);

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div
      id="home"
      className="position-relative mt-3 mx-auto"
      style={{ height: "600px", maxWidth: "1200px" }}
    >

      {images.map((img, idx) => (

        <img
          key={idx}
          src={img}
          className="position-absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "100%",
            maxHeight: "100%",
            opacity: idx === currentImage ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />

      ))}

    </div>

  );

};

export default Carousel;
