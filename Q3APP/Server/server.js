const express = require('express')
const mongoose = require('mongoose')
// const users = require('./routes/users')
const app = express();
const port = 5000

app.use(express.json())
app.use('/users', require('./routes/users'))
app.listen(port, () => console.log(`server running on ${port}`))


mongoose.connect('mongodb://localhost:27017/InTouch', {useNewUrlParser: true}).then(() => console.log('connected to MongoDB'))





