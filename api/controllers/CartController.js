const database = require('../models')

class CartController {
    static async createCart(req, res) { //post carts
        const newCart = req.body

        try {
            const newCartCreated = await database.Carts.create(newCart)
            return res.status(200).json(newCartCreated)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async viewCart(req, res) { //get carts
        const { id } = req.params

        if (await database.Carts.findOne({ where: { id: Number(id) } }) !== null) {

        } else {
            return res.json("Carrinho não encontrado, verifique o id informado.")
        }

        try {
            const oneCart = await database.Carts.findOne({
                where: { id: Number(id) },
                attributes: ['total', 'id'],
                include: {
                    model: database.Carts_items,
                    attributes: ['qty', 'price', 'total'],
                    include: {
                        attributes: ['name', 'id'],
                        model: database.Products
                    }
                }
            })
            return res.status(200).json(oneCart)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async addItem(req, res) { // post carts/items
        const { cartId, productId } = req.params // id do cart e o id do produto
        const newQty = req.body.qty // quantidade do produto

        if (await database.Carts.findOne({ where: { id: Number(cartId) } }) !== null) {

        } else {
            return res.json("Carrinho não encontrado, verifique o id informado.")
        }

        if (await database.Products.findOne({ where: { id: Number(productId) } }) !== null) {

        } else {
            return res.json("Produto não encontrado, verifique o id informado.")
        }

        try {
            let product = await database.Products.findOne({ where: { id: Number(productId) } })
            let cart = await database.Carts.findOne({ where: { id: Number(cartId) } }) //busca o cart

            let total = newQty * product.price

            let cartItem = {
                cart_id: cartId,
                product_id: productId,
                qty: newQty,
                price: product.price,
                total: total
            }
            const newCartItemCreated = await database.Carts_items.create(cartItem) //cria o cart_items com a informações 

            let cart_total = cart.total + cartItem.total

            await database.Carts.update({ total: cart_total }, { where: { id: Number(cartId) } }) //atualiza o total do cart
            return res.status(200).json(newCartItemCreated) // mostra o cart_items criado
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deleteItems(req, res) { //delete carts/items
        const { cartId } = req.params

        if (await database.Carts.findOne({ where: { id: Number(cartId) } }) !== null) {

        } else {
            return res.json("Carrinho não encontrado, verifique o id informado.")
        }

        try {
            await database.Carts_items.destroy({ where: { cart_id: Number(cartId) } }) //zera o Cart_items
            await database.Carts.update({ total: 0 }, { where: { id: Number(cartId) } }) //zera o carrinho
            return res.status(200).json("O carrinho foi apagado!")
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async orderCart(req, res) { //post checkout
        const { cartId } = req.params

        if (await database.Carts.findOne({ where: { id: Number(cartId) } }) !== null) {

        } else {
            return res.json("Carrinho não encontrado, verifique o id informado.")
        }

        try {
            let newOrder = {
                status: 'PENDING',
                cart_id: cartId
            }
            const newOrderCreated = await database.Orders.create(newOrder)

            return res.status(200).json(newOrderCreated)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = CartController