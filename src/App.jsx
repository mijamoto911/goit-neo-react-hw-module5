import { Routes, Route } from 'react-router-dom';
import css from './App.module.css';
import { lazy, Suspense } from 'react';

const Navigation = lazy(() => import('./components/Navigation/Navigation'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('./components/MovieReviews/MovieReviews')
);
const App = () => {
  return (
    <div className={css.container}>
      <Navigation />
      <Suspense fallback={<h1>LOADING COMPONENT...</h1>}>
        <hr />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie" element={<MoviesPage />} />
          <Route path="/movie/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<h2>Oops..404</h2>} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
