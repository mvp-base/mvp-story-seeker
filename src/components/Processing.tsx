import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import searchIco from '../../public/images/search.svg';
import xMarkIco from '../../public/images/x-mark.svg';
import tickIco from '../../public/images/tick.svg';
import bookIco from '../../public/images/book.svg';
import filmIco from '../../public/images/film.svg';

import Image from 'next/image';
import Slider from 'react-slick';

export default function Processing() {
  const CAROUSEL_ITEMS = 6;
  const CAROUSEL_SETTINGS = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };
  const carouselItems = [];

  for (let i = 0; i < CAROUSEL_ITEMS; i++) {
    const mainIco = i % 2 ? bookIco : filmIco;
    const secondaryIco = Math.random() < 0.5 ? tickIco : xMarkIco;

    carouselItems.push(
      <Image aria-hidden src={mainIco} alt="Main Icon" width={36} height={36} />
    );
    carouselItems.push(
      <Image
        aria-hidden
        src={secondaryIco}
        alt="Secondary Icon"
        width={36}
        height={36}
      />
    );
  }

  return (
    <div className="relative w-[250px]">
      <Slider {...CAROUSEL_SETTINGS}>
        {carouselItems.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </Slider>     
    </div>
  );
}
