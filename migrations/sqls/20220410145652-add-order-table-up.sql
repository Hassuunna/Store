create table orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE, 
    status VARCHAR (255) NOT NULL DEFAULT 'active'
);