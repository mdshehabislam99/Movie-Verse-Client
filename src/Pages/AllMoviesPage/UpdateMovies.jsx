import { useEffect, useState } from "react";
import { useAuth } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router";
import { CgAsterisk } from "react-icons/cg";

const UpdateMovies = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    director: "",
    cast: "",
    rating: "",
    duration: "",
    plotSummary: "",
    posterUrl: "",
    language: "English",
    country: "",
    addedBy: "",
    created_at: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting with user:", user);

    const movieData = {
      ...formData,
      addedBy: user.email || "unknown",
      created_at: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:3000/movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Movie added successfully:", data);
      navigate("/all-movie");
    } catch (error) {
      console.error("Failed to add movie:", error);
      alert("Failed to add movie. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const genres = [
    "Action",
    "Drama",
    "Comedy",
    "Sci-Fi",
    "Animation",
    "Romance",
    "Thriller",
    "Fantasy",
    "Crime",
    "Adventure",
  ];

  return (
    <div className="flex min-h-screen p-20 md:p-25 lg:p-30">
      <div className="w-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Edit Your Movies</h1>
          <p className="text-xl font-semibold text-gray-400 mb-8">
            Correction and Update your movie here
          </p>
        </div>

        <div
          className="bg-gradient-to-r  from-pink-300
        to-green-400 backdrop-blur-lg rounded-2xl px-15 py-6 text-black"
        >
          <h1
            className="font-bold 
          text-gray-800 text-3xl text-center mb-4"
          >
            Update Movie Here
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="">
                <label
                  htmlFor="title"
                  className="flex ml-3 text-lg font-medium mb-1"
                >
                  Movie Title
                  <span>
                    <CgAsterisk />
                  </span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter movie title"
                  className="w-full px-9 py-2 text-gray-800 bg-gray-200 border border-gray-400 rounded-full 
                    focus:outline-none focus:ring-2 focus:ring-green-500
                     focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Genre */}
              <div>
                <label
                  htmlFor="genre"
                  className="flex text-lg ml-3 font-medium mb-1"
                >
                  Genre
                  <span>
                    <CgAsterisk />
                  </span>
                </label>
                <select
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  required
                  className="w-full px-9 py-2 text-gray-800 bg-gray-200 border border-gray-400 rounded-full 
                    focus:outline-none focus:ring-2 focus:ring-green-500
                      transition-all duration-300"
                >
                  <option value="" className="text-gray-700 bg-amber-200">
                    Select Genre
                  </option>
                  {genres.map((genre) => (
                    <option
                      key={genre}
                      value={genre}
                      className="text-white bg-blue-900"
                    >
                      {genre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Release Year */}
              <div className="form-group">
                <label
                  htmlFor="releaseYear"
                  className="flex text-lg ml-3 font-medium mb-1"
                >
                  Release Year{" "}
                  <span>
                    <CgAsterisk />
                  </span>
                </label>
                <input
                  type="number"
                  id="releaseYear"
                  name="releaseYear"
                  value={formData.releaseYear}
                  onChange={handleChange}
                  required
                  min="1900"
                  max="2030"
                  placeholder="2025"
                  className="w-full px-9 py-2 text-gray-800 bg-gray-200 border border-gray-400 rounded-full 
                    focus:outline-none focus:ring-2 focus:ring-green-500
                     focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Director */}
              <div className="form-group">
                <label
                  htmlFor="director"
                  className="flex text-lg ml-3 font-medium mb-1"
                >
                  Director{" "}
                  <span>
                    <CgAsterisk />
                  </span>
                </label>
                <input
                  type="text"
                  id="director"
                  name="director"
                  value={formData.director}
                  onChange={handleChange}
                  required
                  placeholder="Director's name"
                  className="w-full px-9 py-2 text-gray-800 bg-gray-200 border border-gray-400 rounded-full 
                    focus:outline-none focus:ring-2 focus:ring-green-500
                     focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Cast */}
              <div className="form-group">
                <label
                  htmlFor="cast"
                  className="flex ml-3 text-lg font-medium mb-1"
                >
                  Cast{" "}
                  <span>
                    <CgAsterisk />
                  </span>
                </label>
                <input
                  type="text"
                  id="cast"
                  name="cast"
                  value={formData.cast}
                  onChange={handleChange}
                  required
                  placeholder="Actor 1, Actor 2, Actor 3"
                  className="w-full px-9 py-2 text-gray-800 bg-gray-200 border border-gray-400 rounded-full 
                    focus:outline-none focus:ring-2 focus:ring-green-500
                     focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Rating */}
              <div className="form-group">
                <label
                  htmlFor="rating"
                  className="flex text-lg ml-3 font-medium mb-1"
                >
                  Rating (Out of 10)
                  <span>
                    <CgAsterisk />
                  </span>
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                  min="0"
                  max="10"
                  step="0.1"
                  placeholder="8.5"
                  className="w-full px-9 py-2 text-gray-800 bg-gray-200 border border-gray-400 rounded-full 
                    focus:outline-none focus:ring-2 focus:ring-green-500
                     focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Duration */}
              <div className="form-group">
                <label
                  htmlFor="duration"
                  className="flex text-lg ml-3 font-medium mb-1"
                >
                  Duration (minutes)
                  <span>
                    <CgAsterisk />
                  </span>
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="120"
                  className="w-full px-9 py-2 text-gray-800 bg-gray-200 border border-gray-400 rounded-full 
                    focus:outline-none focus:ring-2 focus:ring-green-500
                     focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Language */}
              <div className="form-group">
                <label
                  htmlFor="language"
                  className="flex text-lg ml-3 font-medium mb-1"
                >
                  Language
                </label>
                <input
                  type="text"
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  placeholder="English"
                  className="w-full px-9 py-2 text-gray-800 bg-gray-200 border border-gray-400 rounded-full 
                    focus:outline-none focus:ring-2 focus:ring-green-500
                     focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Country */}
              <div className="form-group">
                <label
                  htmlFor="country"
                  className="flex text-lg font-medium ml-3 mb-1"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country of origin"
                  className="w-full px-9 py-2 text-gray-800 bg-gray-200 border border-gray-400 rounded-full 
                    focus:outline-none focus:ring-2 focus:ring-green-500
                     focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Full Width Fields */}
            {/* Poster URL */}
            <div className="form-group">
              <label
                htmlFor="posterUrl"
                className="flex text-lg font-medium ml-3 mb-1"
              >
                Poster URL
                <span>
                  <CgAsterisk />
                </span>
              </label>
              <input
                type="url"
                id="posterUrl"
                name="posterUrl"
                value={formData.posterUrl}
                onChange={handleChange}
                required
                placeholder="https://example.com/poster.jpg"
                className="w-full px-9 py-2 text-gray-800 bg-gray-200 border border-gray-400 rounded-full 
                    focus:outline-none focus:ring-2 focus:ring-green-500
                     focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Plot Summary */}
            <div className="">
              <label
                htmlFor="plotSummary"
                className="flex text-lg ml-4 font-medium mb-1"
              >
                Plot Summary
                <span>
                  <CgAsterisk />
                </span>
              </label>
              <textarea
                id="plotSummary"
                name="plotSummary"
                value={formData.plotSummary}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Write summary of the movie screen, dialog ..."
                className="w-full px-9 placeholder:p-4 py-2 text-gray-800 bg-gray-200 border border-gray-400 rounded-full 
                    focus:outline-none focus:ring-2 focus:ring-green-500
                     focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Form Actions */}
            <div
              className="flex flex-col sm:flex-row gap-3 
            justify-end "
            >
              <button
                type="button"
                onClick={() => navigate("/all-movie")}
                className="px-8 py-3 bg-red-600 
                hover:bg-red-800 text-white rounded-full
                 font-semibold transition-all duration-300
                  transform hover:scale-105  "
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3
                  bg-amber-500 hover:bg-amber-700
                   text-white rounded-full font-semibold
                    transition-all duration-300 transform 
                    hover:scale-105 "
              >
                Update Movie
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMovies;

