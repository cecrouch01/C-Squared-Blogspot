const router = require('express').Router();
const { User } = require('../../models');

// This is the /api/users endpoint

//This will get all of the users
router.get('/', async (req, res) => {
    try{
        const userData = await User.findAll();
        res.status(200).json(userData)
    } catch(err){
        res.status(500).json(err);
    }
});

//This will get a single user
router.get('/:id', async (req , res) => {
    try {
        const singleUserData = await User.findByPk(req.params.id);
        if(singleUserData !== null) {
            res.status(200).json(singleUserData)
        } else {
            res.status(400).json('Oops, it looks like there has been an error')
        }
    } catch(err) {
        res.status(500).json(err)
    }
})
//This will create a user

//This will update a user

//This will delete a user

module.exports = router;