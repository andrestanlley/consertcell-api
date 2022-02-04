const express = require('express')
const product = require('../controllers/product')
const login = require('../middleware/login')
const router = express.Router()

router.post('/createProduct', login, product.create) //Create
router.get('/searchProduct/:label/:value', product.search) //Read
router.get('/allProducts', product.showAll) //Read
router.patch('/productUpdate', login, product.update) //Update
router.delete('/deleteProduct', login, product.delete) //Delete

router.get('/press-start', (req,res)=>{
    res.status(200).send(
        [
            {
                "id": 0,
                "name": "André Stanlley",
                "phonenumber": "(47) 99988-9988",
                "email": "usuario@lyncas.net",
                "birth": "19/09/1998",
                "status": true
            },
            {
                "id": 1,
                "name": "Bruno Trindade",
                "phonenumber": "(47) 99988-9988",
                "email": "usuario@lyncas.net",
                "birth": "19/09/1998",
                "status": true
            },
            {
                "id": 2,
                "name": "Gabriel Moya",
                "phonenumber": "(47) 99988-9988",
                "email": "usuario@lyncas.net",
                "birth": "19/09/1998",
                "status": true
            },
            {
                "id": 3,
                "name": "Genara de Souza",
                "phonenumber": "(47) 99988-9988",
                "email": "usuario@lyncas.net",
                "birth": "19/09/1998",
                "status": true
            },
            {
                "id": 4,
                "name": "Henrique Carvalho",
                "phonenumber": "(47) 99988-9988",
                "email": "usuario@lyncas.net",
                "birth": "19/09/1998",
                "status": true
            },
            {
                "id": 5,
                "name": "Laila Santos",
                "phonenumber": "(47) 99988-9988",
                "email": "usuario@lyncas.net",
                "birth": "19/09/1998",
                "status": true
            },
            {
                "id": 6,
                "name": "Mauricio Costa",
                "phonenumber": "(47) 99988-9988",
                "email": "usuario@lyncas.net",
                "birth": "19/09/1998",
                "status": true
            },
            {
                "id": 7,
                "name": "Renato Ganske",
                "phonenumber": "(47) 99988-9988",
                "email": "usuario@lyncas.net",
                "birth": "19/09/1998",
                "status": true
            },
            {
                "id": 8,
                "name": "Thalisson Monteiro",
                "phonenumber": "(47) 99988-9988",
                "email": "usuario@lyncas.net",
                "birth": "19/09/1998",
                "status": true
            },
            {
                "id": 9,
                "name": "Vanessa Eich",
                "phonenumber": "(47) 99988-9988",
                "email": "usuario@lyncas.net",
                "birth": "19/09/1998",
                "status": true
            }
        ]
    )
})

module.exports = router