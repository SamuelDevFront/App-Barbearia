import React, { useState } from "react";
import "./PhotoCarousel.css";

const images = [
    "/images/barbearia1.jpg",
    "/images/barbearia2.jpg",
    "/images/barbearia3.jpg",
    "/images/barbearia4.jpg"
];

function PhotoCarousel() {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1);
    };

    return (
        <div className="carousel-container">
            <button className="carousel-btn left" onClick={prevSlide}>❮</button>
            <div className="carousel-slide">
                <img src={images[current]} alt="Foto da barbearia" />
            </div>
            <button className="carousel-btn right" onClick={nextSlide}>❯</button>
        </div>
    );
}

export default PhotoCarousel;
