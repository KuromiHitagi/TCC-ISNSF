import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import areasData from "../form/areas.json";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./carrossel.scss";

export default function CursosCarousel({ areas }) {
  const [filteredAreas, setFilteredAreas] = useState([]);

  useEffect(() => {
    if (areas && areas.length > 0) {
      const filtered = areas.map(area => ({
        titulo: area,
        descricao: areasData[area] || 'Descrição não disponível.'
      }));
      setFilteredAreas(filtered);
    }
  }, [areas]);

  if (filteredAreas.length === 0) {
    return <div>Carregando áreas...</div>;
  }

  return (
    <motion.section
      className="cursos"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
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
        {filteredAreas.map((area, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="card container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3>{area.titulo}</h3>
              <p>{area.descricao}</p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
}
