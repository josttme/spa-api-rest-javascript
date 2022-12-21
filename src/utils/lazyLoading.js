// Función a la detección del observador
const loadImages = (entries, observer) => {
	entries
		.filter((entry) => entry.isIntersecting)
		.forEach((entry) => {
			const url = entry.target.getAttribute('data-src')
			entry.target.setAttribute('src', url)
			entry.target.addEventListener('load', (e) => {
				e.isTrusted ? entry.target.classList.remove('skeleton') : null
			})
			observer.unobserve(entry.target)
		})
}

// Parámetros de la instancia del observador
const options = {
	root: null,
	rootMargin: '500px 0px 500px 0px',
	threshold: 0.1,
}

// Creando instanicia del observador
const observerSection = new IntersectionObserver(loadImages, options)

// Registrando imagen al observador
export function registerImage(target) {
	observerSection.observe(target)
}
