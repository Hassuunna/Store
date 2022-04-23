import { Product, ProductModel } from '../../models/products';

const productModel = new ProductModel();
const baseProduct: Product = {
  name: 'Farawla',
  price: 50
};
let product: Product;

describe('Testing Model prroducts', () => {
  it("Must have a create method", () => {
    expect(productModel.create).toBeDefined();
  })

  it("Testing the create method", async () => {
    product = await productModel.create(baseProduct);
    expect( {
      name: product.name, price: product.price
    }).toEqual({
      name: baseProduct.name, price: baseProduct.price
    });
  });

  it("Must have a index method", () => {
    expect(productModel.index).toBeDefined();
  })
  
  it("Must have a show method", () => {
    expect(productModel.show).toBeDefined();
  })

  it("Must have a update method", () => {
    expect(productModel.update).toBeDefined();
  })

  it("Must have a delete method", () => {
    expect(productModel.delete).toBeDefined();
  })
})
