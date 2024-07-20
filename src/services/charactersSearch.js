/* Se extrajo la lógica relacionada con el fetch de datos y de igual manera se mapea
para que caso la API cambie algún parámetro, dicho cambio no se haga en algún componente */

export async function charactersSearch({ query }) {
	if (query === '') return null;

	try {
		const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${query}`);
		const json = await response.json();

		if (json.Error) return json.Error;
		const characters = json.results;

		return characters?.map((character) => ({
			id: character.id,
			image: character.image,
			name: character.name,
			status: character.status,
			location: character.location.name,
		}));
	} catch (error) {
		throw new Error('Could not make your search');
	}
}
