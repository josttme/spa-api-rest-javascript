import appConstants from '../common/constants'
import Route from 'route-parser'
import { homePage, categoriesPage, movie, myList } from '../utils/navigation.js'

import CollectionsPage from '../pages/collections-home.template'
import genericPage from '../pages/generic-category.template'
import MoviePage from '../pages/movie-page.template'
import MyListPage from '../pages/my-list.template'

export const routes = {
	Main: new Route(appConstants.routes.index),
	Category: new Route(appConstants.routes.category),
	Trends: new Route(appConstants.routes.trends),
	Search: new Route(appConstants.routes.search),
	Movie: new Route(appConstants.routes.movie),
	MyList: new Route(appConstants.routes.myList),
}

export const render = (path) => {
	path.startsWith(routes.Category.spec) ||
	path.startsWith(routes.Trends.spec) ||
	path.startsWith(routes.Search.spec)
		? categoriesPage(genericPage())
		: path.startsWith(routes.Movie.spec)
		? movie(MoviePage())
		: path.startsWith(routes.MyList.spec)
		? myList(MyListPage())
		: homePage(CollectionsPage())
}

export const goTo = (path) => {
	if (location.pathname !== path) {
		window.history.pushState({ path }, path, path)
		console.log(path)
		render(path)
	} else {
		window.history.replaceState({ path }, path, path)
	}
}

export const getRouterParams = () => {
	const url = new URL(window.location.href).pathname
	return getPathRoute(url)
}

const initRouter = () => {
	window.addEventListener('popstate', (e) => {
		render(new URL(window.location.href).pathname)
	})
	document.querySelectorAll('[href^="/"]').forEach((el) => {
		el.addEventListener('click', (env) => {
			env.preventDefault()
			const { pathname: path } = new URL(env.target.href)
			goTo(path)
		})
	})
	render(new URL(window.location.href).pathname)
}

export default initRouter
