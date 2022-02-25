const { Router } = require('express');
const axios = require('axios');
require('dotenv').config();
const { Pokemon } = require('../db.js');


const router = Router();

router.get('/', async (req, res) => {
    try {

        res.send()
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;