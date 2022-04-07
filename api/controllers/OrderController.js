const database = require('../models')

class OrderController {
    static async viewOrder(req, res){ //get orders
        const { id } = req.params
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
        const { status } = req.body
        try {
            await database.Orders.update(status, {
                where: { id: Number(id) }})
            const attStatus = await database.Orders.findOne({
                where: { id: Number(id) }})
            return res.status(200).json(`O id:${id} foi atualizado para o status ${attStatus}!`)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async doneOrder(req, res) { //put confirmation
        const { id } = req.params
        const status = "done"
        try {
            await database.Orders.update({
                where: { 
                    id: Number(id), 
                    status: String(status)
                }})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = OrderController