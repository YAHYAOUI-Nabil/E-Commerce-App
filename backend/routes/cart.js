const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart')
const verifyTokenAndAdmin = require('../middlewares/verifyTokenAndAdmin')
const verifyTokenAndAuthorization = require('../middlewares/verifyTokenAndAuthorization')
const verifyToken = require('../middlewares/verifyToken')


router.get('/:userId', verifyTokenAndAuthorization, cartController.getUserCart)
router.get('/', verifyTokenAndAdmin, cartController.getAllCarts)
router.post('/', verifyToken, cartController.createCart)
router.put('/:id', verifyTokenAndAuthorization, cartController.updateCart)
router.delete('/:id', verifyTokenAndAuthorization, cartController.deleteCart)

module.exports = router