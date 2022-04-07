const {Router} = require('express')
const CartController = require('../controllers/CartController')

const router = Router()
router
    .post('/carts', CartController.createCart) //cria carrinho
    .get('/carts/:id', CartController.viewCart) //olha o carrinho
    .put('/carts/carts_items/:id', CartController.addItem) //adiciona item no carrinho
    .delete('/carts/:id/carts_items', CartController.deleteItems) //deleta carrinho
    .post('/carts/:id/order', CartController.orderCart) 

module.exports = router