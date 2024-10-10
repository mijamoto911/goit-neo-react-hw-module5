import { useEffect, useState } from 'react';
import { fetchMovies } from '../../api/movies-api';
import css from './HomePage.module.css';
import MovieList from '../../components/MovieList/MovieList.jsx';

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

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
      {movies && <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
