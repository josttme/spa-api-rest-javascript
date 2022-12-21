import { LitElement, html, unsafeCSS } from 'lit'
import { goTo } from '../router'
import { registerImage } from '../utils/lazyLoading'
import transparent from '../static/transparent.png'
import global from '../styles/_global.scss'
import movie from '../styles/components/movie.scss'

class MovieComponent extends LitElement {
	static properties = {
		img: {},
		linkMovie: {},
	}
	static styles = [unsafeCSS(global), unsafeCSS(movie)]
	firstUpdated() {
		const img = this.shadowRoot.querySelector('img')
		registerImage(img)
	}

	render() {
		return html`
			<img
				src=${transparent}
				class="skeleton"
				data-src=${this.img}
				linkMovie=${this.linkMovie}
				@click=${this.click}
			/>
		`
	}
	click = (e) => {
		goTo(`/movie=${e.target.getAttribute('linkMovie')}`)
	}
}
customElements.define('movie-component', MovieComponent)
