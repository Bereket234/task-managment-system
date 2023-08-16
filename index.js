const express= require('express')
const mongoose= require('mongoose')
// 12345678

const app= express()


//conncetion to the mongoose database
mongoose.connect('mongodb+srv://bereketnigussie9:bek12345678@cluster0.d0nq8ef.mongodb.net/')
.then(()=> console.log('conected'))
.catch(e=> console.log(e))

app.get('/', (req, res)=> {
    res.send('hello')
});

// require('./startup/logging')();
require('./startup/routes')(app);
// require('./startup/db')();
// require('./startup/config')();
// require('./startup/validation')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {console.log(`Listening on port ${port}...`)});

module.exports = server;
