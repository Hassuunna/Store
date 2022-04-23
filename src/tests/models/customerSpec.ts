import { Customer, CustomerModel } from '../../models/customers';

const customerModel = new CustomerModel();
const baseCustomer: Customer = {
  email: 'Thor@Asgard.com',
  firstName: 'Thor',
  password: 'Password',
  lastName: 'Odin',
};
let customer: Customer;

describe('Testing Model customers', () => {
  it("Must have a create method", () => {
    expect(customerModel.create).toBeDefined();
  })

  it("Testing the create method", async () => {
    customer = await customerModel.create(baseCustomer);
    expect( {
      email: customer.email,
    }).toEqual({
      email: baseCustomer.email,
    });
  });

  it("Must have a index method", () => {
    expect(customerModel.index).toBeDefined();
  })

  it("Must have a show method", () => {
    expect(customerModel.show).toBeDefined();
  })

  it("Must have a update method", () => {
    expect(customerModel.update).toBeDefined();
  })

  it("Must have a delete method", () => {
    expect(customerModel.delete).toBeDefined();
  })
})
