import client from '../database';

export type Customer = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};

export class CustomerModel {
  async index(): Promise<Customer[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM customers';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Failed to get the customers with the following error: ${error}`
      );
    }
  }

  async show(id: number): Promise<Customer[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM customers WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to get the customers with the following error: ${error}`
      );
    }
  }

  async create(
    firstName: string,
    lastName: string,
    password: string
  ): Promise<Customer[]> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO customers (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *';
      const result = await connection.query(sql, [
        firstName,
        lastName,
        password,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to add customer with the following error: ${error}`
      );
    }
  }

  /*
  async update(customer: Customer): Promise<Customer[]> {
    try {
      const connection = await client.connect();
      const sql = 'UPDATE customers SET (firstName)=($1) (lastName)=($2) (password)=($3) WHERE id=($4) RETURNING *';
      const result = await connection.query(sql, [customer.firstName, customer.lastName, customer.password, customer.id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to update customer with the following error: ${error}`
      );
    }
  }

  async delete(id : number): Promise<Customer[]> {
    try {
      const connection = await client.connect();
      const sql = 'DELETE FROM customers WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to delete customer with the following error: ${error}`
      );
    }
  }
  */
}
