import { Link } from "react-router-dom";

const AboutPlatform = () => {
  const features = [
    {
      icon: "🎬",
      title: "Comprehensive Library",
      description:
        "Access thousands of movies from various genres and eras with detailed information and metadata.",
    },
    {
      icon: "⭐",
      title: "Personal Collections",
      description:
        "Create and manage your own movie collections with custom categorization and personal ratings.",
    },
    {
      icon: "🔍",
      title: "Advanced Filtering",
      description:
        "Find exactly what you want with our powerful search and filtering options by genre, year, rating, and more.",
    },
    {
      icon: "📱",
      title: "Cross-Platform",
      description:
        "Access your movie library from any device with our fully responsive design and mobile app experience.",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Movies" },
    { number: "50+", label: "Genres" },
    { number: "5,000+", label: "Users" },
    { number: "25,000+", label: "Reviews" },
  ];

  const FeatureCard = ({ feature, delay }) => (
    <div
      className="group bg-gray-800/50 backdrop-blur-lg 
      rounded-2xl p-8 border border-gray-700
       hover:border-blue-500/50 hover:bg-gray-800/80 
       transition-all duration-500 hover:scale-105
        animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300 animate-bounce">
        {feature.icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
      <p className="text-gray-300 leading-relaxed">{feature.description}</p>
    </div>
  );

  return (
    <section className="mt-4 min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
      <div className="mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-6 animate-fade-in">
            About <span className="text-blue-400">MovieMaster Pro</span>
          </h2>
          <p
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Your ultimate movie management companion. Designed for cinephiles
            and casual viewers alike, MovieMaster Pro offers a comprehensive
            solution for organizing, discovering, and managing your movie
            collection with style and efficiency.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>

         {/* Features Grid */}
        <div className="grid grid-cols-1
         md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature}
            delay={index * 150} />
          ))}
        </div> 

        {/* CTA Section */}
        <div
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center relative overflow-hidden animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Movie Journey?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of movie lovers who trust MovieMaster Pro to
              organize and discover their favorite films.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-blue-600 hover:bg-gray-100
                 px-8 py-4 rounded-lg font-semibold text-lg transition-all
                  duration-300 transform hover:scale-105"
              >
                Get Started Free
              </Link>
              <Link
                to="/all-movie"
                className="border-2 border-white text-white hover:bg-white
                hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Browse Movies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPlatform;
