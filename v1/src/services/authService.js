'use strict'
const jwt = require('jsonwebtoken')
const global = require('../token/config')

// token generator
exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d'})
}

// token decoder
exports.decodeToken = async (token) => {
    const data = await jwt.verify(token, global.SALT_KEY)
    return data
}

// token interceptor
exports.authorize = function (req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    if(!token){
        res.status(401).json({
            message: 'Access denied'
        })
    } else {
        jwt.verify(token, global.SALT_KEY, function (error,decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Invalid token'
                })
            } else {
                if (decoded.active.includes('S')) {
                    next()
                } else {
                    res.status(403).json({
                        message: 'access denied'
                    })
                }
            }
        })
    }
}

// oauth
// exports.isAdmin = function (req, res, next) {
//     let token = req.body.token || req.query.token || req.headers['x-access-token']

//     if(!token){
//         res.status(401).json({
//             message: 'Invalid token'
//         })
//     } else {
//         jwt.verify(token, global.SALT_KEY, function (error, decoded){
//             if (error) {
//                 res.status(401).json({
//                     message: 'Invalid token'
//                 })
//             } else {
                // if (decoded.roles.includes('admin')) {
                //     next()
                // } else {
                //     res.status(403).json({
                //         message: 'access denied'
                //     })
                // }
//             }              
//         })        
//     }
// }
