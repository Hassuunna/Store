import supertest from 'supertest';
import app from '../../index';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Product } from '../../models/products';
import { Order } from '../../models/orders';
import { Customer } from '../../models/customers';

const request = supertest(app);
describe('Testing Endpoint: /orders', () => {

  const product: Product = {
    name: 'chocolate',
    price: 20
  }
  const order: Order = {
    status: 'active',
  };
  const customer: Customer = {
    email: 'ATD@Dummy.com',
    firstName: 'ATD',
    password: 'Password',
    lastName: 'Dummy',
  }

  let token: string;
  let customerId: string;
  let orderId: string;
  let productId: string;

  beforeAll(async () => {
    
    await request
      .post('/customers')
      .send(customer)
      .expect(200)
      .then((res) => {
        token = res.text;
        const decodedJWT = verify(
          token as string,
          process.env.JWT_SECRET as string
        ) as JwtPayload;
        customerId = decodedJWT.user.userId;
        order.customer_id = Number(customerId);
      });
      await request
      .post('/products')
      .send(product)
      .expect(200)
      .then((res) => {
        token = res.text;
        const decodedJWT = verify(
          token as string,
          process.env.JWT_SECRET as string
        ) as JwtPayload;
        productId = decodedJWT.user.userId;
      });
  });

  it('Testing the create endpoint', async () => {
    await request
      .post('/orders')
      .send(order)
      .expect(200)
      .then((res) => {
        token = res.text;
        const decodedJWT = verify(
          token as string,
          process.env.JWT_SECRET as string
        ) as JwtPayload;
        orderId = decodedJWT.user.userId;
        
      });
  });
  it('Testing the index endpoint with valid token', async () => {
    await request
      .get('/orders')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('Testing the index endpoint with invalid token', async () => {
    await request
      .get('/orders')
      .set('Authorization', 'Bearer heyIamafaketoken')
      .expect(401);
  });

  it('Testing the read endpoint with valid token and valid order ID', async () => {
    await request
      .get(`/orders/${orderId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('Testing the read endpoint with invalid token and invalid order ID', async () => {
    await request
      .get('/orders/999')
      .set('Authorization', 'Bearer heyIamafaketoken')
      .expect(401);
  });

  it('Testing the update endpoint with different order ID', async () => {
    await request
      .put('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: 999,
        status: true,
      })
      .expect(401);
  });

  it('Testing the update endpoint with current order ID', async () => {
    await request
      .put('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: orderId,
        status: true,
      })
      .expect(200);
  });

  it('Testing the add new product endpoint with current order ID', async () => {
    await request
      .post(`/orders/addProduct/${orderId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        productId,
        quantity: 3,
      })
      .expect(200);
  });

  it('Testing the delete endpoint with valid token and valid order ID', async () => {
    await request
      .delete('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: orderId })
      .expect(200);
  });
});
