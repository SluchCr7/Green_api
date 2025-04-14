const express = require('express')
const app = express()
const connectDB = require('./config/db')
const cors = require('cors')
require('dotenv').config()

// DB Connection

connectDB()

// Middleware

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Routes

app.get('/', (req, res) => {    
    res.send('Hello World in Green Api')
})

app.use("/api/flower" , require('./routes/FlowerRoute'))
app.use("/api/auth" , require('./routes/UserRoute'))
app.use("/api/notify" , require('./routes/NotifyRoute'))

// Listen
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`)
})