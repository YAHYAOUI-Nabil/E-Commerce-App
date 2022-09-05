const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order')
const verifyTokenAndAdmin = require('../middlewares/verifyTokenAndAdmin')
const verifyTokenAndAuthorization = require('../middlewares/verifyTokenAndAuthorization')
const verifyToken = require('../middlewares/verifyToken')


router.get('/:userId', verifyTokenAndAuthorization, orderController.getUserOrders)
router.get('/', verifyTokenAndAdmin, orderController.getAllOrders)
router.get('/income/orders', verifyTokenAndAdmin, orderController.getIncome)
router.post('/', verifyToken, orderController.createOrder)
router.put('/:id', verifyTokenAndAdmin, orderController.updateOrder)
router.delete('/:id', verifyTokenAndAdmin, orderController.deleteOrder)

module.exports = router