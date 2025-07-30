import React, { useState, useEffect } from 'react';
import { User, Search, Star, Film, LogOut, Menu, X } from 'lucide-react';
import Homepage from './components/Homepage';
import LoginForm from './components/LoginForm';
import UserArea from './components/UserArea';
import { AuthUser, Movie, Review } from './types';

function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Initialize sample data
  useEffect(() => {
    const sampleMovies: Movie[] = [
      {
        id: 1,
        title: "Avatar: The Way of Water",
        year: 2022,
        genre: "Sci-Fi",
        director: "James Cameron",
        poster: "https://images.pexels.com/photos/8263628/pexels-photo-8263628.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 2,
        title: "Top Gun: Maverick",
        year: 2022,
        genre: "Action",
        director: "Joseph Kosinski",
        poster: "https://images.pexels.com/photos/7991471/pexels-photo-7991471.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 3,
        title: "Black Panther: Wakanda Forever",
        year: 2022,
        genre: "Action",
        director: "Ryan Coogler",
        poster: "https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 4,
        title: "Spider-Man: No Way Home",
        year: 2021,
        genre: "Action",
        director: "Jon Watts",
        poster: "https://images.pexels.com/photos/7991688/pexels-photo-7991688.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 5,
        title: "Dune",
        year: 2021,
        genre: "Sci-Fi",
        director: "Denis Villeneuve",
        poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 6,
        title: "The Batman",
        year: 2022,
        genre: "Action",
        director: "Matt Reeves",
        poster: "https://images.pexels.com/photos/8263628/pexels-photo-8263628.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 7,
        title: "Doctor Strange in the Multiverse of Madness",
        year: 2022,
        genre: "Action",
        director: "Sam Raimi",
        poster: "https://images.pexels.com/photos/7991471/pexels-photo-7991471.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 8,
        title: "Minions: The Rise of Gru",
        year: 2022,
        genre: "Animation",
        director: "Kyle Balda",
        poster: "https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 9,
        title: "Thor: Love and Thunder",
        year: 2022,
        genre: "Action",
        director: "Taika Waititi",
        poster: "https://images.pexels.com/photos/7991688/pexels-photo-7991688.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 10,
        title: "Jurassic World Dominion",
        year: 2022,
        genre: "Action",
        director: "Colin Trevorrow",
        poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 11,
        title: "Lightyear",
        year: 2022,
        genre: "Animation",
        director: "Angus MacLane",
        poster: "https://images.pexels.com/photos/8263628/pexels-photo-8263628.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 12,
        title: "Nope",
        year: 2022,
        genre: "Horror",
        director: "Jordan Peele",
        poster: "https://images.pexels.com/photos/7991471/pexels-photo-7991471.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 13,
        title: "Bullet Train",
        year: 2022,
        genre: "Action",
        director: "David Leitch",
        poster: "https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 14,
        title: "Elvis",
        year: 2022,
        genre: "Drama",
        director: "Baz Luhrmann",
        poster: "https://images.pexels.com/photos/7991688/pexels-photo-7991688.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 15,
        title: "Everything Everywhere All at Once",
        year: 2022,
        genre: "Sci-Fi",
        director: "Daniels",
        poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 16,
        title: "The Northman",
        year: 2022,
        genre: "Action",
        director: "Robert Eggers",
        poster: "https://images.pexels.com/photos/8263628/pexels-photo-8263628.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 17,
        title: "Morbius",
        year: 2022,
        genre: "Action",
        director: "Daniel Espinosa",
        poster: "https://images.pexels.com/photos/7991471/pexels-photo-7991471.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 18,
        title: "Sonic the Hedgehog 2",
        year: 2022,
        genre: "Adventure",
        director: "Jeff Fowler",
        poster: "https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 19,
        title: "The Bad Guys",
        year: 2022,
        genre: "Animation",
        director: "Pierre Perifel",
        poster: "https://images.pexels.com/photos/7991688/pexels-photo-7991688.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 20,
        title: "Fantastic Beasts: The Secrets of Dumbledore",
        year: 2022,
        genre: "Fantasy",
        director: "David Yates",
        poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400"
      }
    ];
    setMovies(sampleMovies);
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Simulate login
    const newUser: AuthUser = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0],
      joinDate: new Date()
    };
    setUser(newUser);
    setShowLogin(false);
  };

  const handleSignup = (email: string, password: string, name: string) => {
    // Simulate signup
    const newUser: AuthUser = {
      id: Date.now().toString(),
      email,
      name,
      joinDate: new Date()
    };
    setUser(newUser);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    setReviews([]);
  };

  const addReview = (review: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setReviews(prev => [...prev, newReview]);
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
      />
    );
  }

  return (
    <Homepage onShowLogin={() => setShowLogin(true)} />
  );
}

export default App;