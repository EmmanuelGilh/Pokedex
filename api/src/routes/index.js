const { Router } = require('express');
const pokemons = require('./pokemons.js');
const DetailsPokes = require('./DetailsPokes')
const PokeCreator = require('./PokeCreator.js');
const Type = require('./Types.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokemons)
router.use('/pokemons/:id', DetailsPokes)
router.use('/creator', PokeCreator)
router.use('/types', Type)


module.exports = router;
