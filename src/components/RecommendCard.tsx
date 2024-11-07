import Image from 'next/image';
import { useState } from 'react';

import Badge from './Badge';

import { IBookRecommendation, IMovieRecommendation } from '@/utils/types';

type IRecommendation = IMovieRecommendation | IBookRecommendation;

export function RecommendCard(props: IRecommendation) {
  const [imgSrc, setImgSrc] = useState(props.coverImage);

  const genreArray = props.genre.split(',').map(genre => genre.trim());


  return (
    <>
      <div className="relative w-[250px] h-[300px]">
        <div className="absolute inset-0 bg-black border-4 border-black translate-x-1 translate-y-1" />

        <div className="flex flex-col absolute inset-0 bg-yellow-400 border-4 border-black">
          <div className="relative h-[120px] overflow-hidden">
            <Image
              src={imgSrc}
              alt="Cover image"
              layout="fill"
              objectFit="cover"
              onError={() => setImgSrc('/images/default_book_cover.png')}
            />
          </div>

          <div className="flex flex-col flex-grow m-2">
            <p className="text-lg line-clamp-2">{props.name}</p>
            <p className="text-xs line-clamp-4">{props.shortDesc}</p>
          </div>

          <div className="flex flex-row m-2 gap-2">
            <Badge text={props.rating} />
            {genreArray.map((genre, index) => (
              <Badge key={index} text={genre} />
            ))}

          </div>
        </div>
      </div>
    </>
  );
}
