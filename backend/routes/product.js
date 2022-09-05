const express = require('express')
const router = express.Router()
const productController = require('../controllers/product')
const verifyTokenAndAdmin = require('../middlewares/verifyTokenAndAdmin')


router.get('/:id', productController.getProduct)
router.get('/', productController.getAllProducts)
router.post('/', verifyTokenAndAdmin, productController.createProduct)
router.put('/:id', verifyTokenAndAdmin, productController.updateProduct)
router.delete('/:id', verifyTokenAndAdmin, productController.deleteProduct)

module.exports = router