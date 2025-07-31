import React, { useState, useEffect } from 'react';
import Homepage from './components/Homepage';
import LoginForm from './components/LoginForm';
import UserArea from './components/UserArea';
import { AuthUser, Movie, Review } from './types/index';
import { supabase } from './supabaseClient';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);
  const [genreMap, setGenreMap] = useState<Map<number, string>>(new Map());

  // Log TMDB API key status
  useEffect(() => {
    console.log('TMDB API KEY:', API_KEY || '❌ MISSING');
    if (!API_KEY) alert('Missing TMDB API Key. App may not work correctly.');
  }, []);

  // Sync Supabase Auth state
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        const u = data.session.user;
        setUser({
          id: u.id,
          email: u.email || '',
          name: u.user_metadata.full_name || u.email?.split('@')[0] || 'User',
          joinDate: new Date(),
        });
      }
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const u = session.user;
        setUser({
          id: u.id,
          email: u.email || '',
          name: u.user_metadata.full_name || u.email?.split('@')[0] || 'User',
          joinDate: new Date(),
        });
      } else {
        setUser(null);
        setReviews([]); // Clear reviews when logged out
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Fetch genres from TMDB API
  useEffect(() => {
    const fetchGenres = async () => {
      if (!API_KEY) return;
      try {
        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
        const data = await res.json();
        const map = new Map<number, string>();
        data.genres.forEach((g: any) => map.set(g.id, g.name));
        setGenreMap(map);
      } catch (err) {
        console.error('❌ Failed to fetch genres:', err);
      }
    };
    fetchGenres();
  }, []);

  // Fetch reviews from Supabase when user logs in
  useEffect(() => {
    if (!user) {
      setReviews([]);
      return;
    }

    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching reviews:', error.message);
        return;
      }

      if (data) {
        setReviews(
          data.map((r) => ({
            id: r.id,
            movieId: r.movie_id,
            rating: r.rating,
            comment: r.comment,
            createdAt: new Date(r.created_at),
            userId: r.user_id,      
            userName: r.user_name,
          }))
        );
      }
    };

    fetchReviews();
  }, [user]);

  // Search movies from TMDB
  const searchMovies = async (query: string) => {
    if (!API_KEY || !query.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      if (data.results?.length > 0) {
        const detailedMovies: Movie[] = await Promise.all(
          data.results.map(async (item: any) => {
            let director = 'Unknown';
            try {
              const creditsRes = await fetch(
                `https://api.themoviedb.org/3/movie/${item.id}/credits?api_key=${API_KEY}`
              );
              const creditsData = await creditsRes.json();
              const directorData = creditsData.crew.find((c: any) => c.job === 'Director');
              if (directorData) director = directorData.name;
            } catch {
              console.warn(`⚠️ Failed to fetch director for movie ${item.id}`);
            }

            const genreNames = item.genre_ids
              .map((id: number) => genreMap.get(id))
              .filter(Boolean)
              .join(', ') || 'Unknown';

            return {
              id: item.id.toString(),
              title: item.title,
              year: item.release_date ? Number(item.release_date.slice(0, 4)) : 0,
              genre: genreNames,
              director,
              poster: item.poster_path
                ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                : 'https://via.placeholder.com/300x450?text=No+Image',
            };
          })
        );
        setMovies(detailedMovies);
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error('❌ Failed to fetch movies:', err);
      setMovies([]);
    } finally {
      setSearching(false);
    }
  };

  // Login
  const handleLogin = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert(`Login failed: ${error.message}`);
    if (data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.user_metadata.full_name || data.user.email?.split('@')[0] || 'User',
        joinDate: new Date(),
      });
      setShowLogin(false);
    }
  };

  // Signup
  const handleSignup = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } }
    });
    if (error) return alert(`Signup failed: ${error.message}`);
    if (data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email || '',
        name,
        joinDate: new Date(),
      });
      setShowLogin(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setReviews([]);
    setMovies([]);
  };

  // Add review and save to Supabase
  const addReview = async (review: Omit<Review, 'id' | 'createdAt'>) => {
    if (!user) {
      alert('You must be logged in to add a review');
      return;
    }

    const newReview = {
      user_id: user.id,
      user_name: user.name,
      movie_id: review.movieId,
      rating: review.rating,
      comment: review.comment,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from('reviews').insert(newReview).select();

    if (error) {
      console.error('❌ Error saving review:', error.message);
      alert('Failed to save review. Please try again.');
      return;
    }

    if (data && data.length > 0) {
      setReviews((prev) => [
        {
          id: data[0].id,
          movieId: data[0].movie_id,
          rating: data[0].rating,
          comment: data[0].comment,
          createdAt: new Date(data[0].created_at),
        } as Review,
        ...prev,
      ]);
    }
  };

  // Render logic
  if (showLogin) {
    return (
      <LoginForm
        onLogin={handleLogin}
        onSignup={handleSignup}
        onClose={() => setShowLogin(false)}
      />
    );
  }

  if (user) {
    return (
      <UserArea
        user={user}
        movies={movies}
        reviews={reviews}
        onAddReview={addReview}
        onLogout={handleLogout}
        onSearch={searchMovies}
        isSearching={searching}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    );
  }

  return (
    <>
      <Homepage onShowLogin={() => setShowLogin(true)} />
      <div style={{ textAlign: 'center', paddingTop: '2rem', color: '#888' }}>
        <p>Loading CineCircle...</p>
      </div>
    </>
  );
}

export default App;
