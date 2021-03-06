const router = require('express').Router();
const dao = require('./dao');

router.get("/", dao.list);

router.get('/:num', dao.view);

router.post("/", dao.add);

router.put("/", dao.mod);

router.all('*', (req, res)=> {
    res.status(404).send({
        success: false,
        msg: `board unknown uri ${req.path}`
    });
})

module.exports = router;