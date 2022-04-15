const database = require('../models')

class OrderController {
    static async viewOrder(req, res){ //get orders
        const { id } = req.params

        if (await database.Orders.findOne({ where: { id: Number(id) }}) !== null) {
            
        } else {
            return res.json("Order não encontrada, verifique o id informado.")
        }

        try {
            const oneOrder = await database.Orders.findOne({
                where: { id: Number(id) }})
            return res.status(200).json(oneOrder)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async editOrder(req, res){ //put orders
        const { id } = req.params
        const status = "PREPARING"

        if (await database.Orders.findOne({ where: { id: Number(id) }}) !== null) {
            
        } else {
            return res.json("Order não encontrada, verifique o id informado.")
        }

        try {
            await database.Orders.update({ status: status }, { where: { id: Number(id) }})
            return res.status(200).json(`A order ${id} foi atualizada para o status ${status}!`)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async doneOrder(req, res) { //put confirmation
        const { id } = req.params
        const status = "DONE"

        if (await database.Orders.findOne({ where: { id: Number(id) }}) !== null) {
            
        } else {
            return res.json("Order não encontrada, verifique o id informado.")
        }
        
        try {
            await database.Orders.update({ status: status }, { where: { id: Number(id) }})
            return res.status(200).json(`A order ${id} foi atualizada para o status ${status}!`)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = OrderController