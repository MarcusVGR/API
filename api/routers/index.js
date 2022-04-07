const bodyParser = require('body-parser')
const products = require('./produtcsRoute')
const carts = require('./cartsRoute')
const orders = require('./ordersRoute')

module.exports = app => {
    app.use(
        bodyParser.json(),
        products,
        carts,
        orders
    )
}