const database = require('../models')

class CartController {
    static async createCart(req, res){ //post carts
        const newCart = req.body

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

        const { id, productId } = req.params // supondo que é o id do cart e o id do produto
        const newQty = req.body // quantidade do produto
        
        try {
            // buscar o cart pelo id e ver se existe
            //if (await database.Carts.findOne({where: { id: Number(id) }}) === {id}) {

                //} else {
               // return console.log(`O id ${id} não consta na tabela de carrinhos!`)
            //}

            // com o cart válido, busca o produto pelo productId e verifica se é válido
            //if(await database.Products.findOne({where: { id: Number(productId) }}) == true) {

               // } else { // se não existir, retornar erro que não existe
               // return console.log(`O id ${productId} não consta na tabela de produtos!`)
            //}         
            //await database.Carts.findOne({ where: { id: Number(id) }})
            // cria um novo cart item
            let qty = newQty
            let cartItem = {
                cart_id: id,
                product_id: productId,
                qty: qty, 
                price: database.Products.price,
                total: qty * database.Products.price
            }
            
            const newCartItemCreated = await database.Carts_Items
                .create(cartItem) //cria o cart_items com a informações
                .findOne({ where: { id: Number(id) }}) //busca o cart_items 

            cart.total += cartItem.total 
            await database.Carts.update(cart.total, { where: { total: Number(total) }}) //atualiza o total do cart

            return res.status(200).json(newCartItemCreated) // mostra o cart_items criado
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
        //     if (await database.Carts.findOne({where: { id: Number(cartId) }}) != false) {

        //     } else {
        //     return console.log(`O id ${id} não consta na tabela de carrinhos!`)
        // }
        // nova Order    
        let newOrder = {
            status: 'PENDING',
            cart_id: cartId
        }
        
        const newOrderCreated = await database.Orders
                .create(newOrder)
                .findOne({ where: { id: Number(cartId) }})
        
        return res.status(200).json(newOrderCreated)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = CartController