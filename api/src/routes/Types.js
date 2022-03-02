const { Router, response } = require('express');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Type } = require('../db.js');

const router = Router();

function reduceToString(arr) {
    return arr.reduce((acc, item) => {
        acc.push(item.name)
        return acc;
    }, [])
}

router.get('/', async (req, res) => {

    const allTypes = await Type.findAll({ attributes: ['name'] })

    if (!allTypes.length) {
        const request = await axios.get(`https://pokeapi.co/api/v2/type`)
        let types = request.data.results.reduce((acc, item) => {
            acc.push({ name: item.name });
            return acc;
        }, [])

        await Type.bulkCreate(types)
        let response = await Type.findAll({ attributes: ['name'] })

        res.json(reduceToString(response))
    }
    else {
        res.json(reduceToString(allTypes))
    }
})

module.exports = router;
