import { useEffect, useState } from 'react';
import { fetchMovies } from '../../api/movies-api';
import css from './HomePage.module.css';
import { Link, useLocation } from 'react-router-dom';

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const result = await fetchMovies();
        setMovies(result.results);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Trending today</h1>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Error</h1>}
      {movies && (
        <ul>
          {movies.map((el) => (
            <li key={el.id}>
              <Link to={`/movie/${el.id}`} state={{ from: location }}>
                {el.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
