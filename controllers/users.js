const mysql = require('../database/mysql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

    exports.register = async (req,res)=>{
        const {user, password} = req.body
        const hashPass = await bcrypt.hash(password, 10)
        try {
            const result = await mysql.execute('INSERT INTO users (user, pass, adm) VALUES (?,?,0)',[user, hashPass])
            return res.status(201).send({msg:"Usuario criado!", id: result.insertId, user})
        } catch (error) {
            return res.status(500).send(error)
        }
    }

    exports.login = async(req,res)=>{
        const {user, password} = req.body
        try {
            const result = await mysql.execute('SELECT * FROM users WHERE user = ?',[user])
            if(result.length < 1){
                return res.status(401).send({msg:'Não autorizado.'})
            }
            bcrypt.compare(password, result[0].pass, (error, response)=>{
                if(error || !response){
                    return res.status(401).send({msg:'Não autorizado.'})
                }
                const token = jwt.sign({
                    user: result[0].user,
                    adm: result[0].adm
                }, process.env.JWT_KEY, {
                    expiresIn: "5h"
                })
                return res.status(200).send({msg:'Autenticado com sucesso!', token})
                })
        } catch (error) {
            return res.status(401).send({msg: "Não autorizado."})
        }
    }