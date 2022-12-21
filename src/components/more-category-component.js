import { LitElement, html, unsafeCSS } from 'lit'
import { goTo } from '../router'
import global from '../styles/_global.scss'
import moreCategory from '../styles/components/more-category.scss'

class MoreCategory extends LitElement {
	static properties = {
		link: {},
	}
	static styles = [unsafeCSS(global), unsafeCSS(moreCategory)]
	render() {
		return html` <a href=${this.link} @click=${this.onClick}>See more</a> `
	}
	onClick = (e) => {
		e.preventDefault()
		goTo(e.target.getAttribute('href'))
	}
}

customElements.define('more-category-component', MoreCategory)
