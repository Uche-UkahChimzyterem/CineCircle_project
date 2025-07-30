import React from 'react';
import { Star, Calendar, Film, TrendingUp, Award } from 'lucide-react';
import { AuthUser, Review, Movie } from '../types';

interface UserReportsProps {
  user: AuthUser;
  reviews: Review[];
  movies: Movie[];
}

const UserReports: React.FC<UserReportsProps> = ({ user, reviews, movies }) => {
  const getMovieById = (id: number) => movies.find(movie => movie.id === id);
  
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const ratingDistribution = [1, 2, 3, 4, 5].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length
  }));

  const genreStats = movies
    .filter(movie => reviews.some(review => review.movieId === movie.id))
    .reduce((acc, movie) => {
      acc[movie.genre] = (acc[movie.genre] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Your Cinema Journey</h1>
        <p className="text-xl text-gray-300">
          Track your reviews, ratings, and movie preferences
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-6 text-center">
          <Film className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white mb-1">{reviews.length}</div>
          <div className="text-gray-400">Reviews Written</div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-sm rounded-2xl border border-yellow-500/30 p-6 text-center">
          <Star className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white mb-1">
            {averageRating.toFixed(1)}
          </div>
          <div className="text-gray-400">Average Rating</div>
        </div>
        
        <div className="bg-gradient-to-br from-teal-600/20 to-green-600/20 backdrop-blur-sm rounded-2xl border border-teal-500/30 p-6 text-center">
          <Calendar className="h-8 w-8 text-teal-400 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white mb-1">
            {Math.ceil((Date.now() - user.joinDate.getTime()) / (1000 * 60 * 60 * 24))}
          </div>
          <div className="text-gray-400">Days Active</div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 backdrop-blur-sm rounded-2xl border border-emerald-500/30 p-6 text-center">
          <Award className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white mb-1">
            {Object.keys(genreStats).length}
          </div>
          <div className="text-gray-400">Genres Explored</div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-indigo-800/50 backdrop-blur-sm rounded-2xl border border-indigo-700 p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-cyan-400" />
          <span>Rating Distribution</span>
        </h2>
        <div className="space-y-4">
          {ratingDistribution.reverse().map(({ rating, count }) => (
            <div key={rating} className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 w-16">
                <span className="text-white font-medium">{rating}</span>
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
              </div>
              <div className="flex-1 bg-slate-700 rounded-full h-6 relative overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-1000"
                  style={{
                    width: reviews.length > 0 ? `${(count / reviews.length) * 100}%` : '0%'
                  }}
                />
              </div>
              <div className="text-gray-400 w-12 text-right">{count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-indigo-800/50 backdrop-blur-sm rounded-2xl border border-indigo-700 p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Your Recent Reviews</h2>
        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <Film className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-400 mb-2">No reviews yet</p>
            <p className="text-gray-500">Start exploring movies and sharing your thoughts!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews
              .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
              .slice(0, 5)
              .map((review) => {
                const movie = getMovieById(review.movieId);
                return (
                  <div key={review.id} className="bg-indigo-700/50 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      {movie && (
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-16 h-24 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold text-white">
                            {movie?.title || 'Unknown Movie'}
                          </h3>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-400'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-300 mb-3">{review.comment}</p>
                        <p className="text-sm text-gray-400">
                          Reviewed on {review.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Genre Preferences */}
      {Object.keys(genreStats).length > 0 && (
        <div className="bg-indigo-800/50 backdrop-blur-sm rounded-2xl border border-indigo-700 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Genre Preferences</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(genreStats)
              .sort(([,a], [,b]) => b - a)
              .map(([genre, count]) => (
                <div key={genre} className="bg-indigo-700/50 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-cyan-400 mb-1">{count}</div>
                  <div className="text-gray-300">{genre}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserReports;