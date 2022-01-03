const Product = require('../models/Product')

    exports.create = async(req,res)=>{
        const brand = req.body.brand.toUpperCase()
        const device = req.body.device.toUpperCase()
        try {
            const result = await Product.create(brand, device)
            const response = {
                msg: "Produto criado!",
                id_atribuido: result.insertId,
                brand,
                device
            }
            return res.status(201).send(response)
        } catch (error) {
            return res.status(500).send(error)
        }
    }

    exports.search = async(req,res)=>{
        const {label, value} = req.params
        try {
            const result = await Product.search(label, value)
            return res.status(200).send(result)
        } catch (error) {
            return res.status(500).send(error)
        }
    }
    
    exports.showAll = async(req,res)=>{
        try {
            const result = await Product.showAll()
            return res.status(200).send(result)
        } catch (error) {
            return res.status(500).send(error)
        }
    }

    exports.update = async(req,res)=>{
        const {brand, device, id} = req.body
        try {
            const result = await Product.update(brand, device, id)
            const response = {
                msg: "Produto alterado!",
                id_alterado: id,
                new_brand: brand,
                new_device: device
            }
            return res.status(202).send(response)
        } catch (error) {
            return res.status(500).send(error)
        }
    }

    exports.delete = async(req,res)=>{
        const id = req.body.id
        try {
            const result = await Product.delete(id)
            const response = {
                msg: "Produto deletado com sucesso.",
                id_deletado: id
            }
            return res.status(200).send(response)
        } catch (error) {
            return res.status(500).send(error)
        }
    }
