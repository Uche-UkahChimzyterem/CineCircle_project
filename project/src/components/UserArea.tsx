import React, { useState } from 'react';
import { LogOut, Search, Star, Film, User, Calendar, TrendingUp } from 'lucide-react';
import MovieSearch from './MovieSearch';
import ReviewForm from './ReviewForm';
import UserReports from './UserReports';
import { AuthUser, Movie, Review } from '../types';

interface UserAreaProps {
  user: AuthUser;
  movies: Movie[];
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  onLogout: () => void;
}

const UserArea: React.FC<UserAreaProps> = ({ user, movies, reviews, onAddReview, onLogout }) => {
  const [currentView, setCurrentView] = useState<'search' | 'review' | 'reports'>('search');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setCurrentView('review');
  };

  const handleReviewSubmit = (rating: number, comment: string) => {
    if (selectedMovie) {
      onAddReview({
        movieId: selectedMovie.id,
        userId: user.id,
        userName: user.name,
        rating,
        comment
      });
      setSuccessMessage('Review submitted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setShowReviewForm(false);
    }
  };

  const userReviews = reviews.filter(review => review.userId === user.id);
  const movieReviews = selectedMovie ? reviews.filter(review => review.movieId === selectedMovie.id) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-teal-900">
      {/* Header */}
      <header className="bg-indigo-900/90 backdrop-blur-sm border-b border-indigo-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Film className="h-8 w-8 text-cyan-400" />
              <span className="text-2xl font-bold text-white">CineCircle</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-300">
                <User className="h-5 w-5" />
                <span className="font-medium">{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-indigo-800/50 border-b border-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setCurrentView('search')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                currentView === 'search'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Search Movies</span>
              </div>
            </button>
            <button
              onClick={() => setCurrentView('reports')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                currentView === 'reports'
                ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>My Reports</span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Success Message */}
      {successMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-green-600/20 border border-green-500 text-green-400 px-4 py-3 rounded-lg">
            {successMessage}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'search' && (
          <MovieSearch movies={movies} onMovieSelect={handleMovieSelect} />
        )}

        {currentView === 'review' && selectedMovie && (
          <div className="space-y-8">
            {/* Movie Details */}
            <div className="bg-indigo-800/50 backdrop-blur-sm rounded-2xl border border-indigo-700 p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <img
                  src={selectedMovie.poster}
                  alt={selectedMovie.title}
                  className="w-full md:w-64 h-96 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-4">{selectedMovie.title}</h1>
                  <div className="space-y-2 text-gray-300 mb-6">
                    <p><span className="font-semibold">Year:</span> {selectedMovie.year}</p>
                    <p><span className="font-semibold">Genre:</span> {selectedMovie.genre}</p>
                    <p><span className="font-semibold">Director:</span> {selectedMovie.director}</p>
                  </div>
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Write Review
                  </button>
                </div>
              </div>
            </div>

            {/* Review Form Modal */}
            {showReviewForm && (
              <ReviewForm
                movie={selectedMovie}
                onSubmit={handleReviewSubmit}
                onClose={() => setShowReviewForm(false)}
              />
            )}

            {/* Existing Reviews */}
            <div className="bg-indigo-800/50 backdrop-blur-sm rounded-2xl border border-indigo-700 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Reviews</h2>
              {movieReviews.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  No reviews yet. Be the first to review this movie!
                </p>
              ) : (
                <div className="space-y-6">
                  {movieReviews.map((review) => (
                    <div key={review.id} className="bg-indigo-700/50 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">{review.userName}</p>
                            <p className="text-sm text-gray-400">
                              {review.createdAt.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-400'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {currentView === 'reports' && (
          <UserReports user={user} reviews={userReviews} movies={movies} />
        )}
      </main>
    </div>
  );
};

export default UserArea;