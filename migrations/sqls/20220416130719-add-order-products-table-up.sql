create table order_products (
    order_id integer references orders(id),
    product_id integer references products(id),
    quantity integer
);