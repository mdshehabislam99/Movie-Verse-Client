import { useState, useEffect } from "react";
import { getStatistics } from "../../api/movieApi";


const StatSection = () => {
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalUsers: 0,
    totalGenres: 0,
    totalReviews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const statistics = await getStatistics();
        setStats(statistics);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatistics();
  }, []);

  const StatCard = ({ icon, number, label, suffix = "", delay }) => (
    <div
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="text-4xl mb-4 animate-bounce"
        style={{ animationDelay: `${delay + 200}ms` }}
      >
        {icon}
      </div>
      <div className="text-4xl font-bold text-white mb-2">
        {loading ? (
          <div className="animate-pulse bg-gray-400 h-8 w-20 mx-auto rounded"></div>
        ) : (
          <>
            {number.toLocaleString()}
            {suffix}
          </>
        )}
      </div>
      <div className="text-gray-300 text-lg">{label}</div>
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            MovieMaster Pro Statistics
          </h2>
          <p
            className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Join thousands of movie enthusiasts who trust MovieMaster Pro to
            organize and discover their favorite films
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <StatCard
            icon="🎬"
            number={stats.totalMovies}
            label="Total Movies"
            delay={0}
          />
          <StatCard
            icon="👥"
            number={stats.totalUsers}
            label="Registered Users"
            delay={100}
          />
          <StatCard
            icon="📊"
            number={stats.totalGenres}
            label="Movie Genres"
            delay={200}
          />
          <StatCard
            icon="⭐"
            number={4.8}
            label="Average Rating"
            suffix="/5"
            delay={300}
          />
        </div>

        {/* Additional Info */}
        <div
          className="mt-16 text-center animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20">
            <span className="text-green-400 animate-pulse">✓</span>
            <span className="text-white">
              Trusted by movie lovers worldwide
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatSection;
