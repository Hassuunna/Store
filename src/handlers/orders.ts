import { OrderModel, Order } from '../models/orders';
import express, { Request, Response } from 'express';
import { Sign, Verify } from '../middleware/auth';

const orders = new OrderModel();

const index = async (req: Request, res: Response) => {
  try {
    Verify(req);
    const currentOrders = await orders.index();
    res.send(currentOrders);
  } catch (error) {
    const e = error as Error;
    if (e.message.includes('Failed to get the orders')) {
      res.status(500).json(e.message);
    } else {
      res.status(401).json(e.message);
    }
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      return res
        .status(400)
        .send('Error, missing or malformed parameters. id required');
    }
    Verify(req, id);
    const currentOrder = await orders.show(id);
    res.send(currentOrder);
  } catch (error) {
    const e = error as Error;
    if (e.message.includes('Failed to get the product')) {
      res.status(500).json(e.message);
    } else {
      res.status(401).json(e.message);
    }
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { customer_id, status } = req.body;
    if (!customer_id || !status) {      
      return res
        .status(400)
        .send(
          'Error, missing or malformed parameters. customer_id and status required'
        );
    }
    const newOrder = await orders.create({customer_id, status});
    const token = Sign(Number(newOrder.id));
    res.send(token);
  } catch (error) {
    const e = error as Error;
    if (e.message.includes('Failed to add')) {
      res.status(500).json(e.message);
    } else {
      res.status(401).json(e.message);
    }
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id, status } = req.body;
    if (!id || !status) {
      return res
        .status(400)
        .send('Error, missing or malformed parameters. id and status required');
    }
    const newOrder: Order = { id, status };
    Verify(req, id);
    const updateOrder = await orders.update(newOrder);
    res.send(updateOrder);
  } catch (error) {
    const e = error as Error;
    if (e.message.includes('Failed to update')) {
      res.status(500).json(e.message);
    } else {
      res.status(401).json(e.message);
    }
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    if (!id) {
      return res.status(400).send('Error, missing or malformed, id required');
    }
    const deletedOrder = await orders.delete(id);
    Verify(req, deletedOrder.id);
    res.send(deletedOrder);
  } catch (error) {
    const e = error as Error;
    if (e.message.includes('Failed to delete')) {
      res.status(500).json(e.message);
    } else {
      res.status(401).json(e.message);
    }
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const order_id = Number(req.params.id);
    const { product_id, quantity } = req.body;
    const newOrder = await orders.addProduct(order_id, product_id, quantity);
    const token = Sign(Number(newOrder.id));
    res.send(token);
  } catch (error) {
    const e = error as Error;
    if (e.message.includes('Failed to add product')) {
      res.status(500).json(e.message);
    } else {
      res.status(401).json(e.message);
    }
  }
};

const orders_routes = (app: express.Application) => {
  app.get('/orders/:id', show);
  app.get('/orders', index);
  app.post('/orders', create);
  app.post('/orders/addProduct/:id', addProduct);
  app.put('/orders', update);
  app.delete('/orders', destroy);
};

export default orders_routes;
