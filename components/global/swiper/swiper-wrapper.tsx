import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper } from "swiper/react";
import type {
    NavigationOptions,
    PaginationOptions,
    ScrollbarOptions,
    SwiperOptions,
    SwiperModule,
} from "swiper/types";
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
    navigation?: boolean | NavigationOptions;
    pagination?: boolean | PaginationOptions;
    scrollbar?: boolean | ScrollbarOptions;
    className?: string;
    breakpoints?: SwiperOptions["breakpoints"];
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
                           className = "",
                       }: SwiperWrapperProps) => (
    <Swiper
        className={`w-full ${className}`}
        modules={[Navigation, Pagination, Scrollbar, A11y] as SwiperModule[]}
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