'use strict'
const authService = require('../services/authService')
const repository = require('../repositories/userRepository')
const ValidationContract = require('../validators/fluentValidator')
const contract = new ValidationContract()
const bcrypt = require("bcrypt")
const global = require('../token/config');
const saltRounds = global.SALT_KEY;

module.exports = {
    async index(req, res, next) {
        /* 	#swagger.tags = ['User']*/
        /* #swagger.responses[200] = { 
        schema:[{
            id:"number",
            "name":"string",
            "username":"string",
            "email":"string",
            "password":"string",
            "active":"string",
            "created_at":"string",
            "updated_at":"string",
        }],
        description: "Invalid params" 
        } */
        try {
            const allUsers = await repository.index()
            res.status(200).send(allUsers)
        } catch (error) {
            next(error)
        }
    },
    async authenticate(req, res, next) {
        /* 	#swagger.tags = ['User']*/
        /*	#swagger.parameters['body'] = {
        in: 'body',
        description: 'User information.',
        required: true,
        schema: {          
            $username:"string",
            $password:"string"
         }
        } */
        contract.isRequired(req.body.username, 'Username is required!')
        contract.isRequired(req.body.password, 'Password is required!')

        /* #swagger.responses[400] = { 
        schema: {
            message:["string"]
         },
        description: "Invalid params" 
        } */
        if (!contract.isValid()) {
            res.status(400).send(contract.errors()).end()
            return
        }

        try {
            const hash = bcrypt.hashSync(req.body.password, saltRounds);
            
            const user = await repository.authenticate({
                username: req.body.username,
                password: hash
            })
            /* #swagger.responses[404] = { 
               schema: {
                   message:"No users found"
                },               
            } */
            /* #swagger.responses[401] = { 
               schema: {
                   message:"Access denied"
                },               
            } */
            if (!user) {
                res.status(404).send({
                    message: 'No users found'
                })
                return
            } else if (user.active == 'N') {
                res.status(401).send({
                    message: 'Access denied'
                })
                return
            }

            const token = await authService.generateToken({
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
                active: user.active
            })
            /* #swagger.responses[201] = { 
                      schema: {
                          token:"token"
                       },               
                   } */
            return res.status(201).send({
                token: token
            })

        } catch (error) {
            next(error)
            console.log(error)
        }
    },
    async getById(req, res, next) {
        try {
            // Retrieves token
            const token = req.headers['x-access-token']

            // Token decoder
            const data = await authService.decodeToken(token)

            const user = await repository.getById(data.id)
                 /* #swagger.responses[401] = { 
               schema: {
                   message:"Access denied"
                },               
            } */
            res.status(200).send(user)
        } catch (error) {
            next(error)
        }
    },
    async create(req, res) {
        /* 	#swagger.tags = ['User']*/
        /*	#swagger.parameters['body'] = {
        in: 'body',
        description: 'User information.',
        required: true,
        schema: { 
            $name:"string",
            $email:"string",
            $username:"string",
            $password:"string"
         }
        } */
        let { body: { name, email, username, password } } = req

        contract.isRequired(name, 'Name is required')
        contract.isEmail(email, 'Invalid e-mail')
        contract.isRequired(username, 'Username is required')
        contract.hasMinLen(password, 6, 'Password must be at least 6 characters')

        /* #swagger.responses[400] = { 
        schema: {
            message:["string"]
         },
        description: "Invalid params" 
        } */
        if (!contract.isValid()) {
            return res.status(400).send(contract.errors()).end()
        }

        // let hashpass;
        try {
            /* #swagger.responses[303] = { 
            schema: {
                message:"string"
             },
            description: "Email or name already in use." 
            } */
            let avoid_name_duplicity = await repository.getByName(name)

            if (avoid_name_duplicity) {
                return res.json({
                    status: 303,//409
                    message: "This name already exists!"
                })
            }

            let avoid_email_duplicity = await repository.getByEmail(email)

            if (avoid_email_duplicity) {
                return res.json({
                    status: 303,//409
                    message: "This e-mail is already in use!"
                })
            }

            const hash = bcrypt.hashSync(password, saltRounds);

            let [created_user] = await repository.create({
                name: name,
                email: email,
                username: username,
                password: hash
            })

            // emailService configure...

            /* #swagger.responses[201] = { 
                schema: {
                    message:"Welcome!",
                    data:{
                        name:"string",
                        username:"string",
                        email:"string",
                        id_user:"number"
                    },
                    status:"201"
                    }              
                } 
            */
            res.status(201).send({
                status: 201,
                data: { name, username, email, id_user: created_user },
                message: 'Welcome!'
            })

        } catch (error) {
            return res.status(500).json({ error })
        }
    },
    async update(req, res, next) {
        /* 	#swagger.tags = ['User']*/
        /*	#swagger.parameters['body'] = {
        in: 'body',
        description: 'User information.',
        required: true,
        schema: { 
            $name:"string",
            email:"string",
            username:"string",
            password:"string"
         }
        } */
        /* #swagger.responses[400] = { 
    schema: {
        message:["string"]
     },
    description: "Invalid params" 
    } */
        /* #swagger.responses[200] = { 
        schema: {
            response:"1"
         },
        description: "operation success" 
        } */
        contract.isRequired(req.body.name, 'Name is required')

        // check if the contract is valid
        if (!contract.isValid()) {
            res.status(400).send(contract.errors()).end()
            return
        }

        try {
            // Retrieves token
            const token = req.headers['x-access-token']

            // Token decoder
            const data = await authService.decodeToken(token)

            await repository.update(data.id, req.body)
            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next) {
        /* 	#swagger.tags = ['User']*/
        /* #swagger.responses[200] = { 
        schema: {
            response:"1"
         },
        description: "operation success" 
        } */
        try {
            await repository.delete(req.params.id)
            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    }
}
