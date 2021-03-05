'use strict'
const express = require('express')
const bodyParser = require('body-parser');
const routes = require('./routes')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../../swagger.json')

const app = express()

app.use(express.json())
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(routes)
// Not Found
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

// Cath All
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: error.message
    })
})


app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({ 
    extended: false 
}));

// Enable o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.listen(3333, () => console.log('Server is running'))
