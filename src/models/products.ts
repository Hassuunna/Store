import client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class ProductModel {
  async index(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Failed to get the products with the following error: ${error}`
      );
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to get the products with the following error: ${error}`
      );
    }
  }

  async create(name: string, price: number): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
      const result = await connection.query(sql, [name, price]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to add product with the following error: ${error}`
      );
    }
  }

  async update(product: Product): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql =
        'UPDATE products SET (name)=($1) (price)=($2) WHERE id=($3) RETURNING *';
      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to update product with the following error: ${error}`
      );
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to delete product with the following error: ${error}`
      );
    }
  }
}
