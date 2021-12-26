const express = require('express')
const product = require('../controllers/product')
const router = express.Router()

router.post('/createProduct', product.create) //Create
router.get('/searchProduct/:label/:value', product.search) //Read
router.get('/allProducts', product.showAll) //Read
//router.patch('/productUpdate', product.update)

module.exports = router