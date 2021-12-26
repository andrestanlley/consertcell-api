const mysql = require('mysql2')
const dbConnect = require('./dbConnect')

const pool = mysql.createPool(dbConnect)

exports.pool = pool