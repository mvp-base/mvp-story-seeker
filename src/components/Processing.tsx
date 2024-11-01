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
    autoplaySpeed: 1000,
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
        <MainIcon className="absolute w-12 h-12 fill-current text-black opacity-20 translate-x-1 translate-y-1" />
        <MainIcon className="relative w-12 h-12 fill-current opacity-100 text-cyan-800" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col flex-grow justify-center w-[800px]">
        <Slider {...CAROUSEL_SETTINGS}>
          {carouselItems.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </Slider>
      </div>
      <div className="absolute flex flex-col w-24 h-24">
        <div className="flex absolute inset-0 items-center justify-center bg-cyan-800 border-4 border-cyan-800 z-10">
        {resultIcon}
        </div>
        <div className="absolute inset-0 bg-black border-4 border-black translate-x-1 translate-y-1" />
      </div>
    </>
  );
}
