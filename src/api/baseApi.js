import axios from 'axios'
import { API_KEY } from './secret'
let categoriesArray = {}
// prettier-ignore
const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	headers: { 'Content-Type': 'application/json;charset=utf-8' },
	params: { api_key: API_KEY, language: "es-ES" },
})

// prettier-ignore
export async function getTrendingMovies(page) {
	const { data: { results: movies, total_pages: totalPages },
	} = await api('trending/movie/day', {
		params: {
			page,
		},
	})
	return {movies, totalPages}

}
// prettier-ignore
export  async function getCategories() {
	const { data: { genres : categories } } = await api('genre/movie/list')
		categoriesArray = categories
		return categoriesArray
}
// prettier-ignore
export async function getMoviesByCategory(id) {
	const { data: { results: movies } } = await api('discover/movie', {
		params: { with_genres: id},
	})
	return movies
}
// prettier-ignore
export async function categoriesGeneric(id, categoryName, page) {
	const {  data: { results: movies, total_pages: totalPages} } = await api('discover/movie', {
		params: {
			with_genres: id,
			page
		},
	})
	return { movies, id, categoryName, totalPages }
}

// prettier-ignore
export async function getMoviesBySearch(query, page) {
	const { data:{ results: movies,total_pages: totalPages } } =
	await api('/search/movie', {
		params: { query, page },
	})
	return { movies, totalPages }
}

// prettier-ignore
export async function getMovieById(id) {
	const { data } = await api(`movie/${id}`)
	const idMovie = data.id
	const backdropImage = data.backdrop_path
	const posterImage = data.poster_path
	const title = data.title
	const releaseDate = data.release_date
	const [releaseYear, month, day] = releaseDate.split('-')
	const description = data.overview
	const ratingAverage = data.vote_average.toFixed(2)
	return { title, description, backdropImage, ratingAverage, posterImage, releaseYear, idMovie }
}

// prettier-ignore
export async function getRelatedMoviesId(id) {
	const { data: { results: movies } } = await api(`movie/${id}/recommendations`)
	return movies
}
