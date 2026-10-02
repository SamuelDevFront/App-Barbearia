import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  // Função para rolar o carrossel de imagens
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const galleryImages = [
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=600"
  ];

  const services = [
    {
      id: 1,
      title: "Corte normal",
      price: "R$ 45,00",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 2,
      title: "Barba completa",
      price: "R$ 35,00",
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 3,
      title: "Sobrancelha",
      price: "R$ 20,00",
      image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ESTILO DE TEXTO OURO RELUZENTE
  const goldTextStyle = {
    background: "linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontFamily: "Georgia, serif"
  };

  // ESTILO DE BOTÃO OURO RELUZENTE
  const goldButtonStyle = {
    background: "linear-gradient(180deg, #ffe082 0%, #d4af37 45%, #aa771c 100%)",
    color: "#000000",
    fontWeight: "bold",
    fontSize: "0.85rem",
    letterSpacing: "1px",
    padding: "14px 32px",
    borderRadius: "6px",
    border: "1px solid #fff3b0",
    boxShadow: "0 4px 15px rgba(212, 175, 55, 0.4)",
    cursor: "pointer",
    textTransform: "uppercase",
    transition: "transform 0.2s, box-shadow 0.2s"
  };

  return (
    <div className="main-content" style={{ 
      backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1920')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      color: "#ffffff", 
      minHeight: "100vh" 
    }}>
      
      {/* CSS INTERNO PARA COMPLEMENTO DOS BOTÕES E CARROSSEL */}
      <style>{`
        .btn-gold-reluzente {
          background: linear-gradient(180deg, #ffe082 0%, #d4af37 45%, #aa771c 100%) !important;
          color: #000000 !important;
          font-weight: bold !important;
          letter-spacing: 1px !important;
          border: 1px solid #fff3b0 !important;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4) !important;
          cursor: pointer !important;
          text-transform: uppercase !important;
          transition: transform 0.2s, box-shadow 0.2s !important;
        }
        .btn-gold-reluzente:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.6) !important;
        }
        .carousel-container::-webkit-scrollbar {
          display: none;
        }
        .social-icon-link {
          color: #d4af37;
          transition: color 0.3s transform 0.2s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .social-icon-link:hover {
          color: #fcf6ba;
          transform: scale(1.15);
        }
      `}</style>

      {/* 1. SEÇÃO COM CARROSSEL DE IMAGENS */}
      <section style={{ 
        backgroundColor: "rgba(11, 11, 11, 0.8)", 
        padding: "40px 20px 60px 20px", 
        textAlign: "center", 
        position: "relative",
        backdropFilter: "blur(5px)"
      }}>
        <h1 style={{ 
          ...goldTextStyle,
          fontSize: "2.2rem", 
          letterSpacing: "3px", 
          marginBottom: "30px",
          textTransform: "uppercase"
        }}>
          BEM-VINDO À BARBEARIA DO SAMUCA
        </h1>

        <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto" }}>
          <button 
            onClick={() => scrollCarousel("left")}
            className="btn-gold-reluzente"
            style={{
              position: "absolute",
              left: "5px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              borderRadius: "50%",
              width: "45px",
              height: "45px",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              cursor: "pointer"
            }}
            aria-label="Anterior"
          >
            ◀
          </button>

          <div 
            ref={carouselRef}
            className="carousel-container"
            style={{
              display: "flex",
              gap: "20px",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
              padding: "10px 5px",
              scrollbarWidth: "none",
              msOverflowStyle: "none"
            }}
          >
            {galleryImages.map((imgSrc, index) => (
              <div key={index} style={{
                flex: "0 0 280px",
                scrollSnapAlign: "start",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 8px 20px rgba(0,0,0,0.6)",
                height: "260px"
              }}>
                <img 
                  src={imgSrc} 
                  alt={`Foto da Galeria ${index + 1}`} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
              </div>
            ))}
          </div>

          <button 
            onClick={() => scrollCarousel("right")}
            className="btn-gold-reluzente"
            style={{
              position: "absolute",
              right: "5px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              borderRadius: "50%",
              width: "45px",
              height: "45px",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              cursor: "pointer"
            }}
            aria-label="Próximo"
          >
            ▶
          </button>
        </div>
      </section>

      {/* 2. TEXTO DE DESTAQUE E IMAGEM DE CORTE */}
      <section style={{ 
        backgroundColor: "rgba(17, 17, 17, 0.85)", 
        padding: "60px 20px", 
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(5px)"
      }}>
        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "40px"
        }}>
          <div style={{ flex: "1 1 450px", textAlign: "center" }}>
            <h2 style={{ fontSize: "2.4rem", fontWeight: "bold", marginBottom: "16px" }}>
              A sua barbearia em <span style={goldTextStyle}>destaque.</span>
            </h2>

            <p style={{ color: "#a0a0a0", fontSize: "1rem", marginBottom: "32px" }}>
              E cada corte nosso é uma obra com propósito.
            </p>

            <button style={goldButtonStyle} className="btn-gold-reluzente" onClick={() => navigate("/agendamento")}>
              AGENDAR AGORA
            </button>
          </div>

          <div style={{ 
            flex: "1 1 450px", 
            borderRadius: "16px", 
            overflow: "hidden", 
            boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
            maxHeight: "380px"
          }}>
            <img 
              src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=800" 
              alt="Corte em Destaque" 
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
            />
          </div>
        </div>
      </section>

      {/* 3. SEÇÃO NOSSOS SERVIÇOS */}
      <section style={{ 
        backgroundColor: "rgba(17, 17, 17, 0.82)", 
        color: "#ffffff", 
        padding: "70px 20px", 
        textAlign: "center",
        borderTop: "1px solid rgba(212, 175, 55, 0.2)",
        backdropFilter: "blur(6px)"
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ 
            ...goldTextStyle,
            fontSize: "2.2rem", 
            marginBottom: "12px" 
          }}>
            Nossos Serviços
          </h2>

          <p style={{ 
            color: "#cccccc", 
            fontSize: "0.95rem", 
            maxWidth: "650px", 
            margin: "0 auto 45px auto",
            lineHeight: "1.5"
          }}>
            Cada serviço valoriza sua identidade com técnica, estilo e respeito. De cortes a tranças, entregamos cuidado, representatividade e atitude.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px"
          }}>
            {services.map((service) => (
              <div key={service.id} style={{
                backgroundColor: "rgba(26, 26, 26, 0.85)",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.6)",
                border: "1px solid rgba(212, 175, 55, 0.4)",
                display: "flex",
                flexDirection: "column",
                backdropFilter: "blur(4px)"
              }}>
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
                <div style={{ 
                  padding: "20px", 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  backgroundColor: "rgba(22, 22, 22, 0.9)"
                }}>
                  <span style={{ fontWeight: "600", fontSize: "1.05rem", color: "#fcf6ba" }}>
                    {service.title}
                  </span>
                  <span style={{ 
                    ...goldButtonStyle,
                    padding: "8px 14px", 
                    fontSize: "0.9rem",
                    borderRadius: "8px",
                    boxShadow: "none"
                  }}>
                    {service.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SEÇÃO: ALÉM DO CORTE DE CABELO + VÍDEO */}
      <section style={{ 
        backgroundColor: "rgba(13, 13, 13, 0.85)", 
        color: "#ffffff", 
        padding: "60px 20px 80px 20px", 
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(6px)"
      }}>
        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "40px"
        }}>
          <div style={{ flex: "1 1 450px", textAlign: "left" }}>
            <h2 style={{ 
              ...goldTextStyle,
              fontSize: "2.2rem", 
              marginBottom: "16px",
              lineHeight: "1.2"
            }}>
              Além do corte de cabelo
            </h2>

            <p style={{ 
              color: "#cccccc", 
              fontSize: "1rem", 
              lineHeight: "1.6", 
              marginBottom: "28px",
              maxWidth: "480px"
            }}>
              É sobre se sentir bem, ser ouvido e sair com a autoestima lá em cima. Cada cliente tem sua história e a gente honra todos.
            </p>

            <button 
              onClick={() => navigate("/agendamento")}
              style={goldButtonStyle}
              className="btn-gold-reluzente"
            >
              AGENDAR AGORA
            </button>
          </div>

          <div style={{ 
            flex: "1 1 480px", 
            borderRadius: "16px", 
            overflow: "hidden", 
            boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
            height: "300px"
          }}>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Vídeo Barbearia"
              style={{ border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* 5. SEÇÃO: CONHEÇA O SAMUEL */}
      <section style={{ 
        backgroundColor: "rgba(15, 15, 17, 0.88)", 
        padding: "80px 20px", 
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(6px)"
      }}>
        <div style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "50px"
        }}>
          <div style={{
            borderRadius: "50%",
            border: "3px solid #d4af37",
            boxShadow: "0 0 25px rgba(212, 175, 55, 0.5)",
            overflow: "hidden",
            width: "280px",
            height: "280px",
            flexShrink: 0
          }}>
            <img 
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600" 
              alt="Samuel Barbeiro" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div style={{ flex: "1 1 450px", textAlign: "center" }}>
            <h2 style={{ 
              ...goldTextStyle,
              fontSize: "2.2rem", 
              marginBottom: "20px"
            }}>
              Conheça o Samuel
            </h2>

            <p style={{ 
              color: "#cccccc", 
              fontSize: "0.95rem", 
              lineHeight: "1.6", 
              marginBottom: "32px",
              maxWidth: "520px",
              margin: "0 auto 32px auto"
            }}>
              Sou apaixonado pelo que faço! Cada corte é uma nova história, uma nova conexão e uma oportunidade de transformar o visual e a autoestima dos meus clientes. Aqui, o foco é qualidade, estilo e bom atendimento.
            </p>

            <button style={goldButtonStyle} className="btn-gold-reluzente" onClick={() => navigate("/agendamento")}>
              AGENDAR AGORA
            </button>
          </div>
        </div>
      </section>

      {/* 6. MAPA E INFORMAÇÕES COMERCIAIS */}
      <section 
        style={{ 
          backgroundColor: "rgba(10, 10, 10, 0.9)",
          padding: "60px 20px 100px 20px"
        }}
      >
        <div style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "30px",
          alignItems: "stretch"
        }}>
          {/* MAPA DO GOOGLE COM O ENDEREÇO DA BARBEARIA */}
          <div style={{
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            minHeight: "380px"
          }}>
            <iframe
              title="Localização Barbearia do Samuca"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.2727582129164!2d-46.73401112388062!3d-23.66620186545381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5199b700dd2b%3A0xb7b9af256d4b1d24!2sR.%20Lu%C3%ADs%20Aranha%20de%20Vasconcelos%2C%20164%20-%20Jardim%20Vergueiro%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2005818-330!5e0!3m2!1spt-BR!2sbr!4v1790380081571!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "380px" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>

          <div style={{
            backgroundColor: "rgba(18, 18, 18, 0.9)",
            border: "1px solid rgba(255, 193, 7, 0.3)",
            borderRadius: "16px",
            padding: "30px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)"
          }}>
            <h3 style={{
              ...goldTextStyle,
              textAlign: "center",
              fontSize: "1.6rem",
              marginBottom: "20px"
            }}>
              Informações Comerciais
            </h3>

            <div style={{ borderTop: "1px solid #2a2a2a", paddingTop: "15px", marginBottom: "15px" }}>
              <h4 style={{
                ...goldTextStyle,
                textAlign: "center",
                fontSize: "0.95rem",
                marginBottom: "12px",
                fontWeight: "600"
              }}>
                Horário de Atendimento
              </h4>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.85rem", color: "#e0e0e0" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Terça</span>
                  <span style={{ color: "#d4af37", fontWeight: "bold" }}>09:00 – 20:00</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Quarta</span>
                  <span style={{ color: "#d4af37", fontWeight: "bold" }}>09:00 – 20:00</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Quinta</span>
                  <span style={{ color: "#d4af37", fontWeight: "bold" }}>09:00 – 20:00</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Sexta</span>
                  <span style={{ color: "#d4af37", fontWeight: "bold" }}>09:00 – 20:00</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Sábado</span>
                  <span style={{ color: "#d4af37", fontWeight: "bold" }}>09:00 – 18:00</span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid #2a2a2a", paddingTop: "12px", textAlign: "center", marginBottom: "12px" }}>
              <h4 style={{ ...goldTextStyle, fontSize: "0.95rem", marginBottom: "6px", fontWeight: "600" }}>
                Endereço
              </h4>
              <p style={{ color: "#a0a0a0", fontSize: "0.82rem", lineHeight: "1.3" }}>
                Rua Luís Aranha de Vasconcelos, 164<br />
                Jardim Vergueiro - São Paulo/SP
              </p>
            </div>

            <div style={{ borderTop: "1px solid #2a2a2a", paddingTop: "12px", textAlign: "center" }}>
              <h4 style={{ ...goldTextStyle, fontSize: "0.95rem", marginBottom: "6px", fontWeight: "600" }}>
                Contato
              </h4>
              <p style={{ color: "#a0a0a0", fontSize: "0.82rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <span style={{ color: "#ff5252" }}>📞</span> WhatsApp: (11) 94007-6975
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. RODAPÉ (FOOTER) - ÍCONES SVG NATIVOS DOURADOS */}
      <footer style={{
        backgroundColor: "rgba(5, 5, 5, 0.95)",
        borderTop: "1px solid #1a1a1a",
        padding: "16px 24px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        fontSize: "0.85rem",
        color: "#888888"
      }}>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <a 
            href="https://www.instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-link"
            title="Instagram"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

          <a 
            href="https://www.facebook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-link"
            title="Facebook"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>

          <a 
            href="https://wa.me/5511940076975" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-link"
            title="WhatsApp"
            style={{ color: "#25d366" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </a>
        </div>

        <div>
          © 2026 Barbearia do Samuca
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button 
            onClick={scrollToTop} 
            style={{
              backgroundColor: "#1a1a1a",
              color: "#cccccc",
              border: "1px solid #333333",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.8rem"
            }}
          >
            ↑ Topo
          </button>

          <button 
            onClick={() => navigate("/agendamento")}
            style={{
              ...goldButtonStyle,
              padding: "6px 16px",
              fontSize: "0.8rem",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
            className="btn-gold-reluzente"
          >
            ✂️ Agenda
          </button>
        </div>
      </footer>

    </div>
  );
};

export default Home;