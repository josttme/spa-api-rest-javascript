import { LitElement, html, css, unsafeCSS } from 'lit'
import global from '../styles/_global.scss'
import collection from '../styles/components/collection.scss'
import arrow from '../static/arrow.svg'

class Collection extends LitElement {
	// prettier-ignore
	static properties = {
		img: {}, title: {}, link: {}
	}
	constructor() {
		super()
		this.img
		this.attachShadow({ mode: 'open' })
	}
	static styles = [
		unsafeCSS(global),
		unsafeCSS(collection),
		css`
			.container-slider {
				--slider-index: 0;
				transform: translateX(calc(var(--slider-index) * 100%));
			}
		`,
	]
	get leftHandle() {
		return this.renderRoot?.querySelector('.container-handle-left') ?? null
	}
	get rightHandle() {
		return this.renderRoot?.querySelector('.container-handle-right') ?? null
	}
	get slider() {
		return this.renderRoot?.querySelector('.container-slider') ?? null
	}

	firstUpdated() {
		this.slider.insertAdjacentHTML('beforeend', this.img)
		if (!location.pathname.startsWith('/movie='))
			this.slider.insertAdjacentHTML('beforeend', this.link)

		this.hiddenLeftHandle()
		this.hiddenRightHandle()

		this.rightHandle.addEventListener(
			'click',
			this.rightClick,
			this.hiddenLeftHandle,
			this.hiddenRightHandle
		)
		this.leftHandle.addEventListener(
			'click',
			this.leftClick,
			this.hiddenLeftHandle,
			this.hiddenRightHandle
		)
	}

	hiddenLeftHandle() {
		const observe = new IntersectionObserver((entries, observer) => {
			entries.forEach((element) => {
				if (element.isIntersecting) {
					this.rightHandle.style.opacity = 0
					this.rightHandle.disabled = true
					this.rightHandle.style.cursor = 'default'
					this.rightHandle.style.zIndex = -1
				} else {
					this.rightHandle.style.opacity = 1
					this.rightHandle.disabled = false
					this.rightHandle.style.cursor = 'pointer'
					this.rightHandle.style.zIndex = 15
				}
			})
		})
		observe.observe(this.slider.lastElementChild)
	}
	hiddenRightHandle() {
		const observe = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((element) => {
					if (element.isIntersecting) {
						this.leftHandle.disabled = true
						this.leftHandle.style.zIndex = -1
						this.leftHandle.style.opacity = 0
						this.leftHandle.style.cursor = 'default'
					} else {
						this.leftHandle.style.opacity = 1
						this.leftHandle.disabled = false
						this.leftHandle.style.cursor = 'pointer'
						this.leftHandle.style.zIndex = 15
					}
				})
			},
			{
				root: null,
				rootMargin: '1000px 10px 1000px 10px',
				threshold: 1,
			}
		)
		observe.observe(this.slider.children[4] || this.slider.children[0])
	}

	leftClick(e) {
		const leftHandle = e.target
		const slider = leftHandle.closest('.container').querySelector('.container-slider')
		const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue('--slider-index'))
		slider.style.setProperty('--slider-index', sliderIndex + 1)
	}
	rightClick(e) {
		const righttHandle = e.target
		const slider = righttHandle.closest('.container').querySelector('.container-slider')
		const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue('--slider-index'))
		slider.style.setProperty('--slider-index', sliderIndex - 1)
	}

	render() {
		const inMoviePage = location.pathname.startsWith('/movie=')
		const inMyList = location.pathname.startsWith('/mylist')

		return html`
			<h4 class=${inMoviePage ? 'inMoviePage' : ''}>${this.title}</h4>
			<div class="container">
				<button class="container-handle container-handle-left">
					<img src=${arrow} />
				</button>
				<div class="container-slider ${inMyList ? 'in-my-list' : ''}"></div>
				<button class="container-handle container-handle-right">
					<img src=${arrow} />
				</button>
			</div>
		`
	}
}
customElements.define('category-container-component', Collection)
