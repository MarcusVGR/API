const bodyParser = require('body-parser')
const products = require('./produtcsRoute')

module.exports = app => {
    app.use(
        bodyParser.json(),
        products,
        //carts,
        //carts_items,
        //orders
    )
}