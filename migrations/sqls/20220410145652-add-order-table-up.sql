create table orders (
    id SERIAL PRIMARY KEY,
    customer_id integer references customers(id) on delete cascade on update cascade, 
    status boolean default false
);