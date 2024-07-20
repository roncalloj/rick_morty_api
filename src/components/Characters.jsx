function ListOfcharacters({ characters }) {
	return (
		<ul className="gridCards">
			{characters.map((eachCharacter) => (
				<li key={eachCharacter.id}>
					<img src={eachCharacter.image} alt={eachCharacter.name} />
					<section>
						<div className="cardRow">
							<p className="label">Name:</p>
							<span>{eachCharacter.name}</span>
						</div>
						<div className="cardRow">
							<p className="label">Estado:</p>
							<span>{eachCharacter.status}</span>
						</div>
						<div className="cardRow">
							<p className="label">Localización:</p>
							<span>{eachCharacter.location}</span>
						</div>
					</section>
				</li>
			))}
		</ul>
	);
}

function NoResult({ errorResult }) {
	return <p>{errorResult}</p>;
}

export function CharactersResults({ characters, errorResult }) {
	const charactersList = characters?.length > 0;

	return charactersList ? (
		<ListOfcharacters characters={characters} />
	) : (
		<NoResult errorResult={errorResult} />
	);
}
