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

  // Sync Supabase Auth state on mount
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
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Fetch genres from TMDB API
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
        const data = await res.json();
        const map = new Map<number, string>();
        data.genres.forEach((g: any) => map.set(g.id, g.name));
        setGenreMap(map);
      } catch (err) {
        console.error('Failed to fetch genres:', err);
      }
    };
    fetchGenres();
  }, []);

  // Search movies
  const searchMovies = async (query: string) => {
    if (!query.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      if (data.results && data.results.length > 0) {
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
              console.warn(`Failed to fetch director for movie ${item.id}`);
            }

            const genreNames = item.genre_ids
              .map((id: number) => genreMap.get(id))
              .filter((g) => g)
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
            } as Movie;
          })
        );
        setMovies(detailedMovies);
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error('Failed to fetch movies:', err);
      setMovies([]);
    } finally {
      setSearching(false);
    }
  };

  // Supabase login
  const handleLogin = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(`Login failed: ${error.message}`);
      return;
    }
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

  // Supabase signup
  const handleSignup = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } }
    });
    if (error) {
      alert(`Signup failed: ${error.message}`);
      return;
    }
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

  // Supabase logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setReviews([]);
    setMovies([]);
  };

  // Add review (local only)
  const addReview = (review: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setReviews((prev) => [...prev, newReview]);
  };

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

  return <Homepage onShowLogin={() => setShowLogin(true)} />;
}

export default App;
