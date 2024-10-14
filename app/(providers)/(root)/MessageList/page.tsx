"use client";

// import React from "react";

// function MessageList() {
// 	return <div>page</div>;
// }

// export default MessageList;

import { Autoplay, Mousewheel, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const photos_b = [
	"https://images.pexels.com/photos/3533228/pexels-photo-3533228.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	"https://images.pexels.com/photos/5010780/pexels-photo-5010780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	"https://images.pexels.com/photos/3405555/pexels-photo-3405555.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	"https://images.pexels.com/photos/4029925/pexels-photo-4029925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	"https://images.pexels.com/photos/4298629/pexels-photo-4298629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	"https://images.pexels.com/photos/5372800/pexels-photo-5372800.jpeg?auto=compress&cs=tinysrgb&w=1600",
];

export default function () {
	return (
		<section className="pt-[7rem] pb-[2rem] bg-rose-100">
			<div className="xl:mx-auto max-w-6xl mx-[1.5rem]">
				<h1 className="text-[3rem] font-bold mb-[2rem] text-center">
					BreakPoint + Mousewheel + Autoplay
				</h1>
				<Swiper
					modules={[Scrollbar, Mousewheel, Autoplay]}
					loop={true}
					pagination={{ clickable: true }}
					centeredSlides={true}
					grabCursor={true}
					scrollbar={{ draggable: true }}
					mousewheel={{
						invert: false,
					}}
					autoplay={{
						delay: 5000,
						stopOnLastSlide: false,
						disableOnInteraction: false,
					}}
					breakpoints={{
						0: {
							spaceBetween: 10,
							slidesPerView: 1,
						},
						468: {
							spaceBetween: 10,
							slidesPerView: 2,
						},
						768: {
							spaceBetween: 15,
							slidesPerView: 3,
						},
						1024: {
							spaceBetween: 15,
							slidesPerView: 4,
						},
						1280: {
							spaceBetween: 30,
							slidesPerView: 5,
						},
					}}
					className="breakpoint"
				>
					<div className="bg-black">
						{photos_b.map((p, index) => {
							return (
								<SwiperSlide key={index}>
									<img className="" src={p} alt="" />
								</SwiperSlide>
							);
						})}
					</div>
				</Swiper>
			</div>
		</section>
	);
}
