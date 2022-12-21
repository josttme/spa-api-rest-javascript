import { goTo } from '../router'

arrow.addEventListener('click', (e) => {
	e.preventDefault()
	window.history.state === null && window.location.pathname !== '/'
		? goTo('/')
		: window.history.back()
})
titlePage.addEventListener('click', (e) => {
	goTo('/')
})
myListBtn.addEventListener('click', (e) => {
	goTo('/mylist')
})

export function homePage(result) {
	console.log('Home')
	homeContainer.childNodes.length === 0 ? (homeContainer.innerHTML = result) : null
	showOrHideSections('add', homeContainer)
	showOrHideSections('remove', genericCategoryContainer)
	showOrHideSections('remove', movieContainer)
	showOrHideSections('remove', arrow)
}
export function categoriesPage(result) {
	console.log('category')
	genericCategoryContainer.innerHTML = result
	showOrHideSections('remove', homeContainer)
	showOrHideSections('add', genericCategoryContainer)
	showOrHideSections('remove', movieContainer)
	showOrHideSections('add', arrow)
}
export function seacrhPage(result) {
	console.log('seacrh')
	genericCategoryContainer.innerHTML = result
	showOrHideSections('remove', homeContainer)
	showOrHideSections('remove', genericCategoryContainer)
	showOrHideSections('remove', movieContainer)
	showOrHideSections('add', arrow)
}
export function movie(result) {
	console.log('movie')
	movieContainer.innerHTML = result
	showOrHideSections('remove', homeContainer)
	showOrHideSections('remove', genericCategoryContainer)
	showOrHideSections('add', movieContainer)
	showOrHideSections('add', arrow)
}

export function myList(result) {
	console.log('myList')
	movieContainer.innerHTML = result
	showOrHideSections('remove', homeContainer)
	showOrHideSections('remove', genericCategoryContainer)
	showOrHideSections('add', movieContainer)
	showOrHideSections('add', arrow)
}
export function showOrHideSections(state, element) {
	state === 'add' ? element.classList.remove('hidden') : element.classList.add('hidden')
}
