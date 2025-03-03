import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

type SwiperWrapperProps = {
  children: React.ReactNode;
  slidesPerView: number;
};

const SwiperWrapper = ({ children, slidesPerView }: SwiperWrapperProps) => (
  <Swiper
    className="w-full"
    modules={[Navigation, Pagination, Scrollbar, A11y]}
    slidesPerView={slidesPerView}
    navigation
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true, snapOnRelease: true, hide: true }}
  >
    {children}
  </Swiper>
);

export default SwiperWrapper;
