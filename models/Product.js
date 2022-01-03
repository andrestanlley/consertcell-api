const mysql = require('../database/mysql')

exports.create = async (brand,device)=>{
    return mysql.execute('INSERT INTO products (brand, device) VALUES (?,?)',[brand, device])
}

exports.search = async (label, value)=>{
    return mysql.execute(`SELECT * FROM products WHERE ${label} = ?`,[value])
}

exports.showAll = async()=>{
    return mysql.execute('SELECT * FROM products')
}

exports.update = async(brand, device, id)=>{
    return mysql.execute(`
    UPDATE products
    SET brand = ?, device = ?
    WHERE id = ?
    `,[brand, device, id])
}

exports.delete = async(id)=>{
    mysql.execute('DELETE FROM products WHERE id = ?',[id])
}