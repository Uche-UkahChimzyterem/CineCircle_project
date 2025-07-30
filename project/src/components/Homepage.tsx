import React, { useState } from 'react';
import { Film, Users, Star, ArrowRight, Menu, X } from 'lucide-react';

interface HomepageProps {
  onShowLogin: () => void;
}

const Homepage: React.FC<HomepageProps> = ({ onShowLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-teal-900">
      {/* Navigation */}
      <nav className="bg-indigo-900/90 backdrop-blur-sm border-b border-indigo-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Film className="h-8 w-8 text-cyan-400" />
              <span className="text-2xl font-bold text-white">CineCircle</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
              <button
                onClick={onShowLogin}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
              >
                Sign In
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-indigo-700">
              <div className="flex flex-col space-y-4">
                <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
                <button
                  onClick={onShowLogin}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors font-medium w-fit"
                >
                  Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Your Voice in
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"> Cinema</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join CineCircle, where movie enthusiasts unite to share authentic reviews, 
            discover hidden gems, and build a community-driven cinema experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onShowLogin}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Start Reviewing</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border border-gray-400 text-gray-300 hover:text-white hover:border-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-indigo-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Why Choose CineCircle?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-indigo-800/50 backdrop-blur-sm p-8 rounded-2xl border border-indigo-700 hover:border-cyan-500 transition-all duration-300 transform hover:scale-105">
              <div className="bg-cyan-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Community First</h3>
              <p className="text-gray-400 leading-relaxed">
                Real reviews from real people. No corporate influence, just authentic opinions from fellow movie lovers.
              </p>
            </div>
            
            <div className="bg-indigo-800/50 backdrop-blur-sm p-8 rounded-2xl border border-indigo-700 hover:border-cyan-500 transition-all duration-300 transform hover:scale-105">
              <div className="bg-cyan-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Smart Ratings</h3>
              <p className="text-gray-400 leading-relaxed">
                Our 5-star rating system combined with detailed reviews helps you make informed viewing decisions.
              </p>
            </div>
            
            <div className="bg-indigo-800/50 backdrop-blur-sm p-8 rounded-2xl border border-indigo-700 hover:border-cyan-500 transition-all duration-300 transform hover:scale-105">
              <div className="bg-cyan-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Film className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Vast Library</h3>
              <p className="text-gray-400 leading-relaxed">
                From blockbusters to indie films, discover and review movies across all genres and decades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">About CineCircle</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                CineCircle was born from a simple belief: movie reviews should come from the people who actually watch them. 
                We're building a platform where your voice matters, where diverse perspectives are celebrated, and where 
                the love of cinema brings us all together.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Our mission is to democratize movie criticism by creating an inclusive space where every opinion counts, 
                from casual viewers to dedicated cinephiles.
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">50K+</div>
                  <div className="text-gray-400">Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">10K+</div>
                  <div className="text-gray-400">Movies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">5K+</div>
                  <div className="text-gray-400">Members</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/7991688/pexels-photo-7991688.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Cinema"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-indigo-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Get In Touch</h2>
          <p className="text-gray-300 text-lg mb-12">
            Have questions, suggestions, or just want to chat about movies? We'd love to hear from you.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-indigo-800/50 backdrop-blur-sm p-6 rounded-xl border border-indigo-700">
              <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
              <p className="text-cyan-400">uche.chimzyterem@gmail.com</p>
            </div>
            <div className="bg-indigo-800/50 backdrop-blur-sm p-6 rounded-xl border border-indigo-700">
              <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
              <p className="text-cyan-400">+233 559 055 8625</p>
            </div>
            <div className="bg-indigo-800/50 backdrop-blur-sm p-6 rounded-xl border border-indigo-700">
              <h3 className="text-lg font-semibold text-white mb-2">Address</h3>
              <p className="text-cyan-400">Accra, Ghana</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 border-t border-indigo-700 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Film className="h-6 w-6 text-cyan-400" />
            <span className="text-xl font-bold text-white">CineCircle</span>
          </div>
          <p className="text-gray-400">© 2025 CineCircle. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;