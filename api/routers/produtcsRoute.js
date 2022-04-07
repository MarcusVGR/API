const {Router} = require('express')
const ProductController = require('../controllers/ProdutcController')

const router = Router()
router
    .get('/products', ProductController.allProducts)
    .post('/products', ProductController.createProduct)
    .put('/products/:id', ProductController.editProduct)

module.exports = router