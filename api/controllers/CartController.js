const database = require('../models')

class CartController {
    static async createCart(req, res){ //post carts
        const newCart = req.body

        // {
        //     id: Math.random() * 100;
        //     nome:
        //     qty: 
        // }
        try {
            // newCart.id = Math.random() * 100;

            // const checkCart = await database.Carts.findOne({id: newCart.id});
            // if(checkCart) {?
                // gerar um novo id
            // }

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

        const { id, productId } = req.params // supondo que é o id do cart
        const { newQty } = req.body // supondo ser o produto
        // {
        //     newQty: 1
        // }

        try {
            // buscar o cart pelo id e ver se existe
            // se não existir, você tem a opção de criar um ou retornar erro que não existe

            // com o cart válido, busca o produto pelo productId e verifica se é válido
            // se não existir, retornar erro que não existe


            // nesse ponto voce tem o cart e o produto com um objeto.
            // Cart 
            // Product

            // cria um novo cart item
            // let cartItem = {
            //     cart_id: // voce tem essa info
            //     product_id: // voce tem essa info
            //     qty: // voce tem 
            //     price: // preço do produto (product.price)
            //     total: // qty * product.price
            // }
            // const newCartItemCreated = await database.Carts_Items.create(cartItem)

            // cart.total += cartItem.total
            // basta salvar as atualizações do cart


            await database.Carts_items.update(newQty, {
                where: { id: Number(id) }})


            const productQty = await database.Carts_Items.findOne({
                where: { id: Number(id) }})
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