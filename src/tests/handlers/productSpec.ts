import supertest from 'supertest';
import app from '../../index';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Product } from '../../models/products';

const request = supertest(app);
describe('Testing Endpoint: /products', () => {
  const product: Product = {
    name: 'chipsy',
    price: 10,
  };
  let token: string;
  let productId: string;
  it('Testing the create endpoint', async () => {
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
  it('Testing the index endpoint with valid token', async () => {
    await request
      .get('/products')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('Testing the index endpoint with invalid token', async () => {
    await request
      .get('/products')
      .set('Authorization', 'Bearer heyIamafaketoken')
      .expect(401);
  });

  it('Testing the read endpoint with valid token and valid product ID', async () => {
    await request
      .get(`/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('Testing the read endpoint with invalid token and invalid product ID', async () => {
    await request
      .get('/products/999')
      .set('Authorization', 'Bearer heyIamafaketoken')
      .expect(401);
  });

  it('Testing the update endpoint with different product ID', async () => {
    await request
      .put('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: 999,
        price: product.price,
      })
      .expect(401);
  });

  it('Testing the update endpoint with current product ID', async () => {
    await request
      .put('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: productId,
        price: product.price,
      })
      .expect(200);
  });

  it('Testing the delete endpoint with valid token and valid product ID', async () => {
    await request
      .delete('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: productId })
      .expect(200);
  });
});
