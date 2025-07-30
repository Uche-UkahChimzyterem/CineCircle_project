import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import { Movie } from '../types';

interface ReviewFormProps {
  movie: Movie;
  onSubmit: (rating: number, comment: string) => void;
  onClose: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ movie, onSubmit, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && comment.trim()) {
      onSubmit(rating, comment);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-indigo-800/95 backdrop-blur-sm rounded-2xl border border-indigo-700 shadow-2xl w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Write a Review</h2>
          
          {/* Movie Info */}
          <div className="flex items-center space-x-4 mb-8 p-4 bg-indigo-700/50 rounded-xl">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-16 h-24 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
              <p className="text-gray-400">{movie.year} • {movie.genre}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-lg font-semibold text-white mb-4">
                Your Rating
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoveredRating || rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-cyan-400 mt-2 font-medium">
                  {rating} out of 5 stars
                </p>
              )}
            </div>

            {/* Comment */}
            <div>
              <label className="block text-lg font-semibold text-white mb-4">
                Your Review
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full h-32 px-4 py-3 bg-indigo-700/50 border border-indigo-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                placeholder="Share your thoughts about this movie..."
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-indigo-700 hover:bg-indigo-600 text-white py-3 rounded-xl font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={rating === 0 || !comment.trim()}
                className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;