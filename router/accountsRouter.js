const express = require ('express');

const db = require ('../data/dbConfig');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.json(await db.select('*').from('accounts'));
    } catch (error) {
        next (error);
    };
});


module.exports = router;