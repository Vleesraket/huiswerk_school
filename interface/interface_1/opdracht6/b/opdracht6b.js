async function GetPokemon() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/25");
        const data = await response.json();
        console.log(`de naam van de pokemon is ${data.name}`);
    } catch (error) {
        console.error("Error fetching pokemon:", error);
    }
}

GetPokemon()