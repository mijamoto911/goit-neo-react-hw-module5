import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCast } from '../../api/movies-api';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchCast(movieId);
        setMovieCast(result.cast);
      } catch (error) {
        console.log(error);
        setError('Failed to fetch cast. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    getCast();
  }, [movieId]);

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      {movieCast && (
        <ul className={css.movieCastDetails}>
          {movieCast.map((actor) => (
            <li key={actor.cast_id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
              <p className={css.actorName}>{actor.name}</p>
              <p className={css.actorCharacter}>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
