import { LitElement, html, css } from 'lit'
import { goTo } from '../router'

class searchComponent extends LitElement {
	static styles = css`
		* {
			box-sizing: border-box;
			margin: 0;
			padding: 0;
		}
		div {
			width: 90%;
			max-width: 500px;
			margin: 0 auto;
			display: grid;
			grid-template-columns: 1fr 15%;
			background-color: #06459c;
			border-radius: 8px;
			overflow: hidden;
			margin: 30px auto;
			border-radius: 10px;
			border: 1px solid #06459c;
		}

		div:hover,
		div:focus,
		div:active {
			border: 1px solid #fff;
		}
		input[type='search']::-webkit-search-cancel-button {
			-webkit-appearance: none;
			height: 30px;
			width: 30px;
			margin-left: 0.4rem;
			background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25 25' fill='%23777'><path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/></svg>");
			cursor: pointer;
		}
		input {
			background-color: #06459c;
			transition: 0.25s ease-in;
			font-size: 18px;
			border: none;
			text-indent: 30px;
			height: 50px;
			box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
			color: white;
		}

		input:focus,
		button:focus-visible {
			border: none;
			outline: none;
			outline-color: none;
			outline-style: auto;
			outline-width: 0px;
			box-shadow: none;
		}

		input::placeholder {
			font-weight: bold;
			color: rgba(255, 255, 255, 0.4);
			font-size: 18px;
		}

		button {
			display: grid;
			place-content: center;
			background-color: #06459c;
			border: none;
			cursor: pointer;
		}
		button:focus-visible {
			background-color: #002150;
		}

		button:active,
		button:hover {
			background-color: #002150;
		}
		@media screen and (min-width: 1000px) {
			div {
				margin-top: 50px;
			}
		}
	`
	render() {
		return html`
			<div>
				<input type="search" placeholder="Search..." />
				<button @click=${this.onClick} type="button">
					<svg
						focusable="false"
						xmlns="http://www.w3.org/2000/svg"
						fill="#fff"
						width="25px"
						viewBox="0 0 24 24"
					>
						<path
							d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
						></path>
					</svg>
				</button>
			</div>
		`
	}
	firstUpdated() {
		this.inputSearch.addEventListener('keyup', (e) => {
			e.stopPropagation()
			if (e.key === 'Enter') {
				this.searchValur()
			}
		})
		window.addEventListener('keydown', (e) => {
			if (e.keyCode == 13) {
				this.inputSearch.focus()
			}
		})
	}
	get inputSearch() {
		return this.renderRoot?.querySelector('input') ?? null
	}
	onClick = (e) => {
		e.preventDefault()
		this.searchValur()
	}
	searchValur() {
		if (this.inputSearch.value.trim()) {
			goTo(`/search=${this.inputSearch.value}`)
			this.inputSearch.value = ''
		}
	}
}
customElements.define('seacrh-component', searchComponent)
