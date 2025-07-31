````markdown
# Cinecircle

Cinecircle is a sleek movie review and rating web application that gives users the ability to discover, search, review, and rate movies. While everyone can access the homepage, users must sign up or log in to search for movies, write reviews, leave star ratings, and view their review history.

Now when you search for movies like "Avatar", "Spider-Man", "Batman", "Dune", or any other popular film, you'll find them in the database. The search works by title, director, or genre, so you can search broadly (like "Action" or "Sci-Fi") or specifically by movie name.

---

## Overview

Cinecircle provides a simple, elegant way to manage and engage with movie content. It is designed for movie lovers to share their opinions, keep track of what they've watched, and rate films based on personal experiences.

---

## Features

- Home, About, Contact Pages  
  Static pages for public visitors to explore the platform.

- User Authentication  
  Secure signup and login system for movie enthusiasts.

- Movie Search System  
  Logged-in users can search for movies and access detailed info.

- Star Rating & Reviews  
  Users can leave detailed reviews and star-based ratings.

- User Dashboard  
  Logged-in users can view their past reviews and activity.

- Conditional Rendering  
  Once logged in, the homepage hides and movie features take over.

- Responsive Design  
  Fully optimized for mobile, tablet, and desktop screens.

---

### Frontend

- Framework: React + Vite  
- Language: TypeScript  
- Styling: Tailwind CSS  
- Icons: Lucide React  
- State Management: React Hooks  

---

## Backend

- Authentication and user management powered by [Supabase Auth](https://supabase.com/docs/guides/auth)  
- PostgreSQL database with RLS (Row Level Security) policies for secure data access  
- Reviews and user data stored in Supabase tables  
- Email verification enabled for secure signup  

---

## Environment Variables

Create a `.env` file in the project root and add the following variables:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-anon-public-api-key
VITE_TMDB_API_KEY=your-tmdb-api-key
````

Replace the placeholders with your actual API keys.

> **Note:** Keep your `.env` file private and do **not** commit it to your repository.

---

## Email Verification

New users will receive a confirmation email upon signup. They must verify their email before they can log in and access all features.

---

## Deployed Project

The live version of Cinecircle is hosted on Vercel and accessible here:
👉 [https://cinecircle.vercel.app](https://cinecircle.vercel.app) *(Replace with actual link after deploy)*

---

### Navigate into the project

```bash
cd Cinecircle/project
```

### Install Dependencies

```bash
npm install
```

### ▶ Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

---

## 👤 Usage

* **View as Guest:** You can access Home, About, and Contact pages.
* **Sign Up / Log In:** Required to search for movies and add reviews.
* **Search & Review:** Logged-in users can search, review, and rate movies.
* **Dashboard View:** Users can revisit and manage their review history.

---

## FAQ / Troubleshooting

* **Q: I signed up but can't log in.**
  A: Check your email for a verification link and confirm your email address.

* **Q: How do I reset my password?**
  A: Use the forgot password feature (if implemented) or contact support.

---

## Contributing

Contributions are welcome!
Fork this repo, make improvements, and submit a pull request with changes you'd like to see.

---

## Contact Information

For questions, suggestions, or feedback, feel free to contact:
[uche-ukah.chimzyterem@gmail.com](mailto:uche-ukah.chimzyterem@gmail.com)

---

## License

This project is licensed under the **MIT License**.
See the `LICENSE` file for more details.

```

