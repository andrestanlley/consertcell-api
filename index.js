const express = require('express')
require('dotenv').config()
const api = require('./routes/api')
const users = require('./routes/users')
const app = express()


app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api', api)
app.use('/user', users)

app.listen(process.env.PORT, ()=>{
    console.log(`Server rodando na porta ${process.env.PORT}`)
})