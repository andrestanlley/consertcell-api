const mysql = require('../database/mysql').pool

module.exports = {
    create(req,res){
        const brand = req.body.brand.toUpperCase()
        const device = req.body.device.toUpperCase()
        mysql.getConnection((error, conn)=>{
            if(error){
                return res.status(500).send('Erro ao conectar com banco de dados.')
            }
            conn.query('INSERT INTO products (brand, device) VALUES (?,?)',[brand, device], (error, result)=>{
                conn.release()
                if(error){
                    return res.status(500).send(error)
                }
                const response = {
                    msg: "Produto criado com sucesso!",
                    id_atribuido: result.insertId,
                    brand: brand,
                    device: device
                }
                return res.status(201).send(response)
            })
        })
    },
    search(req,res){
        let {label, value} = req.params
        mysql.getConnection((error, conn)=>{
            if(error){
                return res.status(500).send('Erro ao conectar ao banco de dados.')
            }
            conn.query(`SELECT * FROM products where ${label} = "${value}"`, (error, result)=>{
                conn.release()
                if(error){
                    return res.status(500).send(error)
                }
                return res.status(200).send(result)
            })
        })    
    },
    showAll(req,res){
        mysql.getConnection((error, conn)=>{
            if(error){
                return res.status(500).send('Erro ao conectar ao banco de dados.')
            }
            conn.query('SELECT * FROM products', (error, result)=>{
                conn.release()
                if(error){
                    return res.status(500).send(error)
                }
                return res.status(200).send(result)
            })
        })
    }
}