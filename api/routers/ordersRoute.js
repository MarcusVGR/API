const  { Router } = require('express')
const OrderController = require('../controllers/OrderController')

const router = Router()
router
    .get('/orders/:id', OrderController.viewOrder)
    .put('/orders/:id', OrderController.editOrder)
    .post('/orders/:id/confirmation', OrderController.doneOrder)

module.exports = router
