const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')

const app = express()
//connect database
connectDB();

//Middle ware
app.use(express.json({ extended: false }))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.get('/', (req,res) => res.send("API running"))

//Routes definition
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth')) 
app.use('/api/campaign', require('./routes/api/campaign'))
app.use('/api/blockchain', require('./routes/api/blockchain'))  

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { 
    console.log(`server started on port ${PORT}`)
})