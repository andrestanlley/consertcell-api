const mysql = require('mysql2')
const dbConnect = require('./dbConnect')

const pool = mysql.createPool(dbConnect)

exports.execute = (query,params=[])=>{
    return new Promise((resolve, reject)=>{
        pool.query(query,params,(error, result)=>{
            if(error){
                reject(error)
            }else{
                resolve(result)
            }
        })
    })
}
