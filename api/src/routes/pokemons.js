const { Router } = require('express');
const axios = require('axios');
require('dotenv').config();
const { Pokemon, Type } = require('../db.js');



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
        isApi,
        isDataBase,
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

            requestDB = await Pokemon.findAll({
                include: Type
            });
            //parsea el objeto
            requestDB = JSON.stringify(requestDB);
            requestDB = JSON.parse(requestDB);
            //convierte los tipos
            requestDB = requestDB.reduce((acc, el) => acc.concat({
                ...el,
                types: el.types.map(t => t.name)
            }), [])

            requestDB = requestDB.map(pokemon => {
                const statsObj = [{ "base_stat": pokemon.hp }, { "base_stat": pokemon.attack }, { "base_stat": pokemon.defense }, 3, 4, { "base_stat": pokemon.speed }]
                return {
                    data: {
                        id: pokemon.idDB,
                        name: pokemon.name,
                        height: pokemon.height,
                        weight: pokemon.weight,
                        types: pokemon.types.map(t => {
                            return { type: { name: t } }
                        }),
                        stats: statsObj,
                        sprites: {
                            versions: {
                                'generation-v': {
                                    'black-white': {
                                        animated: {
                                            "front_default": pokemon.image
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
        }

        if (isApi === 'false' && isDataBase === 'false') {
            return res.send(['No Pokemons Available.'])
        }

        // si existe request db se concatena
        if (requestDB) {
            promesaCumplida = promesaCumplida ? requestDB.concat(promesaCumplida) : requestDB
        }

        if (nameQuery) {
            if (!Array.isArray(promesaCumplida) || promesaCumplida.length === 0) {
                return res.send(['No Pokemons Available.'])
            }
            promesaCumplida = promesaCumplida.filter(pokemon => pokemon.data.name.toLowerCase().includes(nameQuery.toLowerCase()))
        }


        if (!promesaCumplida.length) {
            return res.send(['No Pokemons Available.'])
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
        console.log('error', error)
    }
})

module.exports = router;