import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { PEPPER , SALT } = process.env;

export type Customer = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};

const hashPassword = (password: string): string => {
  return bcrypt.hashSync(`${password}${PEPPER}`, parseInt(SALT as string, 10));
}

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
        hashPassword(password)
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
      const result = await connection.query(sql, [
        customer.firstName, 
        customer.lastName, 
        hashPassword(customer.password), 
        customer.id]);
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

  async Authenticate (firstName: string, password: string): Promise<Customer | undefined | null> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT password FROM customers WHERE firstName=($1)';
      const result = await connection.query(sql, [firstName]);
      if(result.rows.length) {
        const {password: hashPassword} = result.rows[0];
        const isValidPassword = bcrypt.compareSync(
          `${password}${PEPPER}`, 
          hashPassword
        )
        if(isValidPassword) {
          const sql = 'SELECT id, firstName, lastName FROM customers WHERE firstName=($1)';
          const customer = await connection.query(sql, [firstName]);
          connection.release();
          return customer.rows[0];
        }
      }
      connection.release();
      return null;       
    } catch (error) {
      
    }
  }
  
}
