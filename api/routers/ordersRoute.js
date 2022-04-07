const  { Router } = require('express')
const OrderController = require('../controllers/OrderController')

const router = Router()
router
    .get('/orders/:id', OrderController.viewOrder)
    .put('/orders/:id', OrderController.editOrder)
    .put('/products/:id', OrderController.doneOrder)

module.exports = router
