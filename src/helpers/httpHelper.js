// Função que retorna um objeto com métodos para realizar operações HTTP
export const httpHelper = () => {
	const customFetch = async (url, options = {}) => {
	// Métodos e cabeçalhos padrão
		const defaultMethod = "GET"
		const defaultHeaders = {
			"Content-Type": "application/json",
			Accept: "application/json",
		}
	// Cria um novo controlador de abortamento para cancelar a requisição se necessário
		const controller = new AbortController()
		options.signal = controller.signal
  // Define o método, cabeçalhos e corpo da requisição 
		options.method = options.method || defaultMethod
		options.headers = options.headers
			? { ...defaultHeaders, ...options.headers }
			: defaultHeaders

		options.body = JSON.stringify(options.body) || false
		if (!options.body) delete options.body

		setTimeout(() => {
			controller.abort()
		}, 3000)

		try {
	// Realiza a requisição e retorna os dados como JSON
			const response = await fetch(url, options)
			return await response.json()
		} catch (err) {
			return err
		}
	}
  // Métodos para muitos tipos de requisições HTTP
	const get = (url, options = {}) => customFetch(url, options)

	const post = (url, options) => {
		options.method = "POST"
		return customFetch(url, options)
	}

	const put = (url, options) => {
		options.method = "PUT"
		return customFetch(url, options)
	}

	const del = (url, options) => {
		options.method = "DELETE"
		return customFetch(url, options)
	}
  // Retorna um objeto com os métodos para realizar operações HTTP
	return {
		get,
		post,
		put,
		del,
	}
}
