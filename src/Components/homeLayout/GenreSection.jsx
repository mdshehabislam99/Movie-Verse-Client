import { Link } from "react-router-dom";

const GenreSection = () => {
  const genres = [
    {
      name: "Action",
      icon: "💥",
      count: 245,
      color: "from-red-500 to-orange-500",
    },
    {
      name: "Drama",
      icon: "🎭",
      count: 189,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Comedy",
      icon: "😂",
      count: 167,
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Sci-Fi",
      icon: "🚀",
      count: 98,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Horror",
      icon: "👻",
      count: 134,
      color: "from-gray-700 to-red-900",
    },
    {
      name: "Romance",
      icon: "💕",
      count: 156,
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "Thriller",
      icon: "🔪",
      count: 178,
      color: "from-gray-800 to-gray-600",
    },
    {
      name: "Fantasy",
      icon: "🐉",
      count: 112,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const GenreCard = ({ genre, delay }) => (
    <Link
      to={`/movies?genre=${genre.name}`}
      className={`group relative bg-gradient-to-br ${genre.color} rounded-2xl p-6 text-white overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-2xl animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

      {/* Content */}
      <div className="relative z-10">
        <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300 animate-bounce">
          {genre.icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{genre.name}</h3>
        <p className="text-white/80">{genre.count.toLocaleString()} movies</p>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-colors duration-300" />
    </Link>
  );

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in">
            Browse by Genre
          </h2>
          <p
            className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Explore our vast collection of movies across various genres. Find
            your next favorite film!
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {genres.map((genre, index) => (
            <GenreCard key={genre.name} genre={genre} delay={index * 100} />
          ))}
        </div>

        <div
          className="text-center mt-12 animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-lg rounded-full px-8 py-4 border border-white/20">
            <span className="text-white font-semibold">
              Can't find what you're looking for?
            </span>
            <Link
              to="/movies"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Browse All
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenreSection;
