import { useEffect, useState } from 'react';
import {
  useParams,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { fetchMovieInfo } from '../../api/movies-api';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const backPath = location.state?.from ?? '/';

  useEffect(() => {
    const getMovie = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchMovieInfo(movieId);
        setMovie(result);
      } catch (error) {
        console.log(error);
        setError('Failed to fetch movie. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    getMovie();
  }, [movieId]);

  return (
    movie && (
      <div>
        <button onClick={() => navigate(backPath)} className={css.btn}>
          Go back
        </button>
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>{error}</h1>}
        <ul className={css.movieDetails}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.original_title}
            width={300}
          />
          <div className={css.details}>
            <li className={css.title}>
              {movie.original_title} (
              {new Date(movie.release_date).getFullYear()})
            </li>
            <li>
              <span className={css.userScore}>User score: </span>
              {Math.round(movie.vote_average * 10)}%
            </li>

            <li>
              <span className={css.overview}>Overview </span>
              <br />
              {movie.overview}
            </li>
            <li>
              <span className={css.genres}>Genres </span>
              <br />
              {movie.genres.map((genre) => genre.name).join(', ')}
            </li>
          </div>
        </ul>
        <hr />
        <ul>
          <li>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
          <hr />
        </ul>
        <Outlet />
      </div>
    )
  );
};

export default MovieDetailsPage;
