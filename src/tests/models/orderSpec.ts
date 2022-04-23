import { Order, OrderModel } from '../../models/orders';
import { Product, ProductModel } from '../../models/products';
import { Customer, CustomerModel} from '../../models/customers';

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
  price: 50
};

const baseOrder: Order = {
  status: 'active'
};
let order: Order;
let product: Product;
let customer: Customer;
describe('Testing Model orders', () => {
  beforeAll( async () => {
    
    customer = await customerModel.create(baseCustomer);

    if (customer) 
      baseOrder.customer_id = customer.id;

    product = await productModel.create(baseProduct);
  })

  it("Must have a create method", () => {
    expect(orderModel.create).toBeDefined();
  })

  it("Testing the create method", async () => {
    order = await orderModel.create(baseOrder);
    expect( {
      status: order.status
    }).toEqual({
      status: baseOrder.status
    });
  });

  it("Must have a index method", () => {
    expect(orderModel.index).toBeDefined();
  })
  
  it("Must have a show method", () => {
    expect(orderModel.show).toBeDefined();
  })

  it("Must have a update method", () => {
    expect(orderModel.update).toBeDefined();
  })

  
  it("Must have a add product method", () => {
    expect(orderModel.addProduct).toBeDefined();
  })
  
  it("Testing the add product method", async () => {
    const addedProduct = await orderModel.addProduct(order.id!, product.id!, 5);
    
    expect({
      id : addedProduct.product_id,
    }). toEqual({
      id: product.id,
    })
  })
  
  it("Must have a delete method", () => {
    expect(orderModel.delete).toBeDefined();
  })
})
