import axios from 'axios';
const apiKey = '497528080faedff4b6b171522099f6d1';

const baseURL = 'https://api.themoviedb.org/3';
const popularSeriesEndpoint = `${baseURL}/tv/popular`;
const popularMoviesEndpoint = `${baseURL}/movie/popular?key=${apiKey}`;
const upcomingMoviesEndpoint = `${baseURL}/movie/upcoming?key=${apiKey}`;
const trendingMoviesEndpoint = `${baseURL}/trending/movie/day?key=${apiKey}`;
const similarMoviesEndpoint = `${baseURL}/movie/movie/similar?key=${apiKey}`;

/* const similarMoviesEndpoint = `${baseURL}/movie/${movieID}/similar?key=${apiKey}`; */

/* const movieDetailsEndpoint = `${baseURL}/movie/${movieID}?key=${apiKey}`; */
//images

export const fetchImage = (path) => {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : null;
};

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: apiKey,
    },
});

/* 
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
} */
export async function fetchPopularMovies() {
    try {
        const response = await api.get('/movie/popular');
        return response.data.results;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchUpcomingMovies() {
    try {
        const response = await api.get('/movie/upcoming');
        return response.data.results;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchTrendingMovies() {
    try {
        const response = await api.get('/trending/movie/day');
        return response.data.results;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchMovieDetails(movieID) {
    try {
        const response = await api.get(`/movie/${movieID}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchMovieCredits(movieID) {
    try {
        const response = await api.get(`/movie/${movieID}/credits`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchSimilarMovies(movieID) {
    try {
        const response = await api.get(`/movie/${movieID}/similar`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
