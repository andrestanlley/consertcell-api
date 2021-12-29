const express = require('express')
const product = require('../controllers/product')
const login = require('../middleware/login')
const router = express.Router()

router.post('/createProduct', login, product.create) //Create
router.get('/searchProduct/:label/:value', product.search) //Read
router.get('/allProducts', product.showAll) //Read
router.patch('/productUpdate', login, product.update) //Update
router.delete('/deleteProduct', login, product.delete) //Delete

module.exports = router