import { ProductModel, Product } from '../models/products';
import express, { Request, Response } from 'express';

const products = new ProductModel();

const index = async (req: Request, res: Response) => {
  try {
    const currentProducts = await products.index();
    res.send(currentProducts);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const currentProduct = await products.show(id);
    res.send(currentProduct);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;
    const newProduct = await products.create(name, price);
    res.send(newProduct);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
/*
const update = async (req: Request, res: Response) => {
  try {
    const {id, name, price } = req.body;
    const newProduct: Product = {id, name, price};
    const updateProduct = await products.update(newProduct);
    res.send(updateProduct);
  } catch (error) {
    res.status(500).json({ error: error})
  }
}

const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const deleteProduct = await products.delete(id);
    res.send(deleteProduct);
  } catch (error) {
    res.status(500).json({ error: error})
  }
}
*/
const products_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', create);
  //app.put('/products', update);
  //app.delete('/products', destroy);
};

export default products_routes;
