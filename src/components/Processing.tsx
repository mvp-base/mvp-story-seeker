import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import XMarkIco from '../../public/images/x-mark.svg';
import TickIco from '../../public/images/tick.svg';
import BookIco from '../../public/images/book.svg';
import FilmIco from '../../public/images/film.svg';

import { useState } from 'react';
import Slider from 'react-slick';

export default function Processing() {
  const [currentMidle, setCurrentMiddle] = useState(3);
  const CAROUSEL_ITEMS = 7;
  const CAROUSEL_ITEMS_SHOW = 7;
  const CAROUSEL_SETTINGS = {
    dots: false,
    arrows: false,
    pauseOnHover: false,
    draggable: false,
    swipe: false,
    infinite: true,
    speed: 600,
    slidesToShow: CAROUSEL_ITEMS_SHOW,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    beforeChange: (current: number, next: number) => {
      setCurrentMiddle(
        (next + Math.floor(CAROUSEL_ITEMS_SHOW / 2)) % CAROUSEL_ITEMS
      );
    },
  };
  const carouselItems = [];

  for (let i = 0; i < CAROUSEL_ITEMS; i++) {
    const MainIcon = i % 2 ? BookIco : FilmIco;

    const isMiddle = currentMidle === i;

    carouselItems.push(
      <div key={`main-${i}`} className="flex justify-center">
        <MainIcon
          className={`w-12 h-12 fill-current ${
            isMiddle ? 'text-gray-200' : 'text-cyan-900'
          } `}
        />
      </div>
    );
  }

  return (
    <>
      <div className="relative flex flex-col w-[600px]">
        <Slider {...CAROUSEL_SETTINGS}>
          {carouselItems.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </Slider>
      </div>
      <div className="absolute w-24 h-24 rounded-full opacity-80 bg-cyan-900 -translate-y-1 -z-10"></div>
    </>
  );
}
