import { Order, OrderModel } from '../../models/orders';
import { Product, ProductModel } from '../../models/products';
import { Customer, CustomerModel } from '../../models/customers';

const orderModel = new OrderModel();
const customerModel = new CustomerModel();
const baseCustomer: Customer = {
  email: 'Loki@Asgard.com',
  firstName: 'Loki',
  password: 'Password',
  lastName: 'Odin',
};
const productModel = new ProductModel();
const baseProduct: Product = {
  name: 'Farawla',
  price: 50,
};

const baseOrder: Order = {
  status: 'active',
};
let order: Order;
let allOrders: Order[];
let product: Product;
let customer: Customer;
describe('Testing Model orders', () => {
  beforeAll(async () => {
    customer = await customerModel.create(baseCustomer);

    if (customer) baseOrder.customer_id = customer.id;

    product = await productModel.create(baseProduct);
  });

  it('Must have a create method', () => {
    expect(orderModel.create).toBeDefined();
  });

  it('Testing the create method', async () => {
    order = await orderModel.create(baseOrder);
    expect({
      status: order.status,
    }).toEqual({
      status: baseOrder.status,
    });
  });

  it('Must have a index method', () => {
    expect(orderModel.index).toBeDefined();
  });

  it('Testing the index method', async () => {
    allOrders = await orderModel.index();
    expect({
      status: allOrders.pop()!.status,
    }).toEqual({
      status: baseOrder.status,
    });
  });

  it('Must have a show method', () => {
    expect(orderModel.show).toBeDefined();
  });

  it('Testing the show method', async () => {
    const currentOrder = await orderModel.show(Number(order.id));
    expect({
      status: currentOrder.status,
    }).toEqual({
      status: baseOrder.status,
    });
  });

  it('Must have a update method', () => {
    expect(orderModel.update).toBeDefined();
  });

  it('Testing the update method', async () => {
    const updateOrder = await orderModel.update({
      id: order.id,
      status: 'complete',
    });
    expect({
      status: updateOrder.status,
    }).toEqual({
      status: 'complete',
    });
  });

  it('Must have a add product method', () => {
    expect(orderModel.addProduct).toBeDefined();
  });

  it('Testing the add product method', async () => {
    const addedProduct = await orderModel.addProduct(order.id!, product.id!, 5);

    expect({
      id: addedProduct.product_id,
    }).toEqual({
      id: product.id,
    });
  });

  it('Must have a delete method', () => {
    expect(orderModel.delete).toBeDefined();
  });

  it('Testing the delete method', async () => {
    const deletedOrder = await orderModel.delete(Number(order.id));
    expect({
      id: deletedOrder.id,
    }).toEqual({
      id: order.id,
    });
  });
});
