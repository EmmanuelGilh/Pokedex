const { Router } = require('express');
const axios = require('axios');
require('dotenv').config();
const { Pokemon } = require('../db.js');



const router = Router();


function applyFilters(pokemons, type, order, attack) {
    if (!Array.isArray(pokemons) || pokemons.length === 0) {
        return pokemons
    }

    let arrayFiltrado = pokemons

    if (type && type !== 'All') {
        arrayFiltrado = arrayFiltrado.filter(p => p.type.includes(type))
    }

    if (order === 'asc') {
        arrayFiltrado.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    }
    if (order === 'desc') {
        arrayFiltrado.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
    }

    if (attack === 'Weaker') {
        arrayFiltrado.sort((a, b) => parseInt(a.attack) - parseInt(b.attack))
    }
    if (attack === 'Stronger') {
        arrayFiltrado.sort((a, b) => parseInt(b.attack) - parseInt(a.attack))
    }
    return arrayFiltrado
}

router.get('/', async (req, res) => {
    const { name: nameQuery,
        isApi = isApi === undefined ? 'true' : isApi,
        isDataBase = isDataBase === undefined ? 'true' : isDataBase,
        type, order, attack } = req.query

    try {

        let promesaCumplida;

        if (isApi === 'true') {
            const request = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=40`)

            const subrequest = request.data.results.map((pokemon) => axios.get(pokemon.url));

            promesaCumplida = await Promise.all(subrequest);
        }


        let requestDB;


        if (isDataBase === 'true') {
            requestDB = []
        }

        if (isApi === 'false' && isDataBase === 'false') {
            return res.send(['No Pokemons Available.'])
        }

        promesaCumplida = requestDB.concat(promesaCumplida)

        if (nameQuery) {
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



        res.send(applyFilters(promesaCumplida, type, order, attack))
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;