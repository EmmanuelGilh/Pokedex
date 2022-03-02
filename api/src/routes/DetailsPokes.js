const { Router } = require('express');
const axios = require('axios');
// require('dotenv').config();
// const { API_KEY } = process.env;
const { Pokemon, Type } = require('../db.js');

const router = Router({ mergeParams: true });

router.get('/', async (req, res) => {
    const { id } = req.params
    if (id) {
        try {
            if (id.includes('DB')) {
                let requestDB = await Pokemon.findAll({
                    include: Type
                })
                //parsea el objeto
                requestDB = JSON.stringify(requestDB);
                requestDB = JSON.parse(requestDB);
                //convierte los tipos
                requestDB = requestDB.reduce((acc, el) => acc.concat({
                    ...el,
                    types: el.types.map(t => t.name)
                }), [])
                // requestDB = requestDB.filter(pokemon => id === pokemon.idDB)
                // console.log('requestDB', requestDB)
                return res.send(requestDB[0]);
            }

            const request = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const pokemonFound = request.data

            const sendPokemon = {
                id: pokemonFound.id, //
                name: pokemonFound.name, //
                image: pokemonFound.sprites.versions["generation-v"]["black-white"].animated.front_default,
                type: pokemonFound.types.reduce((collector, t) => {
                    collector.push(t.type.name)
                    return collector
                }, []),
                hp: pokemonFound.stats[0].base_stat,
                attack: pokemonFound.stats[1].base_stat,
                defense: pokemonFound.stats[2].base_stat,
                speed: pokemonFound.stats[5].base_stat,
                weight: pokemonFound.weight, //
                height: pokemonFound.height, //
            }

            // let poke = request.data.filter(p => p.id == id).map(p => (
            // ))
            // console.log(sendPokemon)
            return res.json(sendPokemon)
        } catch (error) {
            console.log('error en el Query', error)
        }
    }
    else {
        return res.send('No me llego mi ID.')
    }
})

module.exports = router;