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

// -------------------------------//
// GET ACCOUNTS BY ID -- CREATE//
// -------------------------------//
router.get ('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const [account] = await db('account').where('id', id)
        res.json(account)

    } catch (error) {
        res.status(500).json 
        ({
            success: false,
            errorMessage: "cannot retrieve account"
        });

        next(error)
    } 
});


// -------------------------------//
// POST ACCOUNTS -- READ          //
// -------------------------------//
router.post('/', async (req, res) => {
    const accountData = {
        name: req.body.name,
        budget: req.body.budget
    }
    try {
        const [id] = await db('accounts').insert(accountData);
        res.status(201).json(await db('accounts').where('id', id))
    } catch (error) {
        res.status(500).json 
        ({
            success: false,
            errorMessage: "could not post new account"
        });

        next(error)
    }
});

// -------------------------------//
// PUT ACCOUNTS -- UPDATE         //
// -------------------------------//

router.put('/:id', async (req, res) => {
    const {id} = req.params; 
    try {
        const account = await db('accounts')
        .where('id', id)
        .update(req.body);
        res.status(200).json({updated: rowsUpdated})
    } catch (error) {
        res.status(500).json
        ({
            success: false, 
            errorMessage: "could not update account"
        });
    }
});

// -------------------------------//
// DELETE ACCOUNTS -- DELETE      //
// -------------------------------//

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const rowsDeleted = await db('accounts')
        .where('id', id)
        .del()
        res.json ({deletedRecords: rowsDeleted});
    }catch (error) {
        res.status(500).json 
        ({ 
            success: false, 
            errorMessage: 'Could not delete account'
        })
    }
});

module.exports = router;