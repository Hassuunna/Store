import express, { Request, Response } from 'express';
import products_routes from './handlers/products';
import customers_routes from './handlers/customers';
import orders_routes from './handlers/orders';

const app = express();

app.use(express.json());

app.get('/', async (_req: Request, res: Response): Promise<void> => {
  res.send('Hello there!');
});

products_routes(app);
customers_routes(app);
orders_routes(app);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server started on ${process.env.SERVER_PORT}`);
});

export default app;
