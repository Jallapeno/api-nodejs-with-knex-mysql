'use strict';
const knex = require('../database')

exports.index = async () => {
    const res = await knex('users')
    return res
}

exports.getById = async (id) => {
    const res = await knex.select('name', 'email', 'active')
        .from('users').where({ id: id }).first()
    return res
}
exports.getByName = async (name) => {
    const res = await knex.select('id')
        .from('users').where({ name }).first()
    return res
}
exports.getByEmail = async (email) => {
    const res = await knex.select('id')
        .from('users').where({ email }).first()
    return res
}

exports.create = async (data) => {
    return await knex('users').insert({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password
    })
}

exports.update = async (id, data) => {
    await knex('users').update({
        name: data.name
    }).where({ id })
}

exports.delete = async (id) => {
    await knex('users').where({ id }).del()
}

exports.authenticate = async (data) => {
    let user = await knex('users').where({
        username: data.username,
        password: data.password
    }).first()
    return user;
}
