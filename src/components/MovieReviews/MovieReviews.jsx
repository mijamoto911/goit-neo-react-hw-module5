import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews } from '../../api/movies-api';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchReviews(movieId);
        setMovieReviews(result.results);
      } catch (error) {
        console.log(error);
        setError('Failed to fetch reviews. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    getReviews();
  }, [movieId]);

  const highlightImportantEvents = (content) => {
    return content.replace(
      /(great|amazing|worst|highlight)/gi,
      `<strong>$1</strong>`
    );
  };

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      {movieReviews && movieReviews.length > 0 ? (
        <ul>
          {movieReviews.map((review) => (
            <li key={review.id} className={css.reviewItem}>
              <p className={css.author}>
                <strong>Author:</strong> {review.author}
              </p>
              <p className={css.content}>
                <strong className={css.highlight}>Review:</strong>{' '}
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightImportantEvents(review.content),
                  }}
                />
              </p>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && <h2>We don't have reviews for this movie</h2>
      )}
    </div>
  );
};

export default MovieReviews;
