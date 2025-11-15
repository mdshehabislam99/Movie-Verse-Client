const port =
  process.env.port || "http://localhost:3000/api";

// Homepage API calls
export const getFeaturedMovies = async () => {
  try {
    const response = await fetch(`${port}/movies/featured`);
    if (!response.ok) throw new Error("Failed to fetch featured movies");
    return await response.json();
  } catch (error) {
    console.error("Error fetching featured movies:", error);
    // Return sample data if API fails
    return [
      {
        _id: "1",
        title: "Inception",
        posterUrl:
          "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        rating: 8.8,
        genre: "Sci-Fi",
        releaseYear: 2010,
        plotSummary:
          "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        director: "Christopher Nolan",
      },
    ];
  }
};

export const getStatistics = async () => {
  try {
    const response = await fetch(`${port}/statistics`);
    if (!response.ok) throw new Error("Failed to fetch statistics");
    return await response.json();
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return {
      totalMovies: 1250,
      totalUsers: 5400,
      totalGenres: 15,
      averageRating: 4.8,
    };
  }
};

export const getTopRatedMovies = async (limit = 5) => {
  try {
    const response = await fetch(`${port}/movies/top-rated?limit=${limit}`);
    if (!response.ok) throw new Error("Failed to fetch top rated movies");
    return await response.json();
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return [];
  }
};

export const getRecentlyAddedMovies = async (limit = 6) => {
  try {
    const response = await fetch(`${port}/movies/recent?limit=${limit}`);
    if (!response.ok) throw new Error("Failed to fetch recent movies");
    return await response.json();
  } catch (error) {
    console.error("Error fetching recent movies:", error);
    return [];
  }
};

// CRUD Operations
export const getAllMovies = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });

    const response = await fetch(`${port}/movies?${queryParams}`);
    if (!response.ok) throw new Error("Failed to fetch movies");
    return await response.json();
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const getMovie = async (id) => {
  try {
    const response = await fetch(`${port}/movies/${id}`);
    if (!response.ok) throw new Error("Failed to fetch movie");
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie:", error);
    throw error;
  }
};

export const addMovie = async (movieData) => {
  try {
    const response = await fetch(`${port}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    });
    if (!response.ok) throw new Error("Failed to add movie");
    return await response.json();
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};

export const updateMovie = async (id, movieData) => {
  try {
    const response = await fetch(`${port}/movies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    });
    if (!response.ok) throw new Error("Failed to update movie");
    return await response.json();
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error;
  }
};

export const deleteMovie = async (id) => {
  try {
    const response = await fetch(`${port}/movies/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete movie");
    return await response.json();
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};

export const getMyMovies = async (userEmail) => {
  try {
    const response = await fetch(
      `${port}/movies/my-collection?email=${userEmail}`
    );
    if (!response.ok) throw new Error("Failed to fetch user movies");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user movies:", error);
    return [];
  }
};
