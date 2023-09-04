const router = require('express').Router();
const apiRoutes = require('./api')

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.send("<h1>Wrong Route</h1><p>this is not going where you want it to</p>")
})

module.exports = router