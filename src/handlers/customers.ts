import { CustomerModel, Customer } from '../models/customers';
import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Sign, Verify } from '../middleware/auth';
dotenv.config();

const customers = new CustomerModel();

const index = async (req: Request, res: Response) => {
  try {
    Verify(req);
    const currentCustomers = await customers.index();
    res.send(currentCustomers);
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
    Verify(req, id);
    const currentCustomer = await customers.show(id);
    res.send(currentCustomer);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    if (!firstName || !email || !password) {
      return res
        .status(400)
        .send(
          'Error, missing or malformed parameters. name, email, password required'
        );
    }
    const newCustomer = await customers.create(
      email,
      firstName,
      lastName,
      password
    );
    res.send(newCustomer);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id, firstName, lastName, password } = req.body;
    if (!id || !firstName || lastName || !password) {
      return res
        .status(400)
        .send(
          'Error, missing or malformed parameters. id, firstName, lastName, password required'
        );
    }
    const newCustomer: Customer = { id, firstName, lastName, password };
    Verify(req, id);
    const updateCustomer = await customers.update(newCustomer);
    res.send(updateCustomer);
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
    Verify(req, id);
    const deletedCustomer = await customers.delete(id);
    res.send(deletedCustomer);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send('Error, missing or malformed parameters. email, password required');
  }
  try {
    const customer = await customers.Authenticate(email, password);
    if (customer === null) {
      res.status(401);
      res.json('Incorrect user information');
    } else {
      const token = Sign(Number(customer.id));
      res.json(token);
    }
  } catch (error) {
    const e = error as Error;
    res.status(401).send(e.message);
  }
};

const customers_routes = (app: express.Application) => {
  app.get('/customers', index);
  app.get('/customers/:id', show);
  app.post('/customers', create);
  app.post('/customers/login', authenticate);
  app.put('/customers', update);
  app.delete('/customers', destroy);
};

export default customers_routes;
