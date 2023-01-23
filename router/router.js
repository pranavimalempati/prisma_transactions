const router = require('express').Router();
const Controller =require('../controller/controller')

router.post("/add",Controller.connect)
router.post("/insert",Controller.create)

router.post("/find",Controller.find)

router.post("/hi",Controller.project)


module.exports = router;
