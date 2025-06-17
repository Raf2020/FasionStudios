import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

type SwiperWrapperProps = {
  children: React.ReactNode;
  slidesPerView: number;
  slidesPerGroup?: number;
  spaceBetween?: number;
  loop?: boolean;
  navigation?: any;
  pagination?: any;
  scrollbar?: any;
  className?: any
};

const SwiperWrapper = ({
                         children,
                         slidesPerView,
                         slidesPerGroup,
                         spaceBetween,
                         loop,
                         scrollbar = { draggable: true, snapOnRelease: true, hide: true },
                         pagination = false,
                         navigation = false,
                         breakpoints = {},
                         className
                       }: SwiperWrapperProps & { breakpoints?: any }) => (
    <Swiper
        className={`w-full ${className}`}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerGroup}
        spaceBetween={spaceBetween}
        loop={loop}
        navigation={navigation}
        pagination={pagination}
        scrollbar={scrollbar}
        breakpoints={breakpoints}
    >
      {children}
    </Swiper>
);

export default SwiperWrapper;
