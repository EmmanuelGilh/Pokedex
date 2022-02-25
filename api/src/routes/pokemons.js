const { Router } = require('express');
const axios = require('axios');
require('dotenv').config();
const { Pokemon } = require('../db.js');


const router = Router();

router.get('/', async (req, res) => {
    const { name: nameQuery } = req.query

    try {

        const request = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=40`)

        let subrequest = request.data.results.map((pokemon) => axios.get(pokemon.url));

        let promesaCumplida = await Promise.all(subrequest);

        if (nameQuery) {
            // la funcion real de la search
            // const findPokemon = promesaCumplida.filter(pokemon => pokemon.data.name.toLowerCase().includes(nameQuery.toLowerCase()))
            promesaCumplida = promesaCumplida.filter(pokemon => pokemon.data.name.toLowerCase().includes(nameQuery.toLowerCase()))
        }

        promesaCumplida = await promesaCumplida.map((pokemon) => {
            return {
                id: pokemon.data.id,
                name: pokemon.data.name,
                hp: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                speed: pokemon.data.stats[5].base_stat,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
                image: pokemon.data.sprites.versions["generation-v"]["black-white"].animated.front_default,
                type: pokemon.data.types.reduce((collector, t) => {
                    collector.push(t.type.name)
                    return collector
                }, []),
            };
        });


        res.send(promesaCumplida)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;