const { Router } = require('express');
const axios = require('axios');
require('dotenv').config();
const { Pokemon, Type } = require('../db.js');

const router = Router();

router.post('/', async (req, res) => {
    const { name, hp, attack, defense, speed, height, weight, type: types, image } = req.body

    let typesFromDB = types.map(type => {
        return Type.findOrCreate({
            where: {
                name: type
            }
        })
    });

    let allTypes = await Promise.all(typesFromDB);
    let pokemon = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image
    })

    allTypes.forEach(type => pokemon.setTypes(type[0]));

    res.send('New Pokemon Created!')
})

module.exports = router;

// 