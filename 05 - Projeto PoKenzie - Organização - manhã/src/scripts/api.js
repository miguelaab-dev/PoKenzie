const fetchPokemon = async (pokemonId) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`

    // const data = await fetch(url)
    // const dataJson = await data.json()
    const data = await fetch(url).then(response => response.json())

    // console.log(data)

    return data;
}


const processPokemonData = (pokemonData) => {
    const id = pokemonData.id
    const name = pokemonData.name
    const img = pokemonData.sprites.other.dream_world.front_default

    const types = pokemonData.types.map(element => element.type.name)

    const hpObj = pokemonData.stats.find((element) => element.stat.name === "hp")
    const hp = hpObj.base_stat

    const attackObj = pokemonData.stats.find((element) => element.stat.name === "attack")
    const attack = attackObj.base_stat

    const defenseObj = pokemonData.stats.find((element) => element.stat.name === "defense")
    const defense = defenseObj.base_stat

    const speedObj = pokemonData.stats.find((element) => element.stat.name === "speed")
    const speed = speedObj.base_stat


    const pokemonObj = {
        id,
        name,
        types,
        img,
        hp,
        defense,
        speed,
        attack,
    }

    return pokemonObj
}


export const mountPokemonArray = async (amount=10) => {
    const pokemonArray = []
    
    for (let i =0; i < amount; i++){
        const pokemonData = await fetchPokemon(i + 1)
        const processedPokemonData = processPokemonData(pokemonData)
        pokemonArray.push(processedPokemonData)
    }
    // console.log(pokemonArray)

    return pokemonArray
}

// mountPokemonArray()