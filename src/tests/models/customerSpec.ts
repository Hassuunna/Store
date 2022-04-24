import { Customer, CustomerModel } from '../../models/customers';
import { hashPassword } from '../../models/customers';

const customerModel = new CustomerModel();
const baseCustomer: Customer = {
  email: 'Thor@Asgard.com',
  firstName: 'Thor',
  password: 'Password',
  lastName: 'Odin',
};
let customer: Customer;
let allCustomer: Customer[];
describe('Testing Model customers', () => {
  it('Must have a create method', () => {
    expect(customerModel.create).toBeDefined();
  });

  it('Testing the create method', async () => {
    customer = await customerModel.create(baseCustomer);
    expect({
      email: customer.email,
    }).toEqual({
      email: baseCustomer.email,
    });
  });

  it('Must have a index method', () => {
    expect(customerModel.index).toBeDefined();
  });

  it('Testing the index method', async () => {
    allCustomer = await customerModel.index();
    expect({
      email: allCustomer.pop()!.email,
    }).toEqual({
      email: baseCustomer.email,
    });
  });

  it('Must have a show method', () => {
    expect(customerModel.show).toBeDefined();
  });

  it('Testing the show method', async () => {
    const currentCustomer = await customerModel.show(Number(customer.id));
    expect({
      email: currentCustomer.email,
    }).toEqual({
      email: baseCustomer.email,
    });
  });

  it('Must have a update method', () => {
    expect(customerModel.update).toBeDefined();
  });

  it('Testing the update method', async () => {
    const updatedCustomer = await customerModel.update({
      id: Number(customer.id),
      password: 'NewPassword',
    });
    expect({
      id: updatedCustomer.id    
    }).toEqual({
      id: customer.id
    });
  });

  it('Must have a delete method', () => {
    expect(customerModel.delete).toBeDefined();
  });

  it('Testing the delete method', async () => {
    const deletedCustomer = await customerModel.delete(Number(customer.id));
    expect({
      email: deletedCustomer.email,
    }).toEqual({
      email: baseCustomer.email,
    });
  });
});
