import debounce from 'just-debounce-it';
import { useCallback } from 'react';
import './App.css';
import { CharactersResults } from './components/Characters.jsx';
import { useCharacters } from './hooks/useCharacters.js';
import { useQuery } from './hooks/useQuery.js';

function App() {
	/* Acá se usan dos custom hooks, uno para el manejar las busquedas con algunas vaidaciones,
	y el otro para realizar se encaraga de la llamadas a la API, mostrando un estado de carga, hace 
	una validación del primer uso, además de manejo básico de errores */
	const { query, setQuery, errorQuerry } = useQuery();
	const { characters, getCharacters, loading, errorResult } = useCharacters();

	/* Este debounce fue instalado por practicidad, y se implementa para evitar el llamado continuo a la 
	API mientras se escribe el personaje a consultar */
	const debounceQuery = useCallback(
		debounce((query) => {
			getCharacters({ query });
		}, 700),
		[]
	);

	const handleSubmit = (event) => {
		event.preventDefault();
		getCharacters({ query });
	};

	const handleChange = (event) => {
		const newSearch = event.target.value;
		setQuery(newSearch);
		debounceQuery(newSearch);
	};

	return (
		<div className="page">
			<header>
				<h1>Rick and Morty API</h1>
				<form onSubmit={handleSubmit}>
					<input onChange={handleChange} name="query" placeholder="Rick, Morty, Summer..." />
				</form>
				{errorQuerry && <p className="error">{errorQuerry}</p>}
			</header>
			<main>
				{loading ? (
					<p>searching...</p>
				) : (
					(characters || errorResult) && (
						/* Este es el componente encargado de renderizar los personajes consultados */
						<CharactersResults characters={characters} errorResult={errorResult} />
					)
				)}
			</main>
		</div>
	);
}

export default App;
