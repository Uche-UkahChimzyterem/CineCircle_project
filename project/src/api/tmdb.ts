const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

/**
 * Search for movies using TMDb API
 * @param query The search term (title, genre, etc.)
 */
export const searchMovies = async (query: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};
