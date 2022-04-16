import { OrderModel, Order } from '../models/orders';
import express, { Request, Response } from 'express';

const orders = new OrderModel();
/*
const index = async (req: Request, res: Response) => {
  try {
    const currentOrders = await orders.index();
    res.send(currentOrders);
  } catch (error) {
    res.status(500).json({ error: error})
  }
}
*/
const show = async (req: Request, res: Response) => {
  try {
    const customer_id = Number(req.params.id);
    const currentOrder = await orders.show(customer_id);
    res.send(currentOrder);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
/*
const create = async (req: Request, res: Response) => {
  try {
    const {customer_id, status} = req.body;
    const newOrder = await orders.create(customer_id,status);
    res.send(newOrder);
  } catch (error) {
    res.status(500).json({ error: error})
  }
}

const update = async (req: Request, res: Response) => {
  try {
    const {id, customer_id, status} = req.body;
    const newOrder: Order = {id, customer_id, status};
    const updateOrder = await orders.update(newOrder);
    res.send(updateOrder);
  } catch (error) {
    res.status(500).json({ error: error})
  }
}

const addProduct = async (req: Request, res: Response) => {
  try {
    const order_id = Number(req.params.id);
    const { product_id, quantity} = req.body;
    const newOrder = await orders.addProduct(order_id, product_id, quantity);
    res.send(newOrder);
  } catch (error) {
    res.status(500).json({ error: error})
  }
}

const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const deleteOrder = await orders.delete(id);
    res.send(deleteOrder);
  } catch (error) {
    res.status(500).json({ error: error})
  }
}
*/

const orders_routes = (app: express.Application) => {
  //app.get('/orders', index);
  app.get('/orders/:id', show);
  //app.post('/orders', create);
  //app.post('/orders/addProduct/:id', addProduct);
  //app.put('/orders', update);
  //app.delete('/orders', destroy);
};

export default orders_routes;
