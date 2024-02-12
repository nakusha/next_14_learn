import { Suspense } from "react";

import MovieInfo, { getMovieDetail } from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";

interface IParams {
  params: { id: string };
}
export async function generateMetadata({ params: { id } }: IParams) {
  const movie = await getMovieDetail(id);
  return { title: movie.title };
}

export default function MovieDetail({ params: { id } }: IParams) {
  // 병렬실행 둘다 다될때까지 기다려야함
  // const [movie, videos] = await Promise.all([
  //   getMovieDetail(id),
  //   getVideos(id),
  // ]);

  return (
    <div>
      <Suspense fallback={<h1>Loading Movie Info</h1>}>
        <MovieInfo id={id} />
      </Suspense>

      <Suspense fallback={<h1>Loading Movie Videos</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}
