import { useState, useEffect } from 'react';
import { searchMovies } from '../../api/movies-api';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('title') ?? '');

  const handleChange = ({ target: { value } }) => {
    setQuery(value);
  };

  useEffect(() => {
    const queryValue = params.get('title') ?? '';
    if (!queryValue) {
      return;
    }

    const getMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const result = await searchMovies(queryValue);
        setMovies(result.results);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, [params]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setParams({ title: query.trim() });
    }
    setQuery('');
  };

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Oops... Something went wrong</h1>}
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search movies"
          value={query}
          onChange={handleChange}
          className={css.input}
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
      {movies && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
