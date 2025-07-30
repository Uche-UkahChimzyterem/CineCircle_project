

```markdown
# Cinecircle

**Cinecircle** is a sleek movie review and rating web application that gives users the ability to discover, search, review, and rate movies. While everyone can access the homepage, users must sign up or log in to search for movies, write reviews, leave star ratings, and view their review history.

---

## Overview

Cinecircle provides a simple, elegant way to manage and engage with movie content. It is designed for movie lovers to share their opinions, keep track of what they've watched, and rate films based on personal experiences.

---

## Features

- **Home, About, Contact Pages**  
  Static pages for public visitors to explore the platform.

- **User Authentication**  
  Secure signup and login system for movie enthusiasts.

- **Movie Search System**  
  Logged-in users can search for movies and access detailed info.

- **Star Rating & Reviews**  
  Users can leave detailed reviews and star-based ratings.

- **User Dashboard**  
  Logged-in users can view their past reviews and activity.

- **Conditional Rendering**  
  Once logged in, the homepage hides and movie features take over.

- **Responsive Design**  
  Fully optimized for mobile, tablet, and desktop screens.

---

## Technologies Used

### 🔹 Frontend
- **Framework**: React + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks

---

## Deployed Project

The live version of Cinecircle is hosted on Vercel and accessible here:  
👉 [https://cinecircle.vercel.app](https://cinecircle.vercel.app) *(Replace with actual link after deploy)*

---

## Project Structure

```

cinecircle/
│
├── public/
│   └── index.html
├── src/
│   ├── components/     # NavBar, StarRating, ReviewCard, etc.
│   ├── pages/          # HomePage, SearchPage, ReviewPage
│   ├── App.tsx         # Main app router and logic
│   └── main.tsx        # App entry point
├── package.json
├── tailwind.config.js
└── vite.config.ts

````

---

### clone the Repository

```bash
git clone https://github.com/Uche-UkahChimzyterem/Cinecircle.git
````

### Navigate into the project

```bash
cd Cinecircle/project
```

### Install Dependencies

```bash
npm install
```

### ▶Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in Chrome to view the app.

---

## 👤 Usage

* **View as Guest**: You can access Home, About, and Contact pages.
* **Sign Up / Log In**: Required to search for movies and add reviews.
* **Search & Review**: Logged-in users can search, review, and rate movies.
* **Dashboard View**: Users can revisit and manage their review history.


```
Email: Arnold@example.com
Password: test
```

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
