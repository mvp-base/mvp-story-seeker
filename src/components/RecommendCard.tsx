import Image from "next/image";
import { useState } from "react";

interface IBookRecommendation {
  name: string;
  coverImage: string;
  link: string;
  shortDesc: string;
  plot: string;
  genre: string;
  rating: string;
  author: string;
  ISBN: string;
  pageCount: string;
}

interface IMovieRecommendation {
  name: string;
  coverImage: string;
  link: string;
  shortDesc: string;
  plot: string;
  genre: string;
  rating: string;
  director: string;
  boxOffice: string;
  runtime: string;
}

type IRecommendation = IMovieRecommendation | IBookRecommendation;

export function RecommendCard(props: IRecommendation) {
const [imgSrc, setImgSrc] = useState(props.coverImage)

  return (
    <>
      <div className="relative w-[250px] h-[300px]">
        <div
          className={`absolute inset-0 bg-black border-4 border-black translate-x-1 translate-y-1`}
        ></div>

        <div
          className={`absolute inset-0 bg-yellow-400 border-4 border-black `}
        >
          <h3 className="text-xl">{props.name}</h3>
          <Image src={imgSrc} alt="Cover image" width={100} height={100} onError={() => setImgSrc('/images/default_book_cover.png')}/>
          <h3 className="text-xl">{props.shortDesc}</h3>
          <h3 className="text-xl">{props.genre}</h3>
          <h3 className="text-xl">{props.rating}</h3>
          {/* <h3 className="text-xl">{props.ISBN}</h3> */}
          {/* <h3 className="text-xl">{props.pageCount}</h3> */}
        </div>
      </div>
    </>
  );
}
