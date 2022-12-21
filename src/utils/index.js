export function createMovies(movies) {
	const image = (movie) => `https://image.tmdb.org/t/p/w300/${movie}`
	const imageError =
		'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
	return movies.map(
		(movie) => `
		<movie-component
		linkMovie='${movie.id ? movie.id : movie.idMovie}'
		img=${
			movie.poster_path
				? image(movie.poster_path)
				: movie.posterImage
				? image(movie.posterImage)
				: imageError
		}
		title='${movie.original_title}'
		releaseYear='${movie.release_date}'

		>
			</movie-component>`
	)
}

export function createMoviesContainer(categoryName, categoryId, movies) {
	if (!!movies.length) {
		let categoryNameTitle = categoryName
		categoryName === 'trends'
			? categoryName
			: (categoryName = `category=${categoryId}-${categoryName}`)

		const isNotHome =
			location.pathname.startsWith('/mylist') ||
			location.pathname.startsWith('/category') ||
			location.pathname.startsWith('/trends')

		const link = (name) => `<more-category-component link=/${name}></more-category-component>`

		return `
		<category-container-component
			title="${categoryNameTitle}"
			link="${!isNotHome ? link(categoryName) : ''}"
			img="${movies.join('')}">
		</category-container-component>`
	}
}
// delete %20
export function delete20Url(query) {
	return query.replace(/%20/g, ' ')
}
export function getNameAndIdForURL() {
	const [_, categoryData] = location.pathname.split('=')
	if (window.location.pathname.startsWith('/search=')) {
		return decodeURI(categoryData)
	} else {
		const [categoryId, categoryName] = decodeURI(categoryData).split('-')
		return { categoryId, categoryName }
	}
}
