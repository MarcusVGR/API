const database = require('../models')

class CartController {
    static async createCart(req, res){ //post carts
        const newCart = req.body
        try {
            const newCartCreated = await database.Carts.create(newCart)
            return res.status(200).json(newCartCreated)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async viewCart(req, res){ //get carts
        const { id } = req.params
        try {
            const oneCart = await database.Carts.findOne({
                where: { id: Number(id) }})
            return res.status(200).json(oneCart)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async addItem (req, res) { // put carts/items
    // Eu preciso alterar na tabela de products e carts_items?
        const { productId } = req.params
        const { newQty } = req.body
        try {
            await database.Carts_items.update(newQty, {
                where: { id: Number(productId) }})
            const productQty = await database.Carts_Items.findOne({
                where: { id: Number(productId) }})
            return res.status(200).json(productQty)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deleteItems(req, res) { //delete carts/items
        const { cartId } = req.params
        try {
            await database.Carts_items.destroy({
                where: { id: Number(cartId) }})
            return res.status(200).json({message: 'O carrinho foi apagado!'})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async orderCart(req, res) { //post checkout
        const { cartId } = req.params
        try {
            
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = CartController