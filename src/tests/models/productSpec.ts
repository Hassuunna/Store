import { Product, ProductModel } from '../../models/products';

const productModel = new ProductModel();
const baseProduct: Product = {
  name: 'Farawla',
  price: 50,
};
let product: Product;
let allProducts: Product[];

describe('Testing Model prroducts', () => {
  it('Must have a create method', () => {
    expect(productModel.create).toBeDefined();
  });

  it('Testing the create method', async () => {
    product = await productModel.create(baseProduct);
    expect({
      name: product.name,
      price: product.price,
    }).toEqual({
      name: baseProduct.name,
      price: baseProduct.price,
    });
  });

  it('Must have a index method', () => {
    expect(productModel.index).toBeDefined();
  });

  it('Testing the index method', async () => {
    allProducts = await productModel.index();
    expect({
      price: allProducts.pop()!.price,
    }).toEqual({
      price: baseProduct.price,
    });
  });

  it('Must have a show method', () => {
    expect(productModel.show).toBeDefined();
  });

  it('Testing the show method', async () => {
    const currentproduct = await productModel.show(Number(product.id));
    expect({
      price: currentproduct.price,
    }).toEqual({
      price: baseProduct.price,
    });
  });

  it('Must have a update method', () => {
    expect(productModel.update).toBeDefined();
  });

  it('Testing the update method', async () => {
    const updatedproduct = await productModel.update({
      id: product.id,
      price: 234,
    });
    expect({
      price: updatedproduct.price,
    }).toEqual({
      price: 234,
    });
  });

  it('Must have a delete method', () => {
    expect(productModel.delete).toBeDefined();
  });

  it('Testing the delete method', async () => {
    const deletedproduct = await productModel.delete(Number(product.id));
    expect({
      price: deletedproduct.name
    }).toEqual({
      price: product.name
    });
  });
});
