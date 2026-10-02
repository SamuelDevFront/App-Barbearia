import React from "react";
import "./Hero.scss";

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">

                {/* Lado esquerdo → textos */}
                <div className="hero-text">
                    <h1>
                        A beleza merece <span>destaque.</span>
                    </h1>
                    <p>
                        E cada corte nosso é uma obra <br /> com propósito.
                    </p>
                    <a href="/agendamento" className="hero-btn">
                        Agendar agora
                    </a>
                </div>

                {/* Lado direito → imagem */}
                <div className="hero-image">
                    <img
                        src="images.jpg"
                        alt="Cliente sorrindo na barbearia"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
