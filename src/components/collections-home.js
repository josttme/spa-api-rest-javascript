import { LitElement, html } from 'lit'
import { getTrendingMovies, getCategories, getMoviesByCategory } from '../api/baseApi'
import { createMovies, createMoviesContainer } from '../utils'

class CollectionsHome extends LitElement {
	getTrending(trends, wrapper) {
		const movies = createMovies(trends)
		const content = createMoviesContainer('trends', null, movies)
		wrapper.insertAdjacentHTML('beforeend', content)
	}
	getCategories(categories, wrapper) {
		categories.map(async (category) => {
			const getMovies = await getMoviesByCategory(category.id)
			const movies = createMovies(getMovies)
			const content = createMoviesContainer(category.name, category.id, movies)

			wrapper.insertAdjacentHTML('beforeend', content)
		})
	}

	async firstUpdated() {
		const collectionsHome = this.renderRoot?.querySelector('#collections-home') ?? null
		const categories = await getCategories()
		const trends = await getTrendingMovies()
		this.getTrending(trends.movies, collectionsHome)
		this.getCategories(categories, collectionsHome)
	}
	render() {
		return html` <div id="collections-home"></div>`
	}
}
customElements.define('collections-home', CollectionsHome)
