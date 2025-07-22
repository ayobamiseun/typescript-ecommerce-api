import { Request, Response } from 'express';
import { AppDataSource } from "../dbConfig/data-source";

class OrderController {
    static async getOrders(req: Request, res: Response) {
        try {
            const orderRepository = AppDataSource.getRepository("Order");
            const orders = await orderRepository.find({
                relations: ['orderProducts', 'orderProducts.product']
            });
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async getOrderById(req: Request, res: Response) {
        try {
            const orderRepository = AppDataSource.getRepository("Order");
            const order = await orderRepository.findOne({
                where: { id: parseInt(req.params.id) },
                relations: ['orderProducts', 'orderProducts.product']
            });

            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }

            res.json(order);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async createOrder(req: any, res: Response) {
        try {
            const orderRepository = AppDataSource.getRepository("Order");
            const orderDetails = AppDataSource.getRepository('order_details')
            const CartItemRepository = AppDataSource.getRepository("cart_items");
            const orderData = await CartItemRepository.find({where:{cart_id:{id: req.params.id}},
                 relations:["product_id"]})
            let total_price = 0
            orderData.forEach(item => {
                total_price += +item.total_item_price
            })
            const order = await orderRepository.save({user_id: req.user.id, total_price: total_price})
            orderData.forEach( async item => {
                const data = await orderDetails.save({order_id: order.id, product_id:{id: item.product_id.id},
                     quantity: item.quantity, unit_price: item.total_item_price / item.quantity})
                await CartItemRepository.softRemove({id: item.id})
            })
            res.json(order)
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async updateOrderStatus(req: Request, res: Response) {
        try {
            const orderRepository = AppDataSource.getRepository("Order");
            const order = await orderRepository.findOneBy({ id: parseInt(req.params.id) });

            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }

            const updatedOrder = await orderRepository.save({
                ...order,
                state: req.body.state
            });

            res.json({
                message: "Order status updated successfully",
                order: updatedOrder
            });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async deleteOrder(req: Request, res: Response) {
        try {
            const orderRepository = AppDataSource.getRepository("Order");
            const order = await orderRepository.findOneBy({ id: parseInt(req.params.id) });

            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }

            await orderRepository.softDelete(req.params.id);
            res.json({ message: "Order deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}

export default OrderController;