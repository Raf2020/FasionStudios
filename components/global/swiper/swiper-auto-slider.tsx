"use client";

import { useEffect } from "react";
import { useSwiper } from "swiper/react";

const SwiperAutoSlider = ({ slideCount }: { slideCount: number }) => {
  const swiper = useSwiper();

  useEffect(() => {
    const timerInterval = setInterval(() => {
      swiper.slideTo((swiper.activeIndex + 1) % slideCount);
    }, 5000);
    return () => {
      clearInterval(timerInterval);
    };
  }, [slideCount]);

  return <></>;
};

export default SwiperAutoSlider;
