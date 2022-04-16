create table orders (
    id SERIAL PRIMARY KEY,
    customer_id integer references customers(id), 
    status boolean default false
);