const mysql = require('../database/mysql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Users = require('../models/Users')

    exports.register = async (req,res)=>{
        const {user, password} = req.body
        const hashPass = await bcrypt.hash(password, 10)
        try {
            const result = await Users.register(user, hashPass)
            return res.status(201).send({
                message:"Usuario criado!",
                 id: result.insertId,
                 user})
        } catch (error) {
            return res.status(500).send(error)
        }
    }

    exports.login = async(req,res)=>{
        const {user, password} = req.body
        try {
            const result = await Users.login([user])
            if(result.length < 1){
                throw {status: 401, message: 'Não autorizado.'}
            }
            const solvePass = await bcrypt.compare(password, result[0].pass)
            if(solvePass){
                const token = jwt.sign({
                    username: result[0].user,
                    adm: result[0].adm
                }, process.env.JWT_KEY, {
                    expiresIn: "5h"
                })
                return res.status(200).send({
                    message: 'Autenticado com sucesso!',
                    token 
            })
            }
            throw {status: 401, message: 'Não autorizado.'}
        } catch (error) {
            return res.status(error.status).send(error)
        }
    }