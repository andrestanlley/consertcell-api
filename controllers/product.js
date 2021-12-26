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
    },
    update(req,res){
        const {id, brand, device} = req.body
        mysql.getConnection((error, conn)=>{
            if(error){
                return res.status(500).send('Erro ao conectar ao banco de dados.')
            }
            conn.query('UPDATE products SET brand = ?, device = ? WHERE id = ?',[brand, device, id], (error, result)=>{
                if(error){
                    return res.status(500).send(error)
                }
                const response = {
                    msg: "Produto alterado!",
                    id_alterado: id,
                    new_brand: brand,
                    new_device: device
                }
                return res.status(200).send(response)
            })
        })
    },
    delete(req,res){
        const id = req.body.id
        mysql.getConnection((error, conn)=>{
            if(error){
                return res.status(500).send('Erro ao conectar ao banco de dados.')
            }
            conn.query('DELETE FROM products WHERE id = ?',[id], (error, result)=>{
                if(error){
                    return res.status(500).send(error)
                }
                const response = {
                    msg: "Produto deletado com sucesso.",
                    id_deletado: id
                }
                return res.status(200).send(response)
            })
        })
    }
}