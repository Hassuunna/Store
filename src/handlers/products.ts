import { ProductModel, Product } from '../models/products';
import express, { Request, Response } from 'express';
import { Verify } from '../middleware/auth';

const products = new ProductModel();

const index = async (req: Request, res: Response) => {
  try {
    Verify(req);
    const currentProducts = await products.index();
    res.send(currentProducts);
  } catch (error) {
    res.status(500).json({ error: error });
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
    const currentProduct = await products.show(id);
    Verify(req, currentProduct.id);
    res.send(currentProduct);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res
        .status(400)
        .send(
          'Error, missing or malformed parameters. name and price required'
        );
    }
    const newProduct = await products.create(name, price);
    res.send(newProduct);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id, name, price } = req.body;
    if (!id || !name || !price) {
      return res
        .status(400)
        .send('Error, missing or malformed parameters. id required');
    }
    Verify(req, id);
    const newProduct: Product = { id, name, price };
    const updateProduct = await products.update(newProduct);
    res.send(updateProduct);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    if (!id) {
      return res
        .status(400)
        .send('Error, missing or malformed parameters. id required');
    }
    const deletedProduct = await products.delete(id);
    Verify(req, deletedProduct.id);
    res.send(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const products_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', create);
  app.put('/products', update);
  app.delete('/products', destroy);
};

export default products_routes;
