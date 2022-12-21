import { LitElement, html, unsafeCSS } from 'lit'
import { getMovieById, getRelatedMoviesId } from '../api/baseApi'
import { createMovies, createMoviesContainer } from '../utils'
import moviePage from '../styles/components/movie-page.scss'
import star from '../static/star.svg'
class MoviePage extends LitElement {
	static styles = [unsafeCSS(moviePage)]
	async firstUpdated() {
		const urlImage = (size, image) => `https://image.tmdb.org/t/p/w${size}/${image}`
		const shadow = this.renderRoot
		const title = shadow?.querySelector('h1') ?? null
		const description = shadow?.querySelector('p') ?? null
		const ratingAverage = shadow?.querySelector('.rating') ?? null
		const posterImage = shadow?.querySelector('.poster-image') ?? null
		const releaseYear = shadow?.querySelector('.release-year') ?? null
		const backdropImage = shadow?.querySelector('.background-image') ?? null
		const relatedMovies = shadow?.querySelector('.related-movies') ?? null

		const adList = shadow?.querySelector('.watchlist') ?? null
		const idMovie = this.getIdMovieOfPath()
		const getDataMovie = await getMovieById(idMovie)
		const getRelatedMovies = await getRelatedMoviesId(idMovie)
		this.getCategories(idMovie, getRelatedMovies, relatedMovies, 'Películas relacionadas')
		backdropImage.setAttribute('src', urlImage(1280, getDataMovie.backdropImage))

		posterImage.setAttribute('src', urlImage(500, getDataMovie.posterImage))
		releaseYear.innerText = `(${getDataMovie.releaseYear})`
		title.innerText = getDataMovie.title
		description.innerText = getDataMovie.description
		ratingAverage.innerText = `${getDataMovie.ratingAverage}`
		//favorites
		if (!!this.likedMoviesList()[getDataMovie.idMovie]) {
			adList.firstElementChild.classList.add('hidden')
			adList.classList.add('added')
			adList.lastElementChild.classList.remove('hidden')
		}
		adList.addEventListener('click', () => {
			this.likeMovie(getDataMovie)
			this.toggleButton(adList)
		})
	}
	getCategories(idMovie, getDataMovie, wrapper, title) {
		const movies = createMovies(getDataMovie)
		const content = createMoviesContainer(title, idMovie, movies)
		if (!!content) {
			title.startsWith('Favoritos')
				? (wrapper.innerHTML = content)
				: wrapper.insertAdjacentHTML('beforeend', content)
		}
	}
	likedMoviesList() {
		const item = JSON.parse(localStorage.getItem('liked_movies'))
		let movies
		if (item) {
			movies = item
		} else {
			movies = {}
		}
		return movies
	}
	likeMovie(movie) {
		const likedMovies = this.likedMoviesList()
		if (likedMovies[movie.idMovie]) {
			likedMovies[movie.idMovie] = undefined
		} else {
			likedMovies[movie.idMovie] = movie
		}
		localStorage.setItem('liked_movies', JSON.stringify(likedMovies))
	}
	toggleButton(adList) {
		adList.firstElementChild.classList.toggle('hidden')
		adList.classList.toggle('added')
		adList.lastElementChild.classList.toggle('hidden')
	}

	getIdMovieOfPath() {
		const [_, idMovie] = location.pathname.split('=')
		return idMovie
	}
	render() {
		return html`
			<section class="container">
				<div class="backgrop-image">
					<img class="background-image" />
					<div class="gradient"></div>
				</div>
				<div class="movie-info">
					<div class="content-poster-image">
						<img class="poster-image" />
					</div>
					<div class="container-rating-watchlist">
						<div class="watchlist">
							<svg class="watchlist-add" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M13 6a1 1 0 1 0-2 0v5H6a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5V6Z"
								/>
							</svg>
							<svg
								class="watchlist-check hidden"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M18.707 7.293a1 1 0 0 1 0 1.414L11.414 16a2 2 0 0 1-2.828 0l-3.293-3.293a1 1 0 1 1 1.414-1.414L10 14.586l7.293-7.293a1 1 0 0 1 1.414 0z"
								/>
							</svg>
						</div>
						<div class="rating-container">
							<img src=${star} />
							<span class="rating"></span>
						</div>
					</div>
					<div class="container-title-year">
						<h1 class="title"></h1>
						<span class="release-year"></span>
					</div>
					<p class="description"></p>
				</div>
			</section>
			<div class="related-movies"></div>
		`
	}
}
customElements.define('movie-page-component', MoviePage)
