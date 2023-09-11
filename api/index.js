import axios from 'axios';
const apiKey = '497528080faedff4b6b171522099f6d1';

const baseURL = 'https://api.themoviedb.org/3';
const popularSeriesEndpoint = `${baseURL}/tv/popular`;
const popularMoviesEndpoint = `${baseURL}/movie/popular?key=${apiKey}`;
const upcomingMoviesEndpoint = `${baseURL}/movie/upcoming?key=${apiKey}`;
const trendingMoviesEndpoint = `${baseURL}/trending/movie/day?key=${apiKey}`;

//images

export const fetchImage = (path) => {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : null;
};

//home screen

export async function fetchPopularMovies(popularMoviesData) {
    try {
        const response = await axios.get(popularMoviesEndpoint, {
            params: {
                api_key: apiKey,
            },
        });

        const popularMoviesData = response.data.results;

        return popularMoviesData;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchUpcomingMovies(upcomingMoviesData) {
    try {
        const response = await axios.get(upcomingMoviesEndpoint, {
            params: {
                api_key: apiKey,
            },
        });

        const upcomingMoviesData = response.data.results;

        return upcomingMoviesData;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchTrendingMovies(trendingMoviesData) {
    try {
        const response = await axios.get(trendingMoviesEndpoint, {
            params: {
                api_key: apiKey,
            },
        });

        const trendingMoviesData = response.data.results;

        return trendingMoviesData;
    } catch (error) {
        console.error(error);
    }
}

/* export async function fetchUpcomingMovies(updateDataCallback) {
    try {
        const response = await axios.get(upcomingMoviesEndpoint, {
            params: {
                api_key: apiKey,
            },
        });
        // Assuming that the data you need is in response.data.results
        const upcomingMoviesData = response.data.results;

        // Call the callback function to update the state in your component
        updateDataCallback(upcomingMoviesData);
    } catch (error) {
        console.error(error);
    }
}

export async function fetchTrendingMovies(updateDataCallback) {
    try {
        const response = await axios.get(trendingMoviesEndpoint, {
            params: {
                api_key: apiKey,
            },
        });
        // Assuming that the data you need is in response.data.results
        const trendingMoviesData = response.data.results;

        // Call the callback function to update the state in your component
        updateDataCallback(trendingMoviesData);
    } catch (error) {
        console.error(error);
    }
} */
