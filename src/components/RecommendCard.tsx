import Image from 'next/image';
import { useState } from 'react';

import { IBookRecommendation, IMovieRecommendation } from '@/utils/types';

type IRecommendation = IMovieRecommendation | IBookRecommendation;

export function RecommendCard(props: IRecommendation) {
  const [imgSrc, setImgSrc] = useState(props.coverImage);

  return (
    <>
      <div className="relative w-[250px] h-[300px]">
        <div
          className={`absolute inset-0 bg-black border-4 border-black translate-x-1 translate-y-1`}
        />

        <div
          className={`flex flex-col absolute inset-0 bg-yellow-400 border-4 border-black `}
        >
          <div className="relative h-[40%]">
            <Image
              src={imgSrc}
              alt="Cover image"
              layout="fill"
              objectFit="cover"
              onError={() => setImgSrc('/images/default_book_cover.png')}
            />
          </div>
          <div className="flex flex-col flex-grow m-2">
            <p className="text-xl">{props.name}</p>
            <p className="text-xs">{props.shortDesc}</p>
          </div>
          <div className="flex flex-row justify-end m-2 gap-4">
            <p className="text-l">{props.rating}</p>
            <p className="text-l">{props.genre}</p>
          </div>
          {/* <h3 className="text-xl">{props.ISBN}</h3>
          <h3 className="text-xl">{props.pageCount}</h3> */}
        </div>
      </div>
    </>
  );
}
