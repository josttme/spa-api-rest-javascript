import { LitElement, html, css } from 'lit'
import { categoriesGeneric, getTrendingMovies, getMoviesBySearch } from '../api/baseApi'
import { createMovies, delete20Url, getNameAndIdForURL } from '../utils'
class genericCategories extends LitElement {
	static properties = {
		page: {},
	}
	constructor() {
		super()
		this.page = 1
	}
	static styles = css`
		:host {
			display: block;
			margin: 0 auto !important;
		}
		div {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			margin-bottom: 1rem;
			padding: 0.4rem;
			gap: 0.2rem;
		}
		h4 {
			margin: 0.5rem;
			margin-left: 2%;
			font-size: 1.4rem;
			font-weight: bold;
		}
		@media screen and (min-width: 1000px) {
			:host {
				max-width: 1000px;
			}
			div {
				grid-template-columns: repeat(4, 1fr);
				padding: 0;
				gap: 1rem;
				margin: 0 auto;
			}
			h4 {
				margin-left: 1%;
			}
		}
	`
	getTrending(trends, wrapper) {
		const movies = createMovies(trends)
		wrapper.insertAdjacentHTML('beforeend', movies.join(''))
	}

	async firstUpdated() {
		let totalPages = 0
		const title = this.renderRoot?.querySelector('#title') ?? null
		const containerCategory = this.renderRoot?.querySelector('#container-category') ?? null
		if (window.location.pathname.startsWith('/category')) {
			const nameAdnIdCategory = getNameAndIdForURL()
			const categoryGeneric = await categoriesGeneric(
				nameAdnIdCategory.categoryId,
				nameAdnIdCategory.categoryName,
				this.page
			)
			const movies = createMovies(categoryGeneric.movies)
			const nameCategory = delete20Url(categoryGeneric.categoryName)
			//this.getTrending(nameCategory, movies, containerCategory)
			containerCategory.insertAdjacentHTML('beforeend', movies.join(''))
			totalPages = categoryGeneric.totalPages
			title.innerText = nameCategory

			// **** Display TRENDS ****
		} else if (window.location.pathname.startsWith('/trends')) {
			const trends = await getTrendingMovies(this.page)
			this.getTrending(trends.movies, containerCategory)
			totalPages = trends.totalPages
			title.innerText = 'Tendencias'

			// **** Display SEARCH ****
		} else if (window.location.pathname.startsWith('/search=')) {
			const query = getNameAndIdForURL()
			const search = await getMoviesBySearch(delete20Url(query), this.page)
			if (!search.movies.length) {
				title.innerText = `No hay resultados para: "${delete20Url(query)}"`
			} else {
				title.innerText = `Resultados para: "${delete20Url(query)}"`
				this.getTrending(search.movies, containerCategory)
			}
			totalPages = search.totalPages
		}
		if (this.page !== totalPages) {
			let observeMovie = containerCategory.children[containerCategory.children.length - 5]
			!!containerCategory.children.length ? this.observe(observeMovie) : null
		}
		function myFunction(x) {
			if (x.matches) {
				const contentImg = document
					.querySelector('generic-category-component')
					.shadowRoot.querySelectorAll('movie-component')
				contentImg.forEach((img) => {
					img.style.maxWidth = '100%'
				})
			}
		}
		let x = window.matchMedia('(min-width: 1000px)')
		myFunction(x) // Call listener function at run time
		x.addListener(myFunction) // Attach listener function on state changes
	}
	observe(target) {
		const observerSection = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						this.page++
						this.firstUpdated()
						observer.unobserve(entry.target)
					}
				})
			},
			{
				rootMargin: '0px 0px 200px 0px',
				threshold: 1.0,
			}
		)
		observerSection.observe(target)
	}

	render() {
		return html`
			<h4 id="title" type="string"></h4>
			<div id="container-category"></div>
		`
	}
}
customElements.define('generic-category-component', genericCategories)
