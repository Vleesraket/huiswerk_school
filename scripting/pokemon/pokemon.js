const button = document.getElementById('find-pokemon-button')
button.addEventListener('click', async function () {
    const pokemonId = document.getElementById('pokemon-id').value
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    const response = await fetch(url)
    const pokemon = await response.json()

    if(pokemonId == 67) {
        window.open("https://www.youtube.com/watch?v=5uiBCpHIuXI")
    }
    document.getElementById('sprite').src = pokemon.sprites.front_default
    document.getElementById('name').textContent = pokemon.name
    document.getElementById('height').textContent = pokemon.height
    document.getElementById('weight').textContent = pokemon.weight
    document.getElementById('id').textContent = pokemonId

    const moves = document.getElementById('moves')
    for (const move of pokemon.moves) {
        const li = document.createElement('li')
        li.textContent = move.move.name
        moves.appendChild(li)
    }
})