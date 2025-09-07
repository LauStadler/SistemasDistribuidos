const axios = require('axios');

async function getPokemonAxios(id) {
    try{
         const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
         const pokemon = response.data; 
        console.log(`Pokemon: ${pokemon.name}`);
         pokemon.abilities.forEach(hab => { console.log(hab.ability.name); });
    }
     catch (error) {

    console.error('Error al obtener el Pokémon:', error.message);

  }
}

async function getPokemon(id) {

  try {

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();
    console.log(`Pokemon: ${pokemon.name}`);
    pokemon.abilities.forEach(hab => {console.log(hab.ability.name); });

  } catch (error) {

    console.error('Error al obtener el Pokémon:', error.message);

  }

}
getPokemon(1);
getPokemonAxios(5);