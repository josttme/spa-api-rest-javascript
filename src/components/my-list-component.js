import { LitElement } from 'lit'
import { createMovies, createMoviesContainer } from '../utils'

class MyList extends LitElement {
	firstUpdated() {
		this.getLikedMovies(this.shadowRoot)
	}
	likedMoviesList() {
		const item = JSON.parse(localStorage.getItem('liked_movies'))
		let movies
		item ? (movies = item) : (movies = {})
		return movies
	}

	getLikedMovies(favorites) {
		const likedMovies = this.likedMoviesList()
		const moviesArray = Object.values(likedMovies)
		this.getCategories('', moviesArray, favorites, 'Mi lista')
	}
	getCategories(idMovie, getDataMovie, wrapper, title) {
		const movies = createMovies(getDataMovie)
		const content = createMoviesContainer(title, idMovie, movies)
		!!content
			? (wrapper.innerHTML = content)
			: (wrapper.innerHTML = '<h3>Mi lista está vacía.</h3>')
	}
}
customElements.define('my-list', MyList)
