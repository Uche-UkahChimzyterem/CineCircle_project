export interface AuthUser {
  id: string;
  email: string;
  name: string;
  joinDate: Date;
}

export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  director: string;
  poster: string;
}

export interface Review {
  id: string;
  movieId: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}