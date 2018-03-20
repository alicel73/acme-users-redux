const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_react_db');

const User = conn.define('user', {
    name: Sequelize.STRING
})

const sync = () => {
    return conn.sync({ force: true })
}

const seed = () => {
    return Promise.all([
        User.create({ name: 'firefly' }),
        User.create({ name: 'camel' }),
        User.create({ name: 'leopard' })
    ])
}

module.exports = {
    sync,
    seed,
    models: {
        User
    }
}