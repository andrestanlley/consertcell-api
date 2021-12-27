const mysql = require('../database/mysql').pool
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    async register(req,res){
        const {user, password} = req.body
        const hashPass = await bcrypt.hash(password, 10)
        mysql.getConnection((error, conn)=>{
            if(error){
                return res.status(500).send({msg:'Erro ao conectar ao banco de dados.'})
            }
            conn.query('INSERT INTO users (user, pass, adm) VALUES (?,?,0)',[user,hashPass],(error, result)=>{
                if(error){
                    return res.status(500).send(error)
                }
                return res.status(201).send('Usuario criado!')
            })
        })
    },
    login(req,res){
        const {user, password} = req.body
        mysql.getConnection((error, conn)=>{
            if(error){
                return res.status(500).send('Erro ao conectar com banco de dados.')
            }
            conn.query('SELECT * FROM users WHERE user = ?',[user],(error, result)=>{
                conn.release()
                if(error){
                    return res.status(500).send(error)
                }
                bcrypt.compare(password, result[0].pass, (error, res)=>{
                    if(error){
                        return res.status(401).send({msg:'Não autorizado.'})
                    }
                })
                const token = jwt.sign({
                    user: result[0].user,
                    adm: result[0].adm
                }, process.env.JWT_KEY, {
                    expiresIn: "1h"
                })
                res.status(200).send({token: token})
            })
        })
        }
}