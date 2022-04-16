import { CustomerModel, Customer } from '../models/customers';
import express, { Request, Response } from 'express';

const customers = new CustomerModel();

const index = async (req: Request, res: Response) => {
  try {
    const currentCustomers = await customers.index();
    res.send(currentCustomers);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const currentCustomer = await customers.show(id);
    res.send(currentCustomer);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, password } = req.body;
    const newCustomer = await customers.create(firstName, lastName, password);
    res.send(newCustomer);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
/*
const update = async (req: Request, res: Response) => {
  try {
    const {id, firstName, lastName, password} = req.body;
    const newCustomer: Customer = {id, firstName, lastName, password};
    const updateCustomer = await customers.update(newCustomer);
    res.send(updateCustomer);
  } catch (error) {
    res.status(500).json({ error: error})
  }
}

const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const deleteCustomer = await customers.delete(id);
    res.send(deleteCustomer);
  } catch (error) {
    res.status(500).json({ error: error})
  }
}
*/
const customers_routes = (app: express.Application) => {
  app.get('/customers', index);
  app.get('/customers/:id', show);
  app.post('/customers', create);
  //app.put('/customers', update);
  //app.delete('/customers', destroy);
};

export default customers_routes;
