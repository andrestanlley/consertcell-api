const mysql = require('../database/mysql')

exports.register = async (user, hashPass)=>{
     return mysql.execute('INSERT INTO users (user, pass, adm) VALUES (?,?,0)',[user, hashPass])
}

exports.login = async (user)=>{
    return mysql.execute('SELECT * FROM users WHERE user = ?',[user])
}

