import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import XMarkIco from '../../public/images/x-mark.svg';
import TickIco from '../../public/images/tick.svg';
import BookIco from '../../public/images/book.svg';
import FilmIco from '../../public/images/film.svg';

import { useState } from 'react';
import Slider from 'react-slick';

export default function Processing() {
  const [resultIcon, setResultIcon] = useState<null | JSX.Element>(null);
  const CAROUSEL_ITEMS = 8;
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
    beforeChange: () => {
      setResultIcon(null);
    },
    afterChange: () => {
      const newIcon =
        Math.random() > 0.5 ? (
          <TickIco className="w-14 h-14 fill-current text-gray-200" />
        ) : (
          <XMarkIco className="w-14 h-14 fill-current text-gray-200" />
        );
      setResultIcon(newIcon);
    },
  };
  const carouselItems = [];

  for (let i = 0; i < CAROUSEL_ITEMS; i++) {
    const MainIcon = i % 2 ? BookIco : FilmIco;

    carouselItems.push(
      <div key={`{i}`} className="flex justify-center">
        <MainIcon className="w-12 h-12 fill-current opacity-80 text-cyan-900" />
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
      <div className="absolute flex items-center justify-center w-24 h-24 rounded-full bg-cyan-900 -translate-y-1">
        {resultIcon}
      </div>
    </>
  );
}
