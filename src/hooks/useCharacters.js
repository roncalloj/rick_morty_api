import { useCallback, useRef, useState } from 'react';
import { charactersSearch } from '../services/charactersSearch.js';

export function useCharacters(query) {
	const [characters, setCharacters] = useState([]);
	const [loading, setLoading] = useState(false);
	const [errorResult, setErrorResult] = useState(null);
	const previousQuery = useRef(query);

	const getCharacters = useCallback(async ({ query }) => {
		if (query === previousQuery.current) return;

		try {
			/* Mediante un estado se le meustra al cliente el estado de cargando, hasta que la API de una respuesta */
			setLoading(true);
			setErrorResult(null);
			previousQuery.current = query;
			const searchedMovies = await charactersSearch({ query });
			if (typeof searchedMovies === 'string') {
				setErrorResult(searchedMovies);
				setCharacters([]);
			}
			if (Array.isArray(searchedMovies)) setCharacters(searchedMovies);
		} catch (e) {
			setErrorResult(e.message);
		} finally {
			/* Una vez se obtiene respuesta de la API, se cambia nuevamente el estado para eliminar el msj de cargadno*/
			setLoading(false);
		}
	}, []);

	return { characters, getCharacters, loading, errorResult };
}
