import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./carrossel.scss";

export default function CursosCarousel({ areas }) {
  const [areasData, setAreasData] = useState([]);

  useEffect(() => {
    if (areas && areas.length > 0) {
      fetch('/areas.json')
        .then(response => response.json())
        .then(data => {
          const filteredAreas = areas.map(area => ({
            titulo: area,
            descricao: data[area] || 'Descrição não disponível.'
          }));
          setAreasData(filteredAreas);
        })
        .catch(error => {
          console.error('Erro ao carregar áreas:', error);
        });
    }
  }, [areas]);

  if (areasData.length === 0) {
    return <div>Carregando áreas...</div>;
  }

  return (
    <section className="cursos">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={-100}
        slidesPerView={3}
        grabCursor={true}
        touchRatio={1.5}
        touchAngle={45}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: -100 },
        }}
        centeredSlides={false}
        centeredSlidesBounds={false}
      >
        {areasData.map((area, index) => (
          <SwiperSlide key={index}>
            <div className="card container">
              <h3>{area.titulo}</h3>
              <p>{area.descricao}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
