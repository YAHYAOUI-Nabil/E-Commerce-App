const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const verifyTokenAndAuthorization = require('../middlewares/verifyTokenAndAuthorization')
const verifyTokenAndAdmin = require('../middlewares/verifyTokenAndAdmin')


router.get('/:id', verifyTokenAndAdmin, userController.getUser)
router.get('/', verifyTokenAndAdmin, userController.getAllUsers)
router.get('/stats/users', verifyTokenAndAdmin, userController.getStats)
router.put('/:id', verifyTokenAndAuthorization, userController.update)
router.delete('/:id', verifyTokenAndAuthorization, userController.delete)

module.exports = router