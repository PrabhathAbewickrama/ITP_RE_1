import React, { useState, useRef, useEffect } from "react";

const Card = ({ image, header, content }) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      setMouseX(e.pageX - rect.left - rect.width / 2);
      setMouseY(e.pageY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
      setMouseX(0);
      setMouseY(0);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const mousePX = mouseX / cardRef.current?.offsetWidth;
  const mousePY = mouseY / cardRef.current?.offsetHeight;

  const cardStyle = {
    transform: `rotateY(${mousePX * 1}deg) rotateX(${mousePY * -1}deg)`,
  };

const cardBgStyle = {
  transform: `translateX(${mousePX * -10}px) translateY(${mousePY * -10}px)`,
  backgroundImage: `url(${image})`,
  backgroundSize: "cover", // Ensures the background covers the entire card
  backgroundPosition: "center", // Centers the image
  backgroundRepeat: "no-repeat", // Prevents repeating the image
};

  return (
    <div
      className="card-wrap"
      ref={cardRef}
      style={{
        margin: "10px",
        perspective: "800px",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <div className="card" style={cardStyle}>
        <div className="card-bg" style={cardBgStyle}></div>
        <div className="card-info">
          <h1>{header}</h1>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
