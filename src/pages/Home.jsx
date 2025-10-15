// src/pages/Home.jsx
import React from "react";
import Slider from "react-slick";
import Hero from "../components/Hero";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
    const navigate = useNavigate();

    const images = [
        "/barbearia-nova.avif",
        "/bg.jpg",
        "/corte.jpg",
        "/cliente-fazendo-o-corte-de-cabelo-em-um-salao-de-barbearia_1303-20861.jpg",
        "/depositphotos_104273602-stock-photo-professional-barber-styling-hair-of.jpg",
    ];

    const imagesBottom = [
        "/salão 1.jpg",
        "/salão 2.jpg",
        "/salão 3.jpg",
        "/salão 4.jpg",
        "/salão 5.jpg",
    ];

    // ✅ Corrigido: usa a mesma chave "userData"
    const handleServiceClick = (service) => {
        const user = JSON.parse(localStorage.getItem("userData"));

        if (user) {
            // já cadastrado → envia o serviço selecionado
            localStorage.setItem("servicoSelecionado", service);
            navigate("/agendamento", { state: { selectedService: service } });
        } else {
            alert("Você precisa estar cadastrado para agendar um serviço.");
            navigate("/cadastro");
        }
    };

    return (
        <div className="home">
            <h2>Bem-vindo à Barbearia do Samuca</h2>

            {/* ==== Carrossel Superior ==== */}
            <Slider
                infinite={true}
                speed={800}
                slidesToShow={3}
                slidesToScroll={1}
                centerMode={false}
                arrows={true}
                autoplay={true}
                autoplaySpeed={2000}
                pauseOnHover={true}
                dots={false}
            >
                {images.map((image, index) => (
                    <div key={index} className="carousel-item">
                        <img src={image} alt={`Slide ${index}`} className="carousel-image" />
                    </div>
                ))}
            </Slider>

            {/* ==== Hero ==== */}
            <Hero />

            {/* ==== Seção de Serviços ==== */}
            <section className="services-section">
                <h2 className="services-title">Nossos Serviços</h2>
                <p className="services-text">
                    Cada serviço valoriza sua identidade com técnica, estilo e respeito.
                    De cortes a tranças, entregamos cuidado, representatividade e atitude.
                </p>

                <div className="services-cards">
                    <div className="service-card" onClick={() => handleServiceClick("Corte normal")}>
                        <img src="/Corte de Cabelo.jpg" alt="Corte normal" />
                        <div className="service-info">
                            <h3>Corte normal</h3>
                            <span className="price">R$ 45,00</span>
                        </div>
                    </div>

                    <div className="service-card" onClick={() => handleServiceClick("Barba completa")}>
                        <img src="/Barba.jpg" alt="Barba completa" />
                        <div className="service-info">
                            <h3>Barba completa</h3>
                            <span className="price">R$ 35,00</span>
                        </div>
                    </div>

                    <div className="service-card" onClick={() => handleServiceClick("Sobrancelha")}>
                        <img src="/sobrancelha.jpeg" alt="Sobrancelha" />
                        <div className="service-info">
                            <h3>Sobrancelha</h3>
                            <span className="price">R$ 20,00</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==== Botão Além do Corte ==== */}
            <section className="beyond-section">
                <div className="beyond-content">
                    <div className="beyond-text">
                        <h2>Além do corte de cabelo</h2>
                        <p>
                            É sobre se sentir bem, ser ouvido e sair com a autoestima lá em cima.
                            Cada cliente tem sua história e a gente honra todas.
                        </p>
                        <button
                            className="beyond-button"
                            onClick={() => handleServiceClick("Agendamento direto")}
                        >
                            AGENDAR AGORA
                        </button>
                    </div>

                    <div className="beyond-video">
                        <iframe
                            width="100%"
                            height="315"
                            src="https://www.youtube.com/embed/24T8TpGEKBo"
                            title="Vídeo da barbearia"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* ==== Carrossel Inferior ==== */}
            <Slider
                infinite={true}
                speed={800}
                slidesToShow={3}
                slidesToScroll={1}
                centerMode={false}
                arrows={true}
                autoplay={true}
                autoplaySpeed={3000}
                pauseOnHover={true}
                dots={false}
            >
                {imagesBottom.map((image, index) => (
                    <div key={index} className="carousel-item">
                        <img
                            src={image}
                            alt={`Foto Barbearia ${index}`}
                            className="carousel-image-bottom"
                        />
                    </div>
                ))}
            </Slider>

            {/* ==== Sobre o Samuel ==== */}
            <section className="about-section">
                <div className="about-container">
                    <div className="about-image">
                        <img src="/face.jpg" alt="Samuel - Barbeiro" />
                    </div>
                    <div className="about-text">
                        <h2>Conheça o Samuel</h2>
                        <p>
                            Sou apaixonado pelo que faço! Cada corte é uma nova história,
                            uma nova conexão e uma oportunidade de transformar o visual e
                            a autoestima dos meus clientes.
                            Aqui, o foco é qualidade, estilo e bom atendimento.
                        </p>
                        <button
                            className="about-button"
                            onClick={() => (window.location.href = "/agendamento")}
                        >
                            AGENDAR AGORA
                        </button>
                    </div>
                </div>
            </section>

            {/* ==== Informações Comerciais ==== */}
            <section className="info-section">
                <div className="info-container">
                    <div className="info-map">
                        <iframe
                            title="Mapa da Barbearia do Samuca"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.718220927327!2d-46.712501!3d-23.579271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce563b826e11f3%3A0x2a0a3216c1b05b8f!2sRua%20Lu%C3%ADs%20Aranha%20de%20Vasconcelos%2C%20164%20-%20Jardim%20Vergueiro%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1696633212345!5m2!1spt-BR!2sbr"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                    <div className="info-details">
                        <h2>Informações Comerciais</h2>

                        <div className="info-hours">
                            <h3>Horário de Atendimento</h3>
                            <ul className="info-hours-list">
                                <li><span>Terça:</span> <span>09:00 – 20:00</span></li>
                                <li><span>Quarta:</span> <span>09:00 – 20:00</span></li>
                                <li><span>Quinta:</span> <span>09:00 – 20:00</span></li>
                                <li><span>Sexta:</span> <span>09:00 – 20:00</span></li>
                                <li><span>Sábado:</span> <span>09:00 – 18:00</span></li>
                            </ul>
                        </div>

                        <div className="info-address">
                            <h3>Endereço</h3>
                            <p>
                                Rua Luís Aranha de Vasconcelos, 164<br />
                                Jardim Vergueiro - São Paulo/SP
                            </p>
                        </div>

                        <div className="info-contact">
                            <h3>Contato</h3>
                            <p>📞 WhatsApp: (11) 94007-6975</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==== Footer Slim ==== */}
            <footer className="footer-slim">
                <div className="footer-slim-content">
                    <div className="social-icons">
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://wa.me/5511940076975" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-whatsapp"></i>
                        </a>
                    </div>

                    <p className="footer-slim-text">
                        © {new Date().getFullYear()} Barbearia do Samuca
                    </p>

                    <div className="footer-slim-buttons">
                        <button
                            className="footer-slim-btn"
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        >
                            ↑ Topo
                        </button>
                        <button
                            className="footer-slim-btn"
                            onClick={() => (window.location.href = "/agendamento")}
                        >
                            ✂️ Agendar
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
