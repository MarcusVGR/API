const database = require('../models')

class ProductController {
    static async allProducts(req, res) { //get produtcs
        try{
            const products = await database.Products.findAll()
            return res.status(200).json(products)

        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async createProduct(req, res) { //post produtcs
        const newProduct = req.body 
        try{
            const newProductCreate = await database.Products.create(newProduct)
            return res.status(200).json(newProductCreate)

        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async editProduct(req, res) { //put produtcs
        const { id } = req.params
        const newData = req.body
        try {
            await database.Products.update(newData, {
                where: { id: Number(id) }})
            const attProdutc = await database.Products.findOne({
                where: { id: Number(id) }})
            return res.status(200).json(attProdutc)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}

module.exports = ProductController