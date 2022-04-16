import client from '../database';
import { Product } from './products';

export type Order = {
  id?: number;
  customer_id: string;
  status: boolean;
};

export class OrderModel {
  /*
  async index(): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Failed to get the orders with the following error: ${error}`
      );
    }
  }
  */

  async show(customer_id: number): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM orders WHERE customer_id=($1)';
      const result = await connection.query(sql, [customer_id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to get the orders with the following error: ${error}`
      );
    }
  }

  /*
  async create(customer_id: number, status: string): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql = 'INSERT INTO orders (customer_id, status) VALUES ($1, $2) RETURNING *';
      const result = await connection.query(sql, [customer_id, status]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to add order with the following error: ${error}`
      );
    }
  }

  async update(order: Order): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql = 'UPDATE orders SET (customer_id)=($1) (status)=($2) WHERE id=($3) RETURNING *';
      const result = await connection.query(sql, [order.customer_id, order.status, order.id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to update order with the following error: ${error}`
      );
    }
  }

  async delete(id : number): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to delete order with the following error: ${error}`
      );
    }
  }
  
  async addProduct( order_id: number, product_id : number, quantity: number) {
    try {
      const connection = await client.connect();
      const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
      const result = await connection.query(sql, [order_id,product_id, quantity])
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to add product ${product_id} to order ${order_id} with the following error: ${error}`)
    }
  }
  */
}
