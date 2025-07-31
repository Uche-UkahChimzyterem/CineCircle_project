import React, { useState } from 'react';
import { Search, Film } from 'lucide-react';
import { Movie } from '../types';

interface MovieSearchProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
  onSearch: (query: string) => Promise<void>;
  isSearching: boolean;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const MovieSearch: React.FC<MovieSearchProps> = ({
  movies,
  onMovieSelect,
  onSearch,
  isSearching,
  searchTerm,
  setSearchTerm
}) => {
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    if (searchTerm.trim()) {
      await onSearch(searchTerm);
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to Your Cinema Hub
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Search for movies, read reviews, and share your thoughts with the community.
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-indigo-800/50 backdrop-blur-sm rounded-2xl border border-indigo-700 p-8">
        <form onSubmit={handleSearch} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-white mb-4">
              Search for Movies
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-indigo-700/50 border border-indigo-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-lg"
                placeholder="Enter movie title..."
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? 'Searching...' : 'Search Movies'}
          </button>
        </form>
      </div>

      {/* Search Results */}
      {hasSearched && (
        <div className="bg-indigo-800/50 backdrop-blur-sm rounded-2xl border border-indigo-700 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Search Results</h2>

          {isSearching ? (
            <p className="text-white text-center">Loading...</p>
          ) : movies.length === 0 ? (
            <div className="text-center py-12">
              <Film className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-red-400 font-semibold mb-2">No results.</p>
              <p className="text-gray-400">Try a different movie title.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => onMovieSelect(movie)}
                  className="bg-indigo-700/50 rounded-xl p-6 cursor-pointer hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 border border-indigo-600 hover:border-cyan-500"
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-white mb-2">{movie.title}</h3>
                  <div className="space-y-1 text-sm text-gray-400">
                    <p>
                      <span className="font-medium">Year:</span> {movie.year}
                    </p>
                    <p>
                      <span className="font-medium">Genre:</span> {movie.genre}
                    </p>
                    <p>
                      <span className="font-medium">Director:</span> {movie.director}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
